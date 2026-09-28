/**
 * Country and category filters for /youtube-rankings/most-subscribed/[filter].
 *
 * A filter page is only generated when the tracked pool has at least
 * MIN_FILTER_SIZE channels for it, so we never publish a thin "Top 3" page.
 */

import { rankingChannels } from '@/content/rankings/channels';
import type { RankingCategory } from '@/content/rankings/types';
import { getRegionByCode } from '@/content/trending-regions';

export const MIN_FILTER_SIZE = 10;

export const categoryLabels: Record<RankingCategory, string> = {
  music: 'Music',
  entertainment: 'Entertainment',
  kids: 'Kids',
  gaming: 'Gaming',
  education: 'Education & Science',
  howto: 'How-to & Food',
  comedy: 'Comedy',
  tech: 'Tech',
  sports: 'Sports',
  film: 'Film & TV',
  news: 'News',
};

/** Phrase used in titles after "Top N": "Top 25 Gaming YouTubers". Matches how people search. */
const categoryTitleNoun: Record<RankingCategory, string> = {
  music: 'Music Channels on YouTube',
  entertainment: 'Entertainment Channels on YouTube',
  kids: 'Kids YouTube Channels',
  gaming: 'Gaming YouTubers',
  education: 'Education YouTube Channels',
  howto: 'How-to YouTube Channels',
  comedy: 'Comedy YouTubers',
  tech: 'Tech YouTubers',
  sports: 'Sports Channels on YouTube',
  film: 'Film & TV Channels on YouTube',
  news: 'News Channels on YouTube',
};

export type RankingFilter =
  | { kind: 'country'; slug: string; code: string; name: string; count: number }
  | { kind: 'category'; slug: string; category: RankingCategory; name: string; count: number };

const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

export function countryName(code: string): string {
  try {
    return regionNames.of(code.toUpperCase()) ?? code;
  } catch {
    return code;
  }
}

/** 🇮🇳-style flag from an ISO alpha-2 code (decorative; always pair with the name). */
export function countryFlag(code: string): string {
  if (!/^[A-Za-z]{2}$/.test(code)) return '';
  return String.fromCodePoint(...[...code.toUpperCase()].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65));
}

function countBy<K extends string>(key: (c: (typeof rankingChannels)[number]) => K): Map<K, number> {
  const m = new Map<K, number>();
  for (const c of rankingChannels) m.set(key(c), (m.get(key(c)) ?? 0) + 1);
  return m;
}

function buildFilters(): RankingFilter[] {
  const filters: RankingFilter[] = [];

  const byCountry = [...countBy((c) => c.country)].sort((a, b) => b[1] - a[1]);
  for (const [code, count] of byCountry) {
    if (count < MIN_FILTER_SIZE) continue;
    // Reuse trending-region slugs so country pages cross-link cleanly.
    const region = getRegionByCode(code);
    if (!region) continue;
    filters.push({ kind: 'country', slug: region.slug, code, name: region.name, count });
  }

  const byCategory = [...countBy((c) => c.category)].sort((a, b) => b[1] - a[1]);
  for (const [category, count] of byCategory) {
    if (count < MIN_FILTER_SIZE) continue;
    filters.push({ kind: 'category', slug: category, category, name: categoryLabels[category], count });
  }

  return filters;
}

export const rankingFilters: RankingFilter[] = buildFilters();

export function getRankingFilter(slug: string): RankingFilter | undefined {
  return rankingFilters.find((f) => f.slug === slug);
}

/** Size of the list shown on a filter page ("Top 50", "Top 25", ...). */
export function filterListSize(f: RankingFilter): number {
  for (const size of [50, 25, 20, 10]) if (f.count >= size) return size;
  return f.count;
}

export function filterQuestion(f: RankingFilter): string {
  return f.kind === 'country'
    ? `Who is the most subscribed YouTuber in ${f.name}?`
    : `Which ${f.name.toLowerCase()} channel has the most subscribers on YouTube?`;
}

export function filterPath(f: RankingFilter): string {
  return `/youtube-rankings/most-subscribed/${f.slug}`;
}

export function filterHeading(f: RankingFilter, size: number): string {
  return f.kind === 'country'
    ? `Top ${size} YouTubers in ${f.name}`
    : `Top ${size} ${categoryTitleNoun[f.category]}`;
}
