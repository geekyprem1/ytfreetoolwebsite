import type { Metadata } from 'next';
import { TranscriptExtractorClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/transcript-extractor';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube Transcript Extractor - YT Toolkit | Download Subtitles Free',
  },
  description:
    'Extract and download YouTube transcripts & captions in TXT or SRT formats. Free video to text transcript converter with timestamps.',
  keywords: [
    'YouTube Video Transcript & Subtitles',
    'youtube transcript extractor',
    'youtube transcript download',
    'transcript with timestamps',
    'youtube caption extractor',
  ],
  alternates: { canonical: '/transcript-extractor' },
  openGraph: {
    title: 'YouTube Transcript Extractor - YT Toolkit | Download Subtitles Free',
    description:
      'Extract and download YouTube transcripts & captions with timestamps. Free video to text converter - no login required.',
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
      title="YouTube Video Transcript & Subtitles Extractor"
      description="Extract YouTube Video Transcript & Subtitles with timestamps from any captioned video, then copy or download a text file - caption text for creators, not academic transcripts."
      answerFirst="YouTube (YT) Toolkit's Transcript Extractor pulls YouTube Video Transcript & Subtitles from any captioned public video and lets you convert them to a timestamped text file. No login or browser extension - export captions for blogs, chapters, and research in seconds."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <TranscriptExtractorClient initialUrl={params.url} />
    </ToolPageShell>
  );
}
