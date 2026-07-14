import { youtube } from '@googleapis/youtube';
import { AppError, ErrorCodes } from '@/lib/errors';
import type {
  YouTubeVideo,
  YouTubeChannel,
  YouTubeChannelVideo,
  ResolveResult,
} from '@/lib/youtube/types';
import { parseYouTubeUrl } from '@/lib/youtube/url-parser';

const apiKey = process.env.YOUTUBE_API_KEY;

function getClient() {
  if (!apiKey) {
    throw new AppError('YOUTUBE_API_ERROR', 'YouTube API key is not configured', 500);
  }
  return youtube({ version: 'v3', auth: apiKey });
}

export async function getVideoDetails(videoId: string): Promise<YouTubeVideo> {
  const yt = getClient();
  const res = await yt.videos.list({
    id: [videoId],
    part: ['snippet', 'statistics', 'contentDetails'],
  });

  const item = res.data.items?.[0];
  if (!item) {
    throw new AppError('VIDEO_NOT_FOUND', ErrorCodes.VIDEO_NOT_FOUND.message, 404);
  }

  return {
    id: item.id!,
    title: item.snippet?.title ?? 'Unknown',
    description: item.snippet?.description ?? '',
    thumbnail: item.snippet?.thumbnails?.high?.url ?? item.snippet?.thumbnails?.default?.url ?? '',
    channelId: item.snippet?.channelId ?? '',
    channelTitle: item.snippet?.channelTitle ?? 'Unknown',
    publishedAt: item.snippet?.publishedAt ?? '',
    duration: item.contentDetails?.duration ?? '',
    category: item.snippet?.categoryId ?? '',
    viewCount: parseInt(item.statistics?.viewCount ?? '0', 10),
    likeCount: parseInt(item.statistics?.likeCount ?? '0', 10),
    commentCount: parseInt(item.statistics?.commentCount ?? '0', 10),
    tags: item.snippet?.tags ?? [],
  };
}

export async function getVideoTags(videoId: string): Promise<{
  videoId: string;
  videoTitle: string;
  tags: string[];
}> {
  const yt = getClient();
  const res = await yt.videos.list({
    id: [videoId],
    part: ['snippet'],
  });

  const item = res.data.items?.[0];
  if (!item) {
    throw new AppError('VIDEO_NOT_FOUND', ErrorCodes.VIDEO_NOT_FOUND.message, 404);
  }

  return {
    videoId: item.id!,
    videoTitle: item.snippet?.title ?? 'Unknown',
    tags: item.snippet?.tags ?? [],
  };
}

export async function getChannelDetails(channelId: string): Promise<YouTubeChannel> {
  const yt = getClient();
  const res = await yt.channels.list({
    id: [channelId],
    part: ['snippet', 'statistics', 'brandingSettings'],
  });

  const item = res.data.items?.[0];
  if (!item) {
    throw new AppError('CHANNEL_NOT_FOUND', ErrorCodes.CHANNEL_NOT_FOUND.message, 404);
  }

  return {
    id: item.id!,
    title: item.snippet?.title ?? 'Unknown',
    description: item.snippet?.description ?? '',
    thumbnail: item.snippet?.thumbnails?.high?.url ?? item.snippet?.thumbnails?.default?.url ?? '',
    customUrl: item.snippet?.customUrl ?? '',
    publishedAt: item.snippet?.publishedAt ?? '',
    country: item.snippet?.country ?? '',
    subscriberCount: parseInt(item.statistics?.subscriberCount ?? '0', 10),
    videoCount: parseInt(item.statistics?.videoCount ?? '0', 10),
    viewCount: parseInt(item.statistics?.viewCount ?? '0', 10),
  };
}

export async function getChannelVideos(channelId: string, maxResults = 5): Promise<YouTubeChannelVideo[]> {
  const yt = getClient();
  const res = await yt.search.list({
    channelId,
    type: ['video'],
    order: 'date',
    maxResults,
    part: ['snippet'],
  });

  return (res.data.items ?? []).map((item) => ({
    videoId: item.id?.videoId ?? '',
    title: item.snippet?.title ?? 'Unknown',
    thumbnail: item.snippet?.thumbnails?.default?.url ?? '',
    publishedAt: item.snippet?.publishedAt ?? '',
    viewCount: 0,
  }));
}

export async function resolveUrl(url: string): Promise<ResolveResult> {
  const parsed = parseYouTubeUrl(url);
  if (!parsed) {
    throw new AppError('INVALID_YOUTUBE_URL', ErrorCodes.INVALID_YOUTUBE_URL.message, 400);
  }

  try {
    if (parsed.type === 'video') {
      const details = await getVideoDetails(parsed.id);
      return { type: 'video', id: parsed.id, title: details.title };
    }
    if (parsed.id.startsWith('UC')) {
      const details = await getChannelDetails(parsed.id);
      return { type: 'channel', id: parsed.id, title: details.title };
    }
    return { type: 'channel', id: parsed.id };
  } catch {
    return { type: parsed.type, id: parsed.id };
  }
}
