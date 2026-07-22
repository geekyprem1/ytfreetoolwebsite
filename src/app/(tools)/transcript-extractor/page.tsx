import type { Metadata } from 'next';
import { TranscriptExtractorClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/transcript-extractor';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube Transcript Extractor with Timestamps | yttools.pro',
  },
  description:
    'Extract YouTube Video Transcript & Subtitles with timestamps. Copy or download a text file. Free, no login required.',
  keywords: [
    'YouTube Video Transcript & Subtitles',
    'youtube transcript extractor',
    'youtube transcript download',
    'transcript with timestamps',
    'youtube caption extractor',
  ],
  alternates: { canonical: '/transcript-extractor' },
  openGraph: {
    title: 'YouTube Transcript Extractor with Timestamps | yttools.pro',
    description:
      'Convert YouTube Video Transcript & Subtitles to a timestamped text file. Copy, download TXT, or AI summarize.',
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
      description="Extract YouTube Video Transcript & Subtitles with timestamps from any captioned video, then copy or download a text file — caption text for creators, not academic transcripts."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <TranscriptExtractorClient initialUrl={params.url} />
    </ToolPageShell>
  );
}
