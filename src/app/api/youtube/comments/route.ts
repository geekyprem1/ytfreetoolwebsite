import { NextRequest } from 'next/server';
import { parseYouTubeUrl } from '@/lib/youtube/url-parser';
import { getCachedComments } from '@/lib/youtube/comments';
import { apiSuccessResponse, apiErrorResponse, handleApiError, AppError, ErrorCodes } from '@/lib/errors';

const MAX_COMMENTS = 2000;

export async function GET(request: NextRequest) {
  try {
    const raw = request.nextUrl.searchParams.get('v');
    if (!raw) {
      return apiErrorResponse(new AppError('MISSING_VIDEO_ID', ErrorCodes.MISSING_VIDEO_ID.message, 400));
    }

    let videoId = raw.trim();
    if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
      const parsed = parseYouTubeUrl(videoId);
      if (parsed?.type === 'video') {
        videoId = parsed.id;
      } else {
        return apiErrorResponse(new AppError('MISSING_VIDEO_ID', ErrorCodes.MISSING_VIDEO_ID.message, 400));
      }
    }

    const rawLimit = request.nextUrl.searchParams.get('limit');
    let limit = MAX_COMMENTS;
    if (rawLimit !== null) {
      if (!/^\d+$/.test(rawLimit)) {
        return apiErrorResponse(new AppError('INVALID_TOOL_INPUT', 'Comment limit must be a whole number from 1 to 2,000.', 400));
      }
      limit = Number(rawLimit);
      if (limit < 1 || limit > MAX_COMMENTS) {
        return apiErrorResponse(new AppError('INVALID_TOOL_INPUT', 'Comment limit must be a whole number from 1 to 2,000.', 400));
      }
    }

    const result = await getCachedComments(videoId, limit);
    return apiSuccessResponse(result);
  } catch (err) {
    return apiErrorResponse(handleApiError(err));
  }
}
