import type { Metadata } from 'next';
import { TranscriptExtractorClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/transcript-extractor';

export const metadata: Metadata = {
  title: 'Free YouTube Transcript Extractor — Get Video Transcript Instantly',
  description:
    'Get the full transcript of any YouTube video with timestamps. Copy, download as TXT, or AI summarize. No login required.',
  keywords: [
    'youtube transcript extractor',
    'youtube transcript download',
    'video transcript',
    'youtube caption extractor',
  ],
  alternates: { canonical: '/transcript-extractor' },
  openGraph: {
    title: 'Free YouTube Transcript Extractor — Get Video Transcript Instantly',
    description:
      'Get the full transcript of any YouTube video with timestamps. Copy, download as TXT, or AI summarize.',
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
      title="Free YouTube Transcript Extractor"
      description="Extract the complete transcript of any YouTube video. Get timestamped text, copy it, or download as TXT."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <TranscriptExtractorClient initialUrl={params.url} />
    </ToolPageShell>
  );
}
