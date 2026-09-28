import type { Metadata } from 'next';
import { TranscriptExtractorClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/transcript-extractor';
import { toolOgImages } from '@/lib/seo/tool-og';

export const metadata: Metadata = {
  title: {
    absolute: 'Free YouTube Transcript Extractor | Download Subtitles',
  },
  description:
    'Free YouTube transcript extractor. Get captions in any available language, with or without timestamps, and download TXT, SRT, VTT or JSON. Word count included—no login.',
  keywords: [
    'free youtube transcript extractor',
    'youtube transcript extractor',
    'youtube transcript downloader',
    'youtube transcript extraction tool',
    'youtube caption extractor online',
    'youtube transcript extractor free',
    'youtube caption extractor',
    'youtube transcript to srt',
    'youtube transcript json',
    'youtube transcript without timestamps',
  ],
  alternates: { canonical: '/transcript-extractor' },
  openGraph: {
    title: 'Free YouTube Transcript Extractor | Download Subtitles',
    description:
      'Extract public YouTube transcripts in any available language. Toggle timestamps and download TXT, SRT, VTT or JSON for research, chapters and repurposing—no login.',
    images: toolOgImages('extractor', 'Free YouTube Transcript Extractor'),
  },
};

export default async function TranscriptExtractorPage({
  searchParams,
}: {
  searchParams: Promise<{ url?: string }>;
}) {
  const params = await searchParams;
  return (
    <ToolPageShell
      toolName="Transcript Extractor"
      toolDescription="Get the full transcript of any YouTube video. Toggle timestamps, pick a language, download TXT, SRT, VTT or JSON, or AI summarize."
      toolSlug="transcript-extractor"
      title="Free YouTube Transcript Extractor & Subtitle Downloader"
      description="Extract YouTube Video Transcript & Subtitles from any captioned video in any available language. Show or hide timestamps, see word count and reading time, then copy or download TXT, SRT, VTT or JSON - caption text for creators, not academic transcripts."
      answerFirst="YouTube (YT) Toolkit's Transcript Extractor pulls the transcript from any captioned public YouTube video, in any caption language the video offers. Toggle timestamps on or off, see word count and reading time, and download TXT, SRT, VTT or JSON. Free, no login or browser extension."
      seo={<SeoContent />}
      faqs={faqs}
      howToSteps={[
        { name: 'Find a captioned public video', text: 'Use a YouTube video or Shorts URL that has automatic or manual captions available.' },
        { name: 'Paste the video URL', text: 'Submit the watch link above and let the extractor load the available transcript track.' },
        { name: 'Review the timestamped text', text: 'Scan segments for quotes, chapters, keywords, or accuracy issues before exporting.' },
        { name: 'Choose language and timestamps', text: 'Pick another caption language if the video has several, and switch timestamps on or off.' },
        { name: 'Copy or download the transcript', text: 'Copy the text or download TXT, SRT, VTT or JSON, then use it for notes, subtitles, chapters, summaries, or research.' },
      ]}
    >
      <TranscriptExtractorClient initialUrl={params.url} />
    </ToolPageShell>
  );
}
