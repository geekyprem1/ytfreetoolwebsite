import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { TrendingView } from './trending-view';
import { SeoContent, faqs } from '@/content/tool-seo/youtube-trending';
import { getCachedTrending } from '@/lib/youtube/client';

/** Refresh trending a few times a day. */
export const revalidate = 10800;

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube Trending Videos by Country (Free) | yttools.pro',
  },
  description:
    'See today’s trending YouTube videos by country. Browse the most popular videos in the US, UK, India, and 25+ more regions. Updated daily, free, no login.',
  keywords: [
    'youtube trending',
    'trending videos by country',
    'youtube most popular videos',
    'what is trending on youtube',
  ],
  alternates: { canonical: '/youtube-trending' },
  openGraph: {
    title: 'YouTube Trending Videos by Country (Free) | yttools.pro',
    description:
      'Today’s trending YouTube videos across 30 countries. Updated daily, free, no login.',
  },
};

export default async function TrendingPage() {
  const data = await getCachedTrending('US');
  return (
    <ToolPageShell
      toolName="Trending Videos"
      toolDescription="See today’s trending YouTube videos by country."
      toolSlug="youtube-trending"
      title="YouTube Trending Videos by Country"
      description="Browse today’s most popular YouTube videos by country. Switch between the US, UK, India, and dozens of other regions to see what is trending right now, updated throughout the day."
      answerFirst="This free tool lists the current trending (most popular) YouTube videos for a chosen country, updated a few times daily. Pick from 30 regions including the US, UK, and India. No login."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <TrendingView regionSlug="united-states" regionName="United States" videos={data.videos} />
    </ToolPageShell>
  );
}
