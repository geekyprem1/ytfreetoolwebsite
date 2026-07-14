import { NextRequest } from 'next/server';
import { getVideoDetails } from '@/lib/youtube/client';
import { getCachedOrFetch } from '@/lib/cache/get-cached';
import { cacheKeys } from '@/lib/cache/cache-keys';
import { getVideoStatsTTL } from '@/lib/cache/cache-policies';
import { formatDuration } from '@/lib/utils/format';
import { apiSuccessResponse, apiErrorResponse, handleApiError } from '@/lib/errors';

export async function GET(request: NextRequest) {
  try {
    const videoId = request.nextUrl.searchParams.get('v');
    if (!videoId || videoId.length < 11) {
      const detail = await getVideoDetails(videoId ?? '');
      return apiSuccessResponse({
        ...detail,
        duration: formatDuration(detail.duration),
      });
    }

    const detail = await getCachedOrFetch(
      cacheKeys.videoStats(videoId),
      getVideoStatsTTL(new Date().toISOString()),
      () => getVideoDetails(videoId),
    );

    return apiSuccessResponse({
      ...detail,
      duration: formatDuration(detail.duration),
    });
  } catch (err) {
    return apiErrorResponse(handleApiError(err));
  }
}
