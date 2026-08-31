import { NextRequest } from 'next/server';
import { getChannelDetails } from '@/lib/youtube/client';
import { normalizeChannelInput } from '@/lib/youtube/url-parser';
import { getCachedOrFetch } from '@/lib/cache/get-cached';
import { cacheKeys } from '@/lib/cache/cache-keys';
import { TTL } from '@/lib/cache/cache-policies';
import { apiSuccessResponse, apiErrorResponse, handleApiError, AppError, ErrorCodes } from '@/lib/errors';

/** Raw (unformatted) channel numbers for side-by-side comparison math. */
async function fetchCompareData(input: string) {
  const c = await getChannelDetails(input);
  return {
    id: c.id,
    title: c.title,
    thumbnail: c.thumbnail,
    customUrl: c.customUrl,
    country: c.country,
    publishedAt: c.publishedAt,
    subscriberCount: c.subscriberCount,
    videoCount: c.videoCount,
    viewCount: c.viewCount,
  };
}

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

    const isChannelId = input.startsWith('UC') && input.length >= 24;
    const fetcher = () => fetchCompareData(input);
    const data = isChannelId
      ? await getCachedOrFetch(cacheKeys.channelCompare(input), TTL.channelStats, fetcher)
      : await fetcher();

    return apiSuccessResponse(data);
  } catch (err) {
    return apiErrorResponse(handleApiError(err));
  }
}
