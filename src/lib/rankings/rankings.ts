/**
 * Data layer for /youtube-rankings.
 *
 * One "pool" fetch refreshes live stats for every tracked channel
 * (~288 channels → 6 API calls → 6 quota units). The pool is cached in Redis
 * for TTL.rankingsPool and every ranking list is derived from it, so the hub,
 * the Top 100 page and all filter pages share a single fetch.
 */

import { rankingChannels } from '@/content/rankings/channels';
import type { RankingCategory } from '@/content/rankings/types';
import { getRedis } from '@/lib/cache/redis';
import { cacheKeys } from '@/lib/cache/cache-keys';
import { TTL } from '@/lib/cache/cache-policies';
import { getChannelsBatch } from '@/lib/youtube/client';
import {
  recordDailySnapshot,
  loadGrowthHistory,
  computeGrowth,
  type GrowthRow,
} from '@/lib/rankings/snapshots';

export interface RankedChannel {
  id: string;
  title: string;
  /** Handle without the leading @ (may be empty). */
  handle: string;
  thumbnail: string;
  subscribers: number;
  views: number;
  videos: number;
  country: string;
  category: RankingCategory;
}

export interface RankingPool {
  /** ISO timestamp of when the stats were fetched from YouTube. */
  fetchedAt: string;
  channels: RankedChannel[];
}

const EMPTY_POOL: RankingPool = { fetchedAt: '', channels: [] };

/** Per-process dedupe so a build that renders 15 ranking pages makes one fetch. */
let memo: { at: number; pool: Promise<RankingPool> } | null = null;
const MEMO_MS = 5 * 60 * 1000;

async function fetchPoolFromYouTube(): Promise<RankingPool> {
  const seedById = new Map(rankingChannels.map((c) => [c.id, c]));
  const stats = await getChannelsBatch(rankingChannels.map((c) => c.id));

  const channels: RankedChannel[] = [];
  for (const s of stats) {
    const seed = seedById.get(s.id);
    // Hidden counts cannot be ranked honestly — leave them out.
    if (!seed || s.hiddenSubscriberCount || s.subscriberCount <= 0) continue;
    channels.push({
      id: s.id,
      title: s.title,
      handle: (s.customUrl || seed.handle).replace(/^@/, ''),
      thumbnail: s.thumbnail,
      subscribers: s.subscriberCount,
      views: s.viewCount,
      videos: s.videoCount,
      country: seed.country,
      category: seed.category,
    });
  }

  channels.sort((a, b) => b.subscribers - a.subscribers || b.views - a.views);
  return { fetchedAt: new Date().toISOString(), channels };
}

async function loadPool(): Promise<RankingPool> {
  const redis = getRedis();

  if (redis) {
    try {
      const cached = await redis.get<RankingPool>(cacheKeys.rankingsPool());
      if (cached?.channels?.length) return cached;
    } catch {
      // fall through to a live fetch
    }
  }

  try {
    const pool = await fetchPoolFromYouTube();
    if (pool.channels.length === 0) throw new Error('Empty ranking pool');
    if (redis) {
      try {
        await redis.set(cacheKeys.rankingsPool(), pool, { ex: TTL.rankingsPool });
        await redis.set(cacheKeys.rankingsPoolLastGood(), pool, { ex: TTL.rankingsLastGood });
      } catch {
        // cache write failures are non-fatal
      }
    }
    return pool;
  } catch (err) {
    console.error('[rankings] pool fetch failed', err);
    if (redis) {
      try {
        const lastGood = await redis.get<RankingPool>(cacheKeys.rankingsPoolLastGood());
        if (lastGood?.channels?.length) return lastGood;
      } catch {
        // ignore
      }
    }
    return EMPTY_POOL;
  }
}

/**
 * Current stats for every tracked channel, sorted by subscribers.
 * Also makes sure today's growth snapshot exists (cheap no-op after the first call of the day).
 */
export async function getRankingPool(): Promise<RankingPool> {
  const now = Date.now();
  if (!memo || now - memo.at > MEMO_MS) {
    memo = { at: now, pool: loadPool() };
  }
  const pool = await memo.pool;
  if (pool.channels.length === 0) memo = null; // retry on the next call
  else await recordDailySnapshot(pool.channels);
  return pool;
}

export interface MostSubscribedOptions {
  country?: string;
  category?: RankingCategory;
  limit?: number;
}

export function selectMostSubscribed(
  pool: RankingPool,
  { country, category, limit = 100 }: MostSubscribedOptions = {},
): RankedChannel[] {
  return pool.channels
    .filter((c) => (!country || c.country === country) && (!category || c.category === category))
    .slice(0, limit);
}

export interface FastestGrowingResult {
  pool: RankingPool;
  /** Null until at least one full day of snapshots exists. */
  baseline: { date: string; days: number } | null;
  /** Oldest snapshot date we hold (for "collecting since" copy). */
  since: string | null;
  rows: GrowthRow<RankedChannel>[];
}

export async function getFastestGrowing(limit = 100): Promise<FastestGrowingResult> {
  const pool = await getRankingPool();
  const { baseline, since } = await loadGrowthHistory();
  if (!baseline || pool.channels.length === 0) {
    return { pool, baseline: null, since, rows: [] };
  }
  return {
    pool,
    baseline: { date: baseline.date, days: baseline.days },
    since,
    rows: computeGrowth(pool.channels, baseline.subscribers, limit),
  };
}
