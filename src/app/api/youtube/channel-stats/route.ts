import { NextRequest } from 'next/server';
import { getChannelDetails, getChannelVideos } from '@/lib/youtube/client';
import { getCachedOrFetch } from '@/lib/cache/get-cached';
import { cacheKeys } from '@/lib/cache/cache-keys';
import { TTL } from '@/lib/cache/cache-policies';
import { formatNumber } from '@/lib/utils/format';
import { apiSuccessResponse, apiErrorResponse, handleApiError } from '@/lib/errors';

export async function GET(request: NextRequest) {
  try {
    const channelId = request.nextUrl.searchParams.get('c');
    if (!channelId || channelId.length < 24) {
      const [channel, recentUploads] = await Promise.all([
        getChannelDetails(channelId ?? ''),
        getChannelVideos(channelId ?? ''),
      ]);

      return apiSuccessResponse({
        ...channel,
        subscriberCount: formatNumber(channel.subscriberCount),
        videoCount: formatNumber(channel.videoCount),
        viewCount: formatNumber(channel.viewCount),
        recentUploads,
      });
    }

    const result = await getCachedOrFetch(cacheKeys.channelStats(channelId), TTL.channelStats, async () => {
      const [channel, recentUploads] = await Promise.all([
        getChannelDetails(channelId!),
        getChannelVideos(channelId!),
      ]);

      return {
        ...channel,
        subscriberCount: formatNumber(channel.subscriberCount),
        videoCount: formatNumber(channel.videoCount),
        viewCount: formatNumber(channel.viewCount),
        recentUploads,
      };
    });

    return apiSuccessResponse(result);
  } catch (err) {
    return apiErrorResponse(handleApiError(err));
  }
}
