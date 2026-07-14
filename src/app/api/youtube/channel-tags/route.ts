import { NextRequest } from 'next/server';
import { getChannelDetails, getVideoTags, getChannelVideos } from '@/lib/youtube/client';
import { getCachedOrFetch } from '@/lib/cache/get-cached';
import { cacheKeys } from '@/lib/cache/cache-keys';
import { TTL } from '@/lib/cache/cache-policies';
import { apiSuccessResponse, apiErrorResponse, handleApiError } from '@/lib/errors';

export async function GET(request: NextRequest) {
  try {
    const channelId = request.nextUrl.searchParams.get('c');
    if (!channelId || channelId.length < 24) {
      const channel = await getChannelDetails(channelId ?? '');
      const videos = await getChannelVideos(channelId ?? '', 10);

      const allTags = new Set<string>();
      for (const video of videos) {
        try {
          const { tags } = await getVideoTags(video.videoId);
          tags.forEach((t) => allTags.add(t));
        } catch {
          // skip videos with no tags
        }
      }

      return apiSuccessResponse({
        channelId: channel.id,
        channelTitle: channel.title,
        inferredTags: Array.from(allTags),
        videoCount: videos.length,
        disclaimer:
          'Tags are inferred from the channel\'s 10 most recent video tags. YouTube does not expose channel-level keyword data.',
      });
    }

    const result = await getCachedOrFetch(cacheKeys.channelTags(channelId), TTL.channelTags, async () => {
      const channel = await getChannelDetails(channelId!);
      const videos = await getChannelVideos(channelId!, 10);

      const allTags = new Set<string>();
      for (const video of videos) {
        try {
          const { tags } = await getVideoTags(video.videoId);
          tags.forEach((t) => allTags.add(t));
        } catch {
          // skip
        }
      }

      return {
        channelId: channel.id,
        channelTitle: channel.title,
        inferredTags: Array.from(allTags),
        videoCount: videos.length,
        disclaimer:
          'Tags are inferred from the channel\'s 10 most recent video tags. YouTube does not expose channel-level keyword data.',
      };
    });

    return apiSuccessResponse(result);
  } catch (err) {
    return apiErrorResponse(handleApiError(err));
  }
}
