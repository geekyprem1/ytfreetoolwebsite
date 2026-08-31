import type { Metadata } from 'next';
import { TimestampLinkGeneratorClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/youtube-timestamp-link-generator';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube Timestamp Link Generator (Free) | yttools.pro',
  },
  description:
    'Create a YouTube link that starts at a specific time. Paste a video URL, set hours/minutes/seconds, and copy a shareable ?t= link. Bulk mode for chapter lists. Free, no login.',
  keywords: [
    'youtube timestamp link',
    'youtube link at specific time',
    'start youtube video at time',
    'youtube timestamp generator',
  ],
  alternates: { canonical: '/youtube-timestamp-link-generator' },
  openGraph: {
    title: 'YouTube Timestamp Link Generator (Free) | yttools.pro',
    description:
      'Create a YouTube link that starts at a specific time. Copy a shareable ?t= link or generate a full chapter list. Free, no login.',
  },
};

export default async function TimestampLinkGeneratorPage({
  searchParams,
}: {
  searchParams: Promise<{ url?: string }>;
}) {
  const params = await searchParams;
  return (
    <ToolPageShell
      toolName="Timestamp Link Generator"
      toolDescription="Create a YouTube link that starts playing at a specific time."
      toolSlug="youtube-timestamp-link-generator"
      title="YouTube Timestamp Link Generator"
      description="Turn any YouTube video into a link that starts at an exact moment. Set the time, copy the link, or paste a chapter list to generate a set of jump links at once."
      answerFirst="Paste a YouTube URL, set hours, minutes, and seconds, and this free tool builds a shareable link that starts playback at that exact time using the ?t= parameter. Bulk mode turns a chapter list into multiple jump links. No login."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <TimestampLinkGeneratorClient initialUrl={params.url} />
    </ToolPageShell>
  );
}
