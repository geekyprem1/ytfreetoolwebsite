import { NextRequest } from 'next/server';
import { getVideoDetails } from '@/lib/youtube/client';
import { getThumbnailUrls } from '@/lib/youtube/thumbnail';
import { getCachedOrFetch } from '@/lib/cache/get-cached';
import { cacheKeys } from '@/lib/cache/cache-keys';
import { TTL } from '@/lib/cache/cache-policies';
import { apiSuccessResponse, apiErrorResponse, handleApiError, AppError, ErrorCodes } from '@/lib/errors';

export async function GET(request: NextRequest) {
  try {
    const videoId = request.nextUrl.searchParams.get('v');
    if (!videoId || !/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
      return apiErrorResponse(new AppError('MISSING_VIDEO_ID', ErrorCodes.MISSING_VIDEO_ID.message, 400));
    }

    const result = await getCachedOrFetch(
      cacheKeys.thumbnail(videoId, 'all'),
      TTL.thumbnail,
      () => getVideoDetails(videoId),
    );

    const thumbnails = getThumbnailUrls(result.id);
    return apiSuccessResponse({
      videoId: result.id,
      videoTitle: result.title,
      thumbnails,
    });
  } catch (err) {
    return apiErrorResponse(handleApiError(err));
  }
}
