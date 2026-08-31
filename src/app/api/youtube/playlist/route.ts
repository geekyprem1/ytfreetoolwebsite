import { NextRequest } from 'next/server';
import { getPlaylistSummary } from '@/lib/youtube/client';
import { parseYouTubePlaylistId } from '@/lib/youtube/url-parser';
import { getCachedOrFetch } from '@/lib/cache/get-cached';
import { cacheKeys } from '@/lib/cache/cache-keys';
import { TTL } from '@/lib/cache/cache-policies';
import { apiSuccessResponse, apiErrorResponse, handleApiError, AppError, ErrorCodes } from '@/lib/errors';

export async function GET(request: NextRequest) {
  try {
    const raw = request.nextUrl.searchParams.get('list');
    if (!raw) {
      return apiErrorResponse(
        new AppError('INVALID_TOOL_INPUT', 'Missing playlist URL or ID.', 400),
      );
    }

    const playlistId = parseYouTubePlaylistId(raw);
    if (!playlistId) {
      return apiErrorResponse(
        new AppError('INVALID_YOUTUBE_URL', ErrorCodes.INVALID_YOUTUBE_URL.message, 400),
      );
    }

    const summary = await getCachedOrFetch(
      cacheKeys.playlist(playlistId),
      TTL.playlist,
      () => getPlaylistSummary(playlistId),
    );

    return apiSuccessResponse(summary);
  } catch (err) {
    return apiErrorResponse(handleApiError(err));
  }
}
