import { NextResponse } from 'next/server';

export class AppError extends Error {
  code: string;
  status: number;

  constructor(code: string, message: string, status: number) {
    super(message);
    this.code = code;
    this.status = status;
    this.name = 'AppError';
  }
}

export const ErrorCodes = {
  INVALID_YOUTUBE_URL: { status: 400, message: 'Invalid YouTube URL. Please check and try again.' },
  MISSING_VIDEO_ID: { status: 400, message: 'Could not extract video ID from URL.' },
  MISSING_CHANNEL_ID: { status: 400, message: 'Could not extract channel ID from URL.' },
  INVALID_TOOL_INPUT: { status: 400, message: 'Invalid input. Please check your entries.' },
  RATE_LIMITED: { status: 429, message: 'Too many requests. Please wait {retryAfter} seconds.' },
  AI_DAILY_LIMIT: { status: 429, message: 'AI daily limit reached. Resets at midnight UTC.' },
  VIDEO_NOT_FOUND: {
    status: 404,
    message: 'Video not found. It may be private or deleted.',
  },
  CHANNEL_NOT_FOUND: { status: 404, message: 'Channel not found.' },
  YOUTUBE_API_ERROR: { status: 502, message: 'YouTube API is temporarily unavailable.' },
  YOUTUBE_QUOTA_EXCEEDED: {
    status: 503,
    message: 'Service temporarily limited. Please try again in a few hours.',
  },
  TAGS_NOT_AVAILABLE: {
    status: 404,
    message: 'This video has no tags or they are not publicly available.',
  },
  TRANSCRIPT_UNAVAILABLE: {
    status: 404,
    message: 'Transcript is not available for this video.',
  },
  TRANSCRIPT_DISABLED: { status: 404, message: 'Transcripts are disabled for this video.' },
  AI_GENERATION_FAILED: { status: 500, message: 'AI generation failed. Please try again.' },
  AI_SAFETY_BLOCKED: {
    status: 422,
    message: 'Content could not be generated due to safety filters.',
  },
  AI_TIMEOUT: {
    status: 504,
    message: 'AI generation timed out. Please try with a simpler request.',
  },
  INTERNAL_ERROR: { status: 500, message: 'Something went wrong. Please try again.' },
} as const;

export function apiErrorResponse(error: AppError) {
  return NextResponse.json(
    { success: false, error: { code: error.code, message: error.message } },
    { status: error.status },
  );
}

export function apiSuccessResponse<T>(data: T, meta?: Record<string, unknown>) {
  return NextResponse.json({ success: true, data, meta: meta || {} });
}

export function handleApiError(err: unknown): AppError {
  if (err instanceof AppError) return err;

  const message = err instanceof Error ? err.message : 'Unknown error';

  if (message.includes('quota') || message.includes('QUOTA_EXCEEDED')) {
    return new AppError('YOUTUBE_QUOTA_EXCEEDED', ErrorCodes.YOUTUBE_QUOTA_EXCEEDED.message, 503);
  }
  if (message.includes('not found') || message.includes('NOT_FOUND')) {
    return new AppError('VIDEO_NOT_FOUND', ErrorCodes.VIDEO_NOT_FOUND.message, 404);
  }

  console.error('Unhandled API error:', err);
  return new AppError('INTERNAL_ERROR', ErrorCodes.INTERNAL_ERROR.message, 500);
}
