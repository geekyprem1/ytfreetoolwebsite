import { youtube } from '@googleapis/youtube';
import { AppError, ErrorCodes } from '@/lib/errors';
import type {
  YouTubeVideo,
  YouTubeChannel,
  YouTubeChannelVideo,
  YouTubeVideoMonetizationProbe,
  YouTubePlaylistSummary,
  LiveChannelCount,
  LiveVideoCount,
  YouTubeComment,
  YouTubeCommentsResult,
  TrendingVideo,
  TrendingResult,
  ResolveResult,
} from '@/lib/youtube/types';
import { parseYouTubeUrl } from '@/lib/youtube/url-parser';
import { reserveSearchListCall, trackQuota } from '@/lib/youtube/quota';

const apiKey = process.env.YOUTUBE_API_KEY;

async function requireSearchListQuota() {
  if (!(await reserveSearchListCall())) {
    throw new AppError('YOUTUBE_QUOTA_EXCEEDED', 'The daily YouTube search request limit has been reached.', 503);
  }
}

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
    viewCountAvailable: item.statistics?.viewCount != null,
    likeCountAvailable: item.statistics?.likeCount != null,
    commentCountAvailable: item.statistics?.commentCount != null,
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

  if (!channelIdOrHandle.startsWith('@') && /^UC[a-zA-Z0-9_-]{22}$/.test(channelIdOrHandle)) {
    params.id = [channelIdOrHandle];
  } else {
    params.forHandle = channelIdOrHandle.replace(/^@/, '');
  }

  const res = await yt.channels.list(params as never);
  await trackQuota(1);

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

  const thumbs = item.snippet?.thumbnails;

  return {
    id: item.id!,
    title: item.snippet?.title ?? 'Unknown',
    description: item.snippet?.description ?? '',
    thumbnail: thumbs?.high?.url ?? thumbs?.default?.url ?? '',
    thumbnailHigh: thumbs?.high?.url ?? thumbs?.medium?.url ?? thumbs?.default?.url ?? '',
    bannerUrl: item.brandingSettings?.image?.bannerExternalUrl ?? '',
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

export interface ChannelBatchStats {
  id: string;
  title: string;
  customUrl: string;
  thumbnail: string;
  subscriberCount: number;
  hiddenSubscriberCount: boolean;
  viewCount: number;
  videoCount: number;
}

/**
 * Public stats for many channels at once — 1 quota unit per 50 IDs.
 * Used by the rankings pages. Missing/terminated channels are simply absent
 * from the result.
 */
export async function getChannelsBatch(channelIds: string[]): Promise<ChannelBatchStats[]> {
  const yt = getClient();
  const out: ChannelBatchStats[] = [];

  for (let i = 0; i < channelIds.length; i += 50) {
    const batch = channelIds.slice(i, i + 50);
    const res = await yt.channels.list({
      part: ['snippet', 'statistics'],
      id: batch,
      maxResults: 50,
    });
    await trackQuota(1);

    for (const item of res.data.items ?? []) {
      if (!item.id) continue;
      const thumbs = item.snippet?.thumbnails;
      out.push({
        id: item.id,
        title: item.snippet?.title ?? 'Unknown',
        customUrl: item.snippet?.customUrl ?? '',
        thumbnail: thumbs?.default?.url ?? thumbs?.medium?.url ?? '',
        subscriberCount: parseInt(item.statistics?.subscriberCount ?? '0', 10),
        hiddenSubscriberCount: Boolean(item.statistics?.hiddenSubscriberCount),
        viewCount: parseInt(item.statistics?.viewCount ?? '0', 10),
        videoCount: parseInt(item.statistics?.videoCount ?? '0', 10),
      });
    }
  }

  return out;
}

export async function getChannelVideos(
  channelId: string,
  maxResults = 5,
  uploadsPlaylistId?: string | null,
): Promise<YouTubeChannelVideo[]> {
  const yt = getClient();

  if (uploadsPlaylistId) {
    const playlist = await yt.playlistItems.list({
      playlistId: uploadsPlaylistId,
      maxResults: Math.min(50, Math.max(1, maxResults)),
      part: ['contentDetails', 'snippet'],
    });
    await trackQuota(1);
    return (playlist.data.items ?? []).flatMap((item) => {
      const videoId = item.contentDetails?.videoId ?? item.snippet?.resourceId?.videoId;
      if (!videoId) return [];
      return [{
        videoId,
        title: item.snippet?.title ?? 'Unknown',
        thumbnail: item.snippet?.thumbnails?.default?.url ?? '',
        publishedAt: item.contentDetails?.videoPublishedAt ?? item.snippet?.publishedAt ?? '',
        viewCount: 0,
      }];
    });
  }

  await requireSearchListQuota();
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

/** One uploads-playlist page; callers decide how many pages to expose. */
export async function getChannelUploadsPage(playlistId: string, pageToken?: string) {
  const yt = getClient();
  const response = await yt.playlistItems.list({
    playlistId,
    pageToken,
    maxResults: 25,
    part: ['contentDetails', 'snippet'],
  });
  await trackQuota(1);
  return {
    videos: (response.data.items ?? []).flatMap((item) => {
      const videoId = item.contentDetails?.videoId ?? item.snippet?.resourceId?.videoId;
      if (!videoId) return [];
      return [{
        videoId,
        title: item.snippet?.title ?? 'Unavailable video',
        thumbnail: item.snippet?.thumbnails?.medium?.url ?? item.snippet?.thumbnails?.default?.url ?? '',
        publishedAt: item.contentDetails?.videoPublishedAt ?? item.snippet?.publishedAt ?? '',
      }];
    }),
    nextPageToken: response.data.nextPageToken ?? null,
  };
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
    await requireSearchListQuota();
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

/** Parse an ISO-8601 duration (PT#H#M#S) to seconds. */
function isoDurationToSeconds(iso: string): number {
  if (!iso) return 0;
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/i);
  if (!match) return 0;
  const h = parseInt(match[1] || '0', 10);
  const m = parseInt(match[2] || '0', 10);
  const s = parseInt(match[3] || '0', 10);
  return h * 3600 + m * 60 + s;
}

/**
 * Total runtime of a playlist.
 *
 * Cost is cheap: 1 quota unit per 50 playlist items (playlistItems.list) plus
 * 1 unit per 50 videos (videos.list). `maxVideos` caps both to protect quota;
 * playlists longer than the cap return `truncated: true`.
 */
export async function getPlaylistSummary(
  playlistId: string,
  maxVideos = 500,
): Promise<YouTubePlaylistSummary> {
  const yt = getClient();

  const videoIds: string[] = [];
  let pageToken: string | undefined;
  let firstTitle = '';
  let firstChannel = '';
  let firstThumb = '';

  do {
    const page = await yt.playlistItems.list({
      playlistId,
      maxResults: 50,
      part: ['contentDetails', 'snippet'],
      pageToken,
    });

    const items = page.data.items ?? [];
    if (!firstTitle && items[0]) {
      firstThumb =
        items[0].snippet?.thumbnails?.medium?.url ??
        items[0].snippet?.thumbnails?.default?.url ??
        '';
    }

    for (const item of items) {
      const vid = item.contentDetails?.videoId;
      if (vid) videoIds.push(vid);
    }

    pageToken = page.data.nextPageToken ?? undefined;
  } while (pageToken && videoIds.length < maxVideos);

  const truncated = Boolean(pageToken) || videoIds.length > maxVideos;
  const cappedIds = videoIds.slice(0, maxVideos);

  if (cappedIds.length === 0) {
    throw new AppError('VIDEO_NOT_FOUND', 'Playlist is empty or unavailable.', 404);
  }

  // Fetch the playlist's own metadata (title + owner) in one cheap call.
  try {
    const meta = await yt.playlists.list({ id: [playlistId], part: ['snippet'] });
    const pl = meta.data.items?.[0];
    if (pl) {
      firstTitle = pl.snippet?.title ?? firstTitle;
      firstChannel = pl.snippet?.channelTitle ?? '';
      firstThumb =
        pl.snippet?.thumbnails?.medium?.url ?? pl.snippet?.thumbnails?.default?.url ?? firstThumb;
    }
  } catch {
    // metadata is best-effort; totals still work without it
  }

  let totalSeconds = 0;
  let countedVideos = 0;

  for (let i = 0; i < cappedIds.length; i += 50) {
    const chunk = cappedIds.slice(i, i + 50);
    const res = await yt.videos.list({ id: chunk, part: ['contentDetails'] });
    for (const item of res.data.items ?? []) {
      const secs = isoDurationToSeconds(item.contentDetails?.duration ?? '');
      totalSeconds += secs;
      countedVideos += 1;
    }
  }

  return {
    id: playlistId,
    title: firstTitle || 'YouTube Playlist',
    channelTitle: firstChannel,
    thumbnail: firstThumb,
    videoCount: videoIds.length,
    totalSeconds,
    countedVideos,
    truncated,
  };
}

/** Lightweight channel snapshot for the live subscriber counter (1 quota unit). */
export async function getLiveChannelCount(channelIdOrHandle: string): Promise<LiveChannelCount> {
  const yt = getClient();
  const params: Record<string, unknown> = { part: ['snippet', 'statistics'] };
  if (channelIdOrHandle.startsWith('UC')) {
    params.id = [channelIdOrHandle];
  } else {
    params.forHandle = channelIdOrHandle.replace(/^@/, '');
  }

  const res = await yt.channels.list(params as never);
  await trackQuota(1);

  const item = res.data.items?.[0];
  if (!item) {
    throw new AppError('CHANNEL_NOT_FOUND', ErrorCodes.CHANNEL_NOT_FOUND.message, 404);
  }

  const thumbs = item.snippet?.thumbnails;
  return {
    id: item.id!,
    title: item.snippet?.title ?? 'Unknown',
    thumbnail: thumbs?.high?.url ?? thumbs?.default?.url ?? '',
    customUrl: item.snippet?.customUrl ?? '',
    subscriberCount: parseInt(item.statistics?.subscriberCount ?? '0', 10),
    hiddenSubscriberCount: Boolean(item.statistics?.hiddenSubscriberCount),
    videoCount: parseInt(item.statistics?.videoCount ?? '0', 10),
    viewCount: parseInt(item.statistics?.viewCount ?? '0', 10),
    fetchedAt: Date.now(),
  };
}

/** Lightweight video snapshot for the live view counter (1 quota unit). */
export async function getLiveVideoCount(videoId: string): Promise<LiveVideoCount> {
  const yt = getClient();
  const res = await yt.videos.list({ id: [videoId], part: ['snippet', 'statistics'] });
  await trackQuota(1);

  const item = res.data.items?.[0];
  if (!item) {
    throw new AppError('VIDEO_NOT_FOUND', ErrorCodes.VIDEO_NOT_FOUND.message, 404);
  }

  return {
    id: item.id!,
    title: item.snippet?.title ?? 'Unknown',
    thumbnail: item.snippet?.thumbnails?.medium?.url ?? item.snippet?.thumbnails?.default?.url ?? '',
    channelTitle: item.snippet?.channelTitle ?? '',
    viewCount: parseInt(item.statistics?.viewCount ?? '0', 10),
    likeCount: parseInt(item.statistics?.likeCount ?? '0', 10),
    likeCountAvailable: item.statistics?.likeCount != null,
    commentCount: parseInt(item.statistics?.commentCount ?? '0', 10),
    commentCountAvailable: item.statistics?.commentCount != null,
    fetchedAt: Date.now(),
  };
}

/**
 * Fetch top-level comments for a video (1 quota unit per 100 comments).
 * Capped by `maxComments` to protect quota; sets `truncated` when more exist.
 */
export async function getComments(videoId: string, maxComments = 500): Promise<YouTubeCommentsResult> {
  const yt = getClient();
  const comments: YouTubeComment[] = [];
  let pageToken: string | undefined;
  const videoTitle = '';

  try {
    do {
      const res = await yt.commentThreads.list({
        videoId,
        part: ['snippet'],
        maxResults: Math.min(100, maxComments - comments.length),
        order: 'relevance',
        textFormat: 'plainText',
        pageToken,
      });
      await trackQuota(1);

      for (const item of res.data.items ?? []) {
        const top = item.snippet?.topLevelComment?.snippet;
        if (!top) continue;
        comments.push({
          id: item.id ?? '',
          author: top.authorDisplayName ?? 'Unknown',
          authorChannelUrl: top.authorChannelUrl ?? '',
          text: top.textDisplay ?? '',
          likeCount: top.likeCount ?? 0,
          publishedAt: top.publishedAt ?? '',
        });
      }

      pageToken = res.data.nextPageToken ?? undefined;
    } while (pageToken && comments.length < maxComments);
  } catch (e) {
    const msg = e instanceof Error ? e.message : '';
    if (msg.includes('disabled') || msg.includes('commentsDisabled')) {
      throw new AppError('COMMENTS_NOT_AVAILABLE', 'Comments are disabled for this video.', 404);
    }
    if (comments.length === 0) throw e;
  }

  return {
    videoId,
    videoTitle,
    totalFetched: comments.length,
    truncated: Boolean(pageToken),
    comments: comments.slice(0, maxComments),
  };
}

/** Cached wrapper for trending, used by ISR pages. Falls back to empty list on failure. */
export async function getCachedTrending(regionCode: string): Promise<TrendingResult> {
  const { getCachedOrFetch } = await import('@/lib/cache/get-cached');
  const { cacheKeys } = await import('@/lib/cache/cache-keys');
  const { TTL } = await import('@/lib/cache/cache-policies');
  try {
    return await getCachedOrFetch(cacheKeys.trending(regionCode, '0'), TTL.trending, () =>
      getTrendingVideos(regionCode),
    );
  } catch {
    return { region: regionCode, category: '0', videos: [] };
  }
}

/** Most-popular videos for a region/category (1 quota unit). */
export async function getTrendingVideos(
  regionCode: string,
  categoryId = '0',
  maxResults = 40,
): Promise<TrendingResult> {
  const yt = getClient();
  const res = await yt.videos.list({
    chart: 'mostPopular',
    regionCode,
    ...(categoryId !== '0' ? { videoCategoryId: categoryId } : {}),
    maxResults,
    part: ['snippet', 'statistics', 'contentDetails'],
  });
  await trackQuota(1);

  const videos: TrendingVideo[] = (res.data.items ?? []).map((item) => ({
    id: item.id ?? '',
    title: item.snippet?.title ?? 'Unknown',
    channelTitle: item.snippet?.channelTitle ?? '',
    thumbnail: item.snippet?.thumbnails?.medium?.url ?? item.snippet?.thumbnails?.default?.url ?? '',
    publishedAt: item.snippet?.publishedAt ?? '',
    viewCount: parseInt(item.statistics?.viewCount ?? '0', 10),
    likeCount: parseInt(item.statistics?.likeCount ?? '0', 10),
    duration: item.contentDetails?.duration ?? '',
  }));

  return { region: regionCode, category: categoryId, videos };
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
