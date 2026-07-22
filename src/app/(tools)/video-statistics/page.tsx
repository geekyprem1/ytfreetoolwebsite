import type { Metadata } from 'next';
import { VideoStatisticsClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/video-statistics';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube Video Statistics Analyzer (Free) | yttools.pro',
  },
  description:
    'Free YouTube video statistics analyzer for public views, likes, comments, duration, publish date, and more. Paste any video URL. Not private Studio analytics.',
  keywords: ['youtube video statistics', 'youtube analytics', 'video stats', 'youtube video data'],
  alternates: { canonical: '/video-statistics' },
  openGraph: {
    title: 'YouTube Video Statistics Analyzer (Free) | yttools.pro',
    description:
      'Free YouTube video statistics analyzer for public views, likes, comments, duration, publish date, and more. Paste any video URL. Not private Studio analytics.',
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
      description="Look up free public YouTube video statistics—views, likes, comments, duration, and publish date—not private Studio analytics. Paste any public video URL to analyze performance signals in seconds."
      answerFirst="YouTube (YT) Toolkit's Video Statistics tool shows public views, likes, comments, duration, and publish date for any public video URL. Free with no login - research performance signals without Studio access."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <VideoStatisticsClient initialUrl={params.url} />
    </ToolPageShell>
  );
}
