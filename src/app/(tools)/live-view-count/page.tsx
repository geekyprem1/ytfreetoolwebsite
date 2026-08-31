import type { Metadata } from 'next';
import { LiveViewCountClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/live-view-count';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube Live View Count (Real-Time) | yttools.pro',
  },
  description:
    'Track a YouTube video’s view count in real time. Paste a video URL to watch views update live — great for premieres and viral uploads. Free, no login.',
  keywords: [
    'live view count',
    'realtime youtube views',
    'youtube live view counter',
    'youtube view count tracker',
  ],
  alternates: { canonical: '/live-view-count' },
  openGraph: {
    title: 'YouTube Live View Count (Real-Time) | yttools.pro',
    description: 'Track a YouTube video’s view count in real time. Free, no login.',
  },
};

export default async function LiveViewCountPage({
  searchParams,
}: {
  searchParams: Promise<{ v?: string; url?: string }>;
}) {
  const params = await searchParams;
  const initial = params.v || params.url;
  return (
    <ToolPageShell
      toolName="Live View Count"
      toolDescription="Track a YouTube video’s view count in real time."
      toolSlug="live-view-count"
      title="YouTube Live View Count"
      description="Watch any YouTube video’s view count update in real time. Paste a video URL and the number refreshes automatically — ideal for premieres, launches, and videos going viral."
      answerFirst="Paste a YouTube video URL and this free tool shows its view count updating live, refreshing about every 60 seconds with a smooth animation. Also shows live likes and comments. No login."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <LiveViewCountClient initialVideo={initial} />
    </ToolPageShell>
  );
}
