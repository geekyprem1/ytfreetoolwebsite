import { NextRequest } from 'next/server';
import { getComments, getVideoDetails } from '@/lib/youtube/client';
import { parseYouTubeUrl } from '@/lib/youtube/url-parser';
import { getCachedOrFetch } from '@/lib/cache/get-cached';
import { cacheKeys } from '@/lib/cache/cache-keys';
import { TTL } from '@/lib/cache/cache-policies';
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

    const vid = videoId;
    const result = await getCachedOrFetch(cacheKeys.comments(vid, MAX_COMMENTS), TTL.comments, async () => {
      const comments = await getComments(vid, MAX_COMMENTS);
      // Attach the video title (cheap 1-unit call, best-effort).
      let videoTitle = comments.videoTitle;
      if (!videoTitle) {
        try {
          const detail = await getVideoDetails(vid);
          videoTitle = detail.title;
        } catch {
          videoTitle = '';
        }
      }
      return { ...comments, videoTitle };
    });

    return apiSuccessResponse(result);
  } catch (err) {
    return apiErrorResponse(handleApiError(err));
  }
}
