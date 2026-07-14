import { NextRequest } from 'next/server';
import { getChannelDetails, getVideoTags, getChannelVideos } from '@/lib/youtube/client';
import { getCachedOrFetch } from '@/lib/cache/get-cached';
import { cacheKeys } from '@/lib/cache/cache-keys';
import { TTL } from '@/lib/cache/cache-policies';
import { apiSuccessResponse, apiErrorResponse, handleApiError } from '@/lib/errors';

async function fetchChannelTags(input: string) {
  const channel = await getChannelDetails(input);
  const videos = await getChannelVideos(channel.id, 10);

  const allTags = new Set<string>();
  for (const video of videos) {
    try {
      const { tags } = await getVideoTags(video.videoId);
      tags.forEach((t) => allTags.add(t));
    } catch {
      // skip videos with no tags
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
        cacheKeys.channelTags(input),
        TTL.channelTags,
        () => fetchChannelTags(input),
      );
      return apiSuccessResponse(result);
    }

    const result = await fetchChannelTags(input);
    return apiSuccessResponse(result);
  } catch (err) {
    return apiErrorResponse(handleApiError(err));
  }
}
