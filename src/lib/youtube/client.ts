import { youtube } from '@googleapis/youtube';
import { AppError, ErrorCodes } from '@/lib/errors';
import type {
  YouTubeVideo,
  YouTubeChannel,
  YouTubeChannelVideo,
  YouTubeVideoMonetizationProbe,
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
  duration: string;
  isShorts: boolean;
}> {
  const yt = getClient();
  const res = await yt.videos.list({
    id: [videoId],
    part: ['snippet', 'contentDetails'],
  });

  const item = res.data.items?.[0];
  if (!item) {
    throw new AppError('VIDEO_NOT_FOUND', ErrorCodes.VIDEO_NOT_FOUND.message, 404);
  }

  const duration = item.contentDetails?.duration ?? '';
  const isShorts = isYouTubeShortsDuration(duration);

  return {
    videoId: item.id!,
    videoTitle: item.snippet?.title ?? 'Unknown',
    tags: item.snippet?.tags ?? [],
    duration,
    isShorts,
  };
}

/** YouTube Shorts are typically ≤ 60 seconds (ISO 8601 duration). */
function isYouTubeShortsDuration(isoDuration: string): boolean {
  if (!isoDuration) return false;
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/i);
  if (!match) return false;
  const hours = parseInt(match[1] || '0', 10);
  const minutes = parseInt(match[2] || '0', 10);
  const seconds = parseInt(match[3] || '0', 10);
  return hours * 3600 + minutes * 60 + seconds <= 60;
}

export async function getChannelDetails(channelIdOrHandle: string): Promise<YouTubeChannel> {
  const yt = getClient();

  const params: Record<string, unknown> = {
    part: ['snippet', 'statistics', 'brandingSettings', 'status', 'contentDetails'],
  };

  if (channelIdOrHandle.startsWith('UC')) {
    params.id = [channelIdOrHandle];
  } else {
    params.forHandle = channelIdOrHandle.replace(/^@/, '');
  }

  const res = await yt.channels.list(params as never);

  const item = res.data.items?.[0];
  if (!item) {
    throw new AppError('CHANNEL_NOT_FOUND', ErrorCodes.CHANNEL_NOT_FOUND.message, 404);
  }

  const madeForKids =
    typeof item.status?.madeForKids === 'boolean'
      ? item.status.madeForKids
      : typeof item.status?.selfDeclaredMadeForKids === 'boolean'
        ? item.status.selfDeclaredMadeForKids
        : null;

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
    madeForKids,
    uploadsPlaylistId: item.contentDetails?.relatedPlaylists?.uploads ?? null,
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

/** Recent uploads with public fields useful for monetization heuristics (official Data API only). */
export async function getRecentVideosMonetizationProbe(
  channelId: string,
  maxResults = 10,
  uploadsPlaylistId?: string | null,
): Promise<YouTubeVideoMonetizationProbe[]> {
  const yt = getClient();
  let ids: string[] = [];

  // Prefer uploads playlist (cheap + reliable) over search.list
  const playlistId = uploadsPlaylistId ?? null;
  if (playlistId) {
    try {
      const playlist = await yt.playlistItems.list({
        playlistId,
        maxResults,
        part: ['contentDetails', 'snippet'],
      });
      ids = (playlist.data.items ?? [])
        .map((item) => item.contentDetails?.videoId)
        .filter((id): id is string => Boolean(id));
    } catch {
      ids = [];
    }
  }

  if (ids.length === 0) {
    const search = await yt.search.list({
      channelId,
      type: ['video'],
      order: 'date',
      maxResults,
      part: ['snippet'],
    });
    ids = (search.data.items ?? [])
      .map((item) => item.id?.videoId)
      .filter((id): id is string => Boolean(id));
  }

  if (ids.length === 0) return [];

  // Omit paidProductPlacementDetails — owner-only; requesting it is useless for public checks
  const details = await yt.videos.list({
    id: ids,
    part: ['snippet', 'statistics', 'contentDetails', 'status'],
  });

  return (details.data.items ?? []).map((item) => {
    const madeForKids =
      typeof item.status?.madeForKids === 'boolean'
        ? item.status.madeForKids
        : typeof item.status?.selfDeclaredMadeForKids === 'boolean'
          ? item.status.selfDeclaredMadeForKids
          : null;

    return {
      videoId: item.id ?? '',
      title: item.snippet?.title ?? 'Unknown',
      thumbnail:
        item.snippet?.thumbnails?.medium?.url ??
        item.snippet?.thumbnails?.default?.url ??
        '',
      publishedAt: item.snippet?.publishedAt ?? '',
      viewCount: parseInt(item.statistics?.viewCount ?? '0', 10),
      licensedContent:
        typeof item.contentDetails?.licensedContent === 'boolean'
          ? item.contentDetails.licensedContent
          : null,
      madeForKids,
      hasPaidProductPlacement: null,
    };
  });
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
    const details = await getChannelDetails(parsed.id);
    return { type: 'channel', id: details.id, title: details.title };
  } catch {
    return { type: parsed.type, id: parsed.id };
  }
}
