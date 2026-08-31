import type { Metadata } from 'next';
import { VideoSummarizerClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/youtube-video-summarizer';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube Video Summarizer — AI TL;DR (Free) | yttools.pro',
  },
  description:
    'Summarize any YouTube video with AI. Paste a URL to get a TL;DR and key takeaways from the transcript in seconds. Free, no login. Great for long talks and tutorials.',
  keywords: [
    'youtube video summarizer',
    'summarize youtube video ai',
    'youtube tldr',
    'ai youtube summary',
  ],
  alternates: { canonical: '/youtube-video-summarizer' },
  openGraph: {
    title: 'YouTube Video Summarizer — AI TL;DR (Free) | yttools.pro',
    description:
      'Summarize any YouTube video with AI. Paste a URL for a TL;DR and key takeaways. Free, no login.',
  },
};

export default async function VideoSummarizerPage({
  searchParams,
}: {
  searchParams: Promise<{ url?: string }>;
}) {
  const params = await searchParams;
  return (
    <ToolPageShell
      toolName="Video Summarizer"
      toolDescription="Summarize any YouTube video with AI from its transcript."
      toolSlug="youtube-video-summarizer"
      title="YouTube Video Summarizer"
      description="Get the gist of any YouTube video without watching it all. Paste a URL and AI reads the transcript to produce a TL;DR and key takeaways — ideal for long tutorials, talks, podcasts, and lectures."
      answerFirst="Paste a YouTube URL and this free tool pulls the transcript, then uses AI to produce a TL;DR and bullet-point key takeaways in seconds. Works best on videos that have captions. No login."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <VideoSummarizerClient initialUrl={params.url} />
    </ToolPageShell>
  );
}
