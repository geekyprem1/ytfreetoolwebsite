import { NextRequest } from 'next/server';
import { generateContent, safeJsonParse } from '@/lib/ai/gemini';
import {
  buildCommentSentimentAnalysis,
  buildCommentSentimentPrompt,
  COMMENT_SENTIMENT_CLASSIFIER_VERSION,
  COMMENT_SENTIMENT_SAMPLE_SIZE,
  parseCommentSentimentResponse,
  type CommentSentimentAnalysis,
} from '@/lib/ai/comment-sentiment';
import { getRedis } from '@/lib/cache/redis';
import { cacheKeys } from '@/lib/cache/cache-keys';
import { TTL } from '@/lib/cache/cache-policies';
import { AppError, apiSuccessResponse, apiErrorResponse, handleApiError } from '@/lib/errors';
import { getCachedComments } from '@/lib/youtube/comments';
import { videoIdSchema } from '@/lib/validators/tool-inputs';
import { z } from 'zod';

const requestSchema = z.object({ videoId: videoIdSchema });
const classifierVersion = `${COMMENT_SENTIMENT_CLASSIFIER_VERSION}-${(process.env.AI_MODEL || 'default').replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 40)}`;

async function analyzeVideo(videoId: string): Promise<CommentSentimentAnalysis> {
  const commentsResult = await getCachedComments(videoId, COMMENT_SENTIMENT_SAMPLE_SIZE);
  const comments = commentsResult.comments
    .filter((comment) => comment.text.trim().length > 0)
    .slice(0, COMMENT_SENTIMENT_SAMPLE_SIZE);

  if (comments.length === 0) {
    return buildCommentSentimentAnalysis({
      videoId,
      videoTitle: commentsResult.videoTitle,
      comments,
      classifications: [],
      fetchedAt: commentsResult.fetchedAt,
      truncated: commentsResult.truncated,
    });
  }

  const { systemInstruction, prompt } = buildCommentSentimentPrompt(comments);
  let text: string;
  try {
    text = await generateContent(prompt, { systemInstruction, temperature: 0.1, maxTokens: 1800 });
  } catch {
    throw new AppError('AI_GENERATION_FAILED', 'Sentiment analysis is temporarily unavailable. Please try again.', 502);
  }

  let raw: unknown;
  try {
    raw = safeJsonParse(text);
  } catch {
    throw new AppError('AI_GENERATION_FAILED', 'Sentiment analysis returned an unreadable result. Please try again.', 502);
  }

  const classifications = parseCommentSentimentResponse(raw, comments.length);
  return buildCommentSentimentAnalysis({
    videoId,
    videoTitle: commentsResult.videoTitle,
    comments,
    classifications,
    fetchedAt: commentsResult.fetchedAt,
    truncated: commentsResult.truncated,
  });
}

async function getCachedAnalysis(videoId: string): Promise<CommentSentimentAnalysis> {
  const redis = getRedis();
  const key = cacheKeys.commentSentiment(videoId, COMMENT_SENTIMENT_SAMPLE_SIZE, classifierVersion);

  if (redis) {
    try {
      const cached = await redis.get<CommentSentimentAnalysis>(key);
      if (cached) return cached;
    } catch {
      // Cache outages should not stop the analysis.
    }
  }

  // A failed cache write must not cause the paid classification call to run twice.
  const result = await analyzeVideo(videoId);
  if (redis) {
    try {
      await redis.set(key, result, { ex: TTL.comments });
    } catch {
      // Keep the completed result if caching is unavailable.
    }
  }
  return result;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const parsed = requestSchema.safeParse(body);
    if (!parsed.success) {
      return apiErrorResponse(new AppError('INVALID_TOOL_INPUT', 'Paste a valid YouTube video URL.', 400));
    }

    const result = await getCachedAnalysis(parsed.data.videoId);
    return apiSuccessResponse(result);
  } catch (err) {
    return apiErrorResponse(handleApiError(err));
  }
}
