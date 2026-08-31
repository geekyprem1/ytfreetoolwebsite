import { NextRequest } from 'next/server';
import { getLiveVideoCount } from '@/lib/youtube/client';
import { parseYouTubeUrl } from '@/lib/youtube/url-parser';
import { getCachedOrFetch } from '@/lib/cache/get-cached';
import { cacheKeys } from '@/lib/cache/cache-keys';
import { TTL } from '@/lib/cache/cache-policies';
import { isLivePollAllowed } from '@/lib/youtube/quota';
import { apiSuccessResponse, apiErrorResponse, handleApiError, AppError, ErrorCodes } from '@/lib/errors';

export async function GET(request: NextRequest) {
  try {
    const raw = request.nextUrl.searchParams.get('v');
    if (!raw) {
      return apiErrorResponse(new AppError('MISSING_VIDEO_ID', ErrorCodes.MISSING_VIDEO_ID.message, 400));
    }

    // Accept a bare 11-char ID or any video URL.
    let videoId = raw.trim();
    if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
      const parsed = parseYouTubeUrl(videoId);
      if (parsed?.type === 'video') {
        videoId = parsed.id;
      } else {
        return apiErrorResponse(new AppError('MISSING_VIDEO_ID', ErrorCodes.MISSING_VIDEO_ID.message, 400));
      }
    }

    const key = cacheKeys.liveViews(videoId);
    const allowed = await isLivePollAllowed();
    const vid = videoId;
    const fetcher = allowed
      ? () => getLiveVideoCount(vid)
      : async () => {
          throw new AppError(
            'YOUTUBE_QUOTA_EXCEEDED',
            'Live updates are paused to protect the daily quota. Try again later.',
            503,
          );
        };

    const data = await getCachedOrFetch(key, TTL.liveCount, fetcher);
    return apiSuccessResponse({ ...data, livePaused: !allowed });
  } catch (err) {
    return apiErrorResponse(handleApiError(err));
  }
}
