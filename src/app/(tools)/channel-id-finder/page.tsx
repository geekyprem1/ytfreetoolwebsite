import type { Metadata } from 'next';
import { ChannelIdFinderClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/channel-id-finder';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube Channel ID Finder (Free) | yttools.pro',
  },
  description:
    'Find any YouTube channel ID (UC…) from a channel URL, @handle, or custom URL. Free, instant, no login. Copy the channel ID for the API, RSS feeds, and embeds.',
  keywords: [
    'youtube channel id finder',
    'find youtube channel id',
    'get channel id from url',
    'youtube channel id from handle',
  ],
  alternates: { canonical: '/channel-id-finder' },
  openGraph: {
    title: 'YouTube Channel ID Finder (Free) | yttools.pro',
    description:
      'Find any YouTube channel ID (UC…) from a URL, @handle, or custom URL. Free, instant, no login.',
  },
};

export default async function ChannelIdFinderPage({
  searchParams,
}: {
  searchParams: Promise<{ url?: string }>;
}) {
  const params = await searchParams;
  return (
    <ToolPageShell
      toolName="Channel ID Finder"
      toolDescription="Find any YouTube channel ID (UC…) from a URL, @handle, or custom URL."
      toolSlug="channel-id-finder"
      title="YouTube Channel ID Finder"
      description="Convert any YouTube channel URL, @handle, or custom URL into its underlying channel ID (the UC… string). Paste a link and copy the ID for API calls, RSS feeds, and embeds."
      answerFirst="Paste a YouTube channel URL, @handle, or custom URL and this free tool returns the channel's UC… ID instantly. No login. Use the ID for the YouTube Data API, RSS feeds (feeds/videos.xml?channel_id=…), and embeds."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <ChannelIdFinderClient initialUrl={params.url} />
    </ToolPageShell>
  );
}
