import type { Metadata } from 'next';
import { TimestampGeneratorClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/timestamp-generator';

export const metadata: Metadata = {
  title: 'YouTube Timestamp Generator — AI Video Chapters',
  description: 'Auto-generate video chapters from transcripts with AI. Create clickable timestamps for better navigation.',
  keywords: ['youtube timestamp generator', 'video chapters', 'chapter generator', 'timestamps'],
  alternates: { canonical: '/timestamp-generator' },
  openGraph: {
    title: 'YouTube Timestamp Generator — AI Video Chapters',
    description: 'Generate YouTube chapters from a transcript in MM:SS / HH:MM:SS format starting at 0:00.',
  },
};

export default function TimestampGeneratorPage() {
  return (
    <ToolPageShell
      toolName="Timestamp Generator"
      toolDescription="Auto-generate video chapters from transcripts with AI."
      toolSlug="timestamp-generator"
      title="AI Timestamp Generator"
      description="Generate video chapters from transcripts. Perfect for longer videos to improve viewer navigation."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <TimestampGeneratorClient />
    </ToolPageShell>
  );
}
