import { NextRequest } from 'next/server';
import {
  getChannelDetails,
  getRecentVideosMonetizationProbe,
  getVideoDetails,
} from '@/lib/youtube/client';
import { estimateMonetization } from '@/lib/youtube/monetization';
import { collectPageMonetizationSignals } from '@/lib/youtube/page-signals';
import { normalizeChannelInput, parseYouTubeUrl } from '@/lib/youtube/url-parser';
import { getCachedOrFetch } from '@/lib/cache/get-cached';
import { cacheKeys } from '@/lib/cache/cache-keys';
import { TTL } from '@/lib/cache/cache-policies';
import { getRedis } from '@/lib/cache/redis';
import { formatNumber, formatRelativeDate } from '@/lib/utils/format';
import { apiSuccessResponse, apiErrorResponse, handleApiError, AppError } from '@/lib/errors';

async function resolveChannelInput(raw: string): Promise<string> {
  const trimmed = raw.trim();
  const normalized = normalizeChannelInput(trimmed);
  if (normalized) return normalized;

  const parsed = parseYouTubeUrl(trimmed);
  if (parsed?.type === 'channel') return parsed.id;
  if (parsed?.type === 'video') {
    const video = await getVideoDetails(parsed.id);
    if (!video.channelId) {
      throw new AppError('CHANNEL_NOT_FOUND', 'Could not resolve channel from this video URL.', 404);
    }
    return video.channelId;
  }

  return trimmed.replace(/^@/, '');
}

async function fetchMonetizationCheck(input: string) {
  const channel = await getChannelDetails(input);
  const recentVideos = await getRecentVideosMonetizationProbe(
    channel.id,
    10,
    channel.uploadsPlaylistId,
  );

  // YTLarge-style: scrape public channel + recent watch pages for ads / Join
  const pageSignals = await collectPageMonetizationSignals(
    channel.id,
    channel.customUrl || undefined,
    recentVideos.map((v) => v.videoId),
    5,
  );

  const estimate = estimateMonetization(channel, recentVideos, pageSignals);

  const latestUpload = recentVideos[0]
    ? {
        videoId: recentVideos[0].videoId,
        title: recentVideos[0].title,
        thumbnail: recentVideos[0].thumbnail,
        publishedAt: recentVideos[0].publishedAt,
        publishedLabel: formatRelativeDate(recentVideos[0].publishedAt),
        viewCount: formatNumber(recentVideos[0].viewCount),
      }
    : null;

  const videoAdBreakdown = pageSignals.videos.map((v) => {
    const meta = recentVideos.find((r) => r.videoId === v.videoId);
    return {
      videoId: v.videoId,
      title: meta?.title ?? v.videoId,
      thumbnail: meta?.thumbnail ?? '',
      checked: v.checked,
      ads: v.hasAdPlacements === true || v.ytAdFlag === true,
      ytAd: v.ytAdFlag,
      preroll: v.preroll,
      midroll: v.midroll,
      postroll: v.postroll,
      superThanks: v.superThanks,
    };
  });

  return {
    channel: {
      id: channel.id,
      title: channel.title,
      thumbnail: channel.thumbnail,
      customUrl: channel.customUrl,
      country: channel.country || null,
      publishedAt: channel.publishedAt || null,
      publishedLabel: channel.publishedAt
        ? new Date(channel.publishedAt).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        : null,
      subscriberCount: formatNumber(channel.subscriberCount),
      subscriberCountRaw: channel.subscriberCount,
      videoCount: formatNumber(channel.videoCount),
      videoCountRaw: channel.videoCount,
      viewCount: formatNumber(channel.viewCount),
      viewCountRaw: channel.viewCount,
      madeForKids: channel.madeForKids,
    },
    latestUpload,
    recentVideos: recentVideos.map((v) => ({
      videoId: v.videoId,
      title: v.title,
      thumbnail: v.thumbnail,
      publishedAt: v.publishedAt,
      viewCount: formatNumber(v.viewCount),
    })),
    videoAdBreakdown,
    estimate: {
      prediction: estimate.prediction,
      monetizationLabel: estimate.monetizationLabel,
      adStatus: estimate.adStatus,
      status: estimate.status,
      confidence: estimate.confidence,
      probability: estimate.probability,
      summary: estimate.summary,
      signals: estimate.signals,
      memberships:
        pageSignals.channel.hasMemberships === true
          ? 'ON'
          : pageSignals.channel.hasMemberships === false
            ? 'OFF'
            : 'Unknown',
    },
    disclaimer:
      'Estimated Monetization ON/OFF using public page signals (ad placements, Join button, Super Thanks) — same approach as tools like YTLarge. Not official YouTube Partner Program status. YouTube can show ads on some non-YPP videos.',
  };
}

async function warmChannelCache(
  channelId: string,
  data: Awaited<ReturnType<typeof fetchMonetizationCheck>>,
) {
  const redis = getRedis();
  if (!redis) return;
  try {
    await redis.set(cacheKeys.monetizationCheck(channelId), JSON.parse(JSON.stringify(data)), {
      ex: TTL.monetizationCheck,
    });
  } catch {
    // best-effort
  }
}

export async function GET(request: NextRequest) {
  try {
    const raw = request.nextUrl.searchParams.get('c');
    if (!raw?.trim()) {
      return apiErrorResponse({
        code: 'MISSING_PARAM',
        message: 'Provide a channel URL, @handle, video URL, or channel ID',
        status: 400,
      } as never);
    }

    const resolved = await resolveChannelInput(raw);
    const isChannelId = resolved.startsWith('UC') && resolved.length >= 24;

    if (isChannelId) {
      const result = await getCachedOrFetch(
        cacheKeys.monetizationCheck(resolved),
        TTL.monetizationCheck,
        () => fetchMonetizationCheck(resolved),
      );
      return apiSuccessResponse(result);
    }

    const result = await fetchMonetizationCheck(resolved);
    await warmChannelCache(result.channel.id, result);
    return apiSuccessResponse(result);
  } catch (err) {
    return apiErrorResponse(handleApiError(err));
  }
}
