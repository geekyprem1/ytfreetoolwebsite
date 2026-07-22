import type { Metadata } from 'next';
import { TimestampGeneratorClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/timestamp-generator';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube Timestamp & Chapter Generator | yttools.pro',
  },
  description:
    'Free YouTube timestamp and chapter generator from transcripts. Get MM:SS chapters starting at 0:00, ready to paste into the description. AI powered, no login.',
  keywords: ['youtube timestamp generator', 'video chapters', 'chapter generator', 'timestamps'],
  alternates: { canonical: '/timestamp-generator' },
  openGraph: {
    title: 'YouTube Timestamp & Chapter Generator | yttools.pro',
    description:
      'Free YouTube timestamp and chapter generator from transcripts. Get MM:SS chapters starting at 0:00, ready to paste into the description. AI powered, no login.',
  },
};

export default function TimestampGeneratorPage() {
  return (
    <ToolPageShell
      toolName="Timestamp Generator"
      toolDescription="Auto-generate video chapters from transcripts with AI."
      toolSlug="timestamp-generator"
      title="AI Timestamp Generator"
      description="Generate free YouTube timestamps and chapters from a transcript in MM:SS format starting at 0:00—not generic podcast markers. Paste caption text to get clickable chapter lines for the description."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <TimestampGeneratorClient />
    </ToolPageShell>
  );
}
