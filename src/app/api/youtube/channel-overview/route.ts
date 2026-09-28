import { NextRequest } from 'next/server';
import { getChannelDetails } from '@/lib/youtube/client';
import { normalizeChannelInput } from '@/lib/youtube/url-parser';
import { getCachedOrFetch } from '@/lib/cache/get-cached';
import { cacheKeys } from '@/lib/cache/cache-keys';
import { TTL } from '@/lib/cache/cache-policies';
import { apiSuccessResponse, apiErrorResponse, handleApiError, AppError, ErrorCodes } from '@/lib/errors';
import type { ChannelOverview } from '@/lib/youtube/types';

/**
 * GET /api/youtube/channel-overview?c=<url | @handle | UC…>
 *
 * Raw (unformatted) public channel numbers + creation date — 1 quota unit.
 * Powers the Channel Age Checker and the Views-to-Subscribers Ratio Calculator.
 */
async function fetchOverview(input: string): Promise<ChannelOverview> {
  const c = await getChannelDetails(input);
  return {
    id: c.id,
    title: c.title,
    customUrl: c.customUrl,
    thumbnail: c.thumbnail,
    publishedAt: c.publishedAt,
    country: c.country,
    subscriberCount: c.subscriberCount,
    viewCount: c.viewCount,
    videoCount: c.videoCount,
  };
}

export async function GET(request: NextRequest) {
  try {
    const raw = request.nextUrl.searchParams.get('c');
    const input = raw ? (normalizeChannelInput(raw) ?? raw.trim().replace(/^@/, '')) : '';
    if (!input || input.length > 200) {
      return apiErrorResponse(new AppError('MISSING_CHANNEL_ID', ErrorCodes.MISSING_CHANNEL_ID.message, 400));
    }

    const isChannelId = /^UC[a-zA-Z0-9_-]{22}$/.test(input);
    const result = isChannelId
      ? await getCachedOrFetch(cacheKeys.channelOverview(input), TTL.channelStats, () => fetchOverview(input))
      : await fetchOverview(input);

    return apiSuccessResponse(result);
  } catch (err) {
    return apiErrorResponse(handleApiError(err));
  }
}
