import type { Metadata } from 'next';
import { ChannelStatisticsClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/channel-statistics';

export const metadata: Metadata = {
  title: 'YouTube Channel Statistics — Free Analyzer',
  description: 'View detailed channel stats — subscribers, total views, video count, join date, and recent uploads.',
  keywords: ['youtube channel statistics', 'channel analytics', 'youtube channel stats'],
  alternates: { canonical: '/channel-statistics' },
  openGraph: {
    title: 'YouTube Channel Statistics — Free Analyzer',
    description: 'Analyze any public YouTube channel: subscribers, views, video count, and recent uploads.',
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
      description="Analyze any YouTube channel. Subscribers, total views, video count, join date, and recent uploads."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <ChannelStatisticsClient initialUrl={params.url} />
    </ToolPageShell>
  );
}
