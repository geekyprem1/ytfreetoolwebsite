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
    'Free YouTube transcript extractor and caption downloader. Extract public video subtitles with timestamps, then copy or download a TXT file—no login.',
  keywords: [
    'free youtube transcript extractor',
    'youtube transcript extractor',
    'youtube transcript downloader',
    'youtube transcript extraction tool',
    'youtube caption extractor online',
    'youtube transcript extractor free',
    'youtube caption extractor',
  ],
  alternates: { canonical: '/transcript-extractor' },
  openGraph: {
    title: 'Free YouTube Transcript Extractor | Download Subtitles',
    description:
      'Extract public YouTube transcripts and captions with timestamps. Copy or download subtitles as TXT for research, chapters, and repurposing—no login.',
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
      toolDescription="Get the full transcript of any YouTube video with timestamps. Copy, download as TXT, or AI summarize."
      toolSlug="transcript-extractor"
      title="Free YouTube Transcript Extractor & Subtitle Downloader"
      description="Extract YouTube Video Transcript & Subtitles with timestamps from any captioned video, then copy or download a text file - caption text for creators, not academic transcripts."
      answerFirst="YouTube (YT) Toolkit's Transcript Extractor pulls YouTube Video Transcript & Subtitles from any captioned public video and lets you convert them to a timestamped text file. No login or browser extension - export captions for blogs, chapters, and research in seconds."
      seo={<SeoContent />}
      faqs={faqs}
      howToSteps={[
        { name: 'Find a captioned public video', text: 'Use a YouTube video or Shorts URL that has automatic or manual captions available.' },
        { name: 'Paste the video URL', text: 'Submit the watch link above and let the extractor load the available transcript track.' },
        { name: 'Review the timestamped text', text: 'Scan segments for quotes, chapters, keywords, or accuracy issues before exporting.' },
        { name: 'Copy or download the transcript', text: 'Copy the full text or download TXT, then use it for notes, chapters, summaries, or content research.' },
      ]}
    >
      <TranscriptExtractorClient initialUrl={params.url} />
    </ToolPageShell>
  );
}
