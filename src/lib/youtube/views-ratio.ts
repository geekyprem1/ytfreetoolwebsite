/** Views / subscribers / videos ratios (pure; safe on server and client). */

export interface RatioInput {
  views: number;
  subscribers: number;
  videos: number;
}

export interface Ratios {
  /** Lifetime views ÷ subscribers. */
  viewsPerSubscriber: number | null;
  /** Lifetime views ÷ public videos. */
  viewsPerVideo: number | null;
  /** Subscribers ÷ public videos. */
  subscribersPerVideo: number | null;
  /** Average views per video as a % of subscribers — "how much of the audience watches". */
  avgViewsPctOfSubs: number | null;
}

const safeDiv = (a: number, b: number): number | null =>
  Number.isFinite(a) && Number.isFinite(b) && b > 0 ? a / b : null;

export function computeRatios({ views, subscribers, videos }: RatioInput): Ratios {
  const viewsPerVideo = safeDiv(views, videos);
  const share = viewsPerVideo === null ? null : safeDiv(viewsPerVideo, subscribers);
  return {
    viewsPerSubscriber: safeDiv(views, subscribers),
    viewsPerVideo,
    subscribersPerVideo: safeDiv(subscribers, videos),
    avgViewsPctOfSubs: share === null ? null : share * 100,
  };
}

export function median(values: number[]): number | null {
  const v = values.filter((n) => Number.isFinite(n)).sort((a, b) => a - b);
  if (v.length === 0) return null;
  const mid = Math.floor(v.length / 2);
  return v.length % 2 ? v[mid]! : (v[mid - 1]! + v[mid]!) / 2;
}

/** Real-data reference points computed from a set of channels (e.g. the Top 100 we track). */
export interface RatioBenchmark {
  sampleSize: number;
  medianViewsPerSubscriber: number;
  medianAvgViewsPctOfSubs: number;
  /** ISO timestamp of the underlying data. */
  asOf: string;
}

export function buildBenchmark(channels: RatioInput[], asOf: string): RatioBenchmark | null {
  const rs = channels.map(computeRatios);
  const vps = median(rs.map((r) => r.viewsPerSubscriber).filter((n): n is number => n !== null));
  const pct = median(rs.map((r) => r.avgViewsPctOfSubs).filter((n): n is number => n !== null));
  if (vps === null || pct === null) return null;
  return { sampleSize: channels.length, medianViewsPerSubscriber: vps, medianAvgViewsPctOfSubs: pct, asOf };
}

/** Human-friendly ratio: 312.4 → "312", 4.25 → "4.3", 0.034 → "0.03". */
export function formatRatio(n: number | null): string {
  if (n === null) return '—';
  if (n >= 100) return Math.round(n).toLocaleString('en-US');
  if (n >= 1) return n.toFixed(1);
  return n.toFixed(2);
}
