import type { Metadata } from 'next';
import { ChannelStatisticsClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/channel-statistics';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube Channel Statistics Analyzer | yttools.pro',
  },
  description:
    'Free YouTube channel statistics analyzer: subscribers, total views, video count, join date, recent uploads. Paste a channel URL or @handle. Public data only.',
  keywords: ['youtube channel statistics', 'channel analytics', 'youtube channel stats'],
  alternates: { canonical: '/channel-statistics' },
  openGraph: {
    title: 'YouTube Channel Statistics Analyzer | yttools.pro',
    description:
      'Free YouTube channel statistics analyzer: subscribers, total views, video count, join date, recent uploads. Paste a channel URL or @handle. Public data only.',
  },
};

export default async function ChannelStatisticsPage({
  searchParams,
}: {
  searchParams: Promise<{ url?: string }>;
}) {
  const params = await searchParams;
  return (
    <ToolPageShell
      toolName="Channel Statistics"
      toolDescription="Analyze any YouTube channel. Subscribers, total views, recent uploads."
      toolSlug="channel-statistics"
      title="YouTube Channel Statistics"
      description="Analyze free public YouTube channel statistics—subscribers, lifetime views, video count, join date, and recent uploads—not owner-only Studio data. Paste a channel URL or @handle to research any public creator."
      answerFirst="YouTube (YT) Toolkit's Channel Statistics tool reports public subscribers, lifetime views, upload count, join date, and recent uploads for any channel URL or @handle. Free, no login - research creators without owner-only Studio data."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <ChannelStatisticsClient initialUrl={params.url} />
    </ToolPageShell>
  );
}
