import type { Metadata } from 'next';
import { VideoStatisticsClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/video-statistics';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube Video Statistics Analyzer (Free) | yttools.pro',
  },
  description:
    'Free public YouTube video statistics with exact publication time, description, tags, and JSON export. Missing counters are labeled. Not private Studio analytics.',
  keywords: ['youtube video statistics', 'youtube analytics', 'video stats', 'youtube video data', 'youtube video metadata json', 'video metadata exporter'],
  alternates: { canonical: '/video-statistics' },
  openGraph: {
    title: 'YouTube Video Statistics Analyzer (Free) | yttools.pro',
    description:
      'Free public YouTube video statistics with exact publication time, description, tags, and JSON export. Missing counters are labeled. Not private Studio analytics.',
  },
};

export default async function VideoStatisticsPage({
  searchParams,
}: {
  searchParams: Promise<{ url?: string }>;
}) {
  const params = await searchParams;
  return (
    <ToolPageShell
      toolName="Video Statistics"
      toolDescription="View detailed analytics for any YouTube video. Views, likes, comments, and more."
      toolSlug="video-statistics"
      title="YouTube Video Statistics"
      description="Look up public YouTube video statistics, identifiers, description, tags, and exact publication time, then export the returned metadata as JSON. Missing counters are labeled instead of being shown as zero; private Studio analytics are not included."
      answerFirst="Paste a public YouTube video URL to see its public counters and available metadata, including video/channel IDs, description, tags, category ID, and exact public publication timestamp. Export the same response fields as JSON; private Studio analytics remain unavailable."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <VideoStatisticsClient initialUrl={params.url} />
    </ToolPageShell>
  );
}
