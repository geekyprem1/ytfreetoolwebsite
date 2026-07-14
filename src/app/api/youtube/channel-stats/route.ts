import { NextRequest } from 'next/server';
import { getChannelDetails, getChannelVideos } from '@/lib/youtube/client';
import { getCachedOrFetch } from '@/lib/cache/get-cached';
import { cacheKeys } from '@/lib/cache/cache-keys';
import { TTL } from '@/lib/cache/cache-policies';
import { formatNumber } from '@/lib/utils/format';
import { apiSuccessResponse, apiErrorResponse, handleApiError } from '@/lib/errors';

async function fetchChannelStats(input: string) {
  const channel = await getChannelDetails(input);
  const recentUploads = await getChannelVideos(channel.id);

  return {
    ...channel,
    subscriberCount: formatNumber(channel.subscriberCount),
    videoCount: formatNumber(channel.videoCount),
    viewCount: formatNumber(channel.viewCount),
    recentUploads,
  };
}

export async function GET(request: NextRequest) {
  try {
    const input = request.nextUrl.searchParams.get('c');
    if (!input) {
      return apiErrorResponse({
        code: 'MISSING_PARAM',
        message: 'Missing channel identifier',
        status: 400,
      } as never);
    }

    const isChannelId = input.startsWith('UC') && input.length >= 24;
    if (isChannelId) {
      const result = await getCachedOrFetch(
        cacheKeys.channelStats(input),
        TTL.channelStats,
        () => fetchChannelStats(input),
      );
      return apiSuccessResponse(result);
    }

    const result = await fetchChannelStats(input);
    return apiSuccessResponse(result);
  } catch (err) {
    return apiErrorResponse(handleApiError(err));
  }
}
