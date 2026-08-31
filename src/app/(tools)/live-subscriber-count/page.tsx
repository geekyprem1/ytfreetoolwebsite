import type { Metadata } from 'next';
import { LiveSubscriberCountClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/live-subscriber-count';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube Live Subscriber Count (Real-Time) | yttools.pro',
  },
  description:
    'Track any YouTube channel’s subscriber count in real time. Paste a URL or @handle to watch the number update live. Free, no login. Estimated public count.',
  keywords: [
    'live subscriber count',
    'realtime youtube subscriber count',
    'youtube subscriber counter',
    'live sub count',
  ],
  alternates: { canonical: '/live-subscriber-count' },
  openGraph: {
    title: 'YouTube Live Subscriber Count (Real-Time) | yttools.pro',
    description:
      'Track any YouTube channel’s subscriber count in real time. Free, no login.',
  },
};

export default async function LiveSubscriberCountPage({
  searchParams,
}: {
  searchParams: Promise<{ c?: string; url?: string }>;
}) {
  const params = await searchParams;
  const initial = params.c || params.url;
  return (
    <ToolPageShell
      toolName="Live Subscriber Count"
      toolDescription="Track any YouTube channel’s subscriber count in real time."
      toolSlug="live-subscriber-count"
      title="YouTube Live Subscriber Count"
      description="Watch any YouTube channel’s subscriber count update in real time. Paste a channel URL or @handle and the number refreshes automatically, with a smooth live animation between updates."
      answerFirst="Paste a YouTube channel URL or @handle and this free tool shows its subscriber count updating live, refreshing about every 60 seconds. The figure is the public (estimated) count — YouTube rounds subscriber numbers above 1,000. No login."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <LiveSubscriberCountClient initialChannel={initial} />
    </ToolPageShell>
  );
}
