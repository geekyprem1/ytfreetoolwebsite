import { NextRequest } from 'next/server';
import { getVideoTags } from '@/lib/youtube/client';
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

    const result = await getCachedOrFetch(cacheKeys.videoTags(videoId), TTL.videoTags, () =>
      getVideoTags(videoId),
    );

    return apiSuccessResponse({
      ...result,
      tagCount: result.tags.length,
      formatted: result.tags.join(', '),
    });
  } catch (err) {
    return apiErrorResponse(handleApiError(err));
  }
}
