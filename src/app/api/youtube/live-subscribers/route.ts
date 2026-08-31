import { NextRequest } from 'next/server';
import { getLiveChannelCount } from '@/lib/youtube/client';
import { normalizeChannelInput } from '@/lib/youtube/url-parser';
import { getCachedOrFetch } from '@/lib/cache/get-cached';
import { cacheKeys } from '@/lib/cache/cache-keys';
import { TTL } from '@/lib/cache/cache-policies';
import { isLivePollAllowed } from '@/lib/youtube/quota';
import { apiSuccessResponse, apiErrorResponse, handleApiError, AppError, ErrorCodes } from '@/lib/errors';

export async function GET(request: NextRequest) {
  try {
    const raw = request.nextUrl.searchParams.get('c');
    if (!raw) {
      return apiErrorResponse(
        new AppError('MISSING_CHANNEL_ID', ErrorCodes.MISSING_CHANNEL_ID.message, 400),
      );
    }

    const input = normalizeChannelInput(raw) ?? raw.trim().replace(/^@/, '');
    if (!input) {
      return apiErrorResponse(
        new AppError('MISSING_CHANNEL_ID', ErrorCodes.MISSING_CHANNEL_ID.message, 400),
      );
    }

    const key = cacheKeys.liveSubs(input.startsWith('UC') ? input : `handle:${input}`);

    // Under the soft quota limit we fetch fresh (through the 60s cache). Over it
    // we serve only the last cached snapshot and never trigger a new API call.
    const allowed = await isLivePollAllowed();
    const fetcher = allowed
      ? () => getLiveChannelCount(input)
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
