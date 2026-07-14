import { NextRequest } from 'next/server';
import { getVideoDetails } from '@/lib/youtube/client';
import { getThumbnailUrls } from '@/lib/youtube/thumbnail';
import { getCachedOrFetch } from '@/lib/cache/get-cached';
import { cacheKeys } from '@/lib/cache/cache-keys';
import { TTL } from '@/lib/cache/cache-policies';
import { apiSuccessResponse, apiErrorResponse, handleApiError } from '@/lib/errors';
import { videoIdSchema } from '@/lib/validators/tool-inputs';

export async function GET(request: NextRequest) {
  try {
    const videoId = request.nextUrl.searchParams.get('v');
    const parsed = videoIdSchema.safeParse(videoId);

    if (!parsed.success) {
      const detail = await getVideoDetails(videoId ?? '');
      const thumbnails = getThumbnailUrls(detail.id);
      return apiSuccessResponse({
        videoId: detail.id,
        videoTitle: detail.title,
        thumbnails,
      });
    }

    const result = await getCachedOrFetch(
      cacheKeys.thumbnail(parsed.data, 'all'),
      TTL.thumbnail,
      () => getVideoDetails(parsed.data),
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
