import type { Metadata } from 'next';
import { VideoStatisticsClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/video-statistics';

export const metadata: Metadata = {
  title: 'YouTube Video Statistics — Free Video Analytics',
  description: 'View detailed analytics for any YouTube video. Views, likes, comments, publish date, duration, category, and more.',
  keywords: ['youtube video statistics', 'youtube analytics', 'video stats', 'youtube video data'],
  alternates: { canonical: '/video-statistics' },
  openGraph: {
    title: 'YouTube Video Statistics — Free Video Analytics',
    description: 'Look up public views, likes, comments, duration, and more for any YouTube video.',
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
      description="View detailed analytics for any YouTube video. Views, likes, comments, thumbnail, channel info and more."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <VideoStatisticsClient initialUrl={params.url} />
    </ToolPageShell>
  );
}
