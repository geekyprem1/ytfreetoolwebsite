import type { Metadata } from 'next';
import { ViewsRatioCalculatorClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/youtube-views-ratio-calculator';
import { getRankingPool, selectMostSubscribed } from '@/lib/rankings/rankings';
import { buildBenchmark } from '@/lib/youtube/views-ratio';

/** Benchmarks come from the live rankings pool — refresh with it (6 hours). */
export const revalidate = 21600;

const title = 'YouTube Views to Subscribers Ratio Calculator (Free) | yttools.pro';
const description =
  'Calculate views per subscriber, average views per video and how much of a channel’s audience each video reaches. Paste a channel URL or enter numbers, and compare with the Top 100 channels. Free.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    'youtube views to subscribers ratio',
    'views per subscriber calculator',
    'youtube views ratio calculator',
    'average views per video calculator',
    'youtube subscriber to view ratio',
  ],
  alternates: { canonical: '/youtube-views-ratio-calculator' },
  openGraph: { title, description },
};

export default async function ViewsRatioCalculatorPage() {
  const pool = await getRankingPool();
  const top = selectMostSubscribed(pool, { limit: 100 });
  const benchmark =
    top.length >= 20
      ? buildBenchmark(
          top.map((c) => ({ views: c.views, subscribers: c.subscribers, videos: c.videos })),
          pool.fetchedAt,
        )
      : null;

  return (
    <ToolPageShell
      toolName="Views-to-Subscribers Ratio Calculator"
      toolDescription="Calculate views per subscriber, average views per video and audience reach for any channel."
      toolSlug="youtube-views-ratio-calculator"
      title="YouTube Views to Subscribers Ratio Calculator"
      description="Paste a channel link to pull its public views, subscribers and videos automatically — or type the numbers yourself — and see views per subscriber, average views per video, and what share of subscribers a typical video reaches."
      answerFirst="YouTube (YT) Toolkit's Views-to-Subscribers Ratio Calculator divides a channel's lifetime views by its subscribers and videos to show views per subscriber, average views per video, and average video reach as a percentage of subscribers. Paste a channel URL for automatic numbers; free, no login."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <ViewsRatioCalculatorClient benchmark={benchmark} />
    </ToolPageShell>
  );
}
