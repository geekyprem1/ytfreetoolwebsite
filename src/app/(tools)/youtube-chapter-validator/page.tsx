import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/youtube-chapter-validator';
import { YouTubeChapterValidatorClient } from './client';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube Chapter Timestamp Validator | Fix Chapters Not Showing',
  },
  description:
    'Validate YouTube chapter timestamps before publishing. Check 00:00, three chapters, ascending order, 10-second spacing, titles, video length, and copy a cleaned block.',
  keywords: [
    'youtube chapters not showing checker',
    'youtube chapter timestamp validator',
    'fix youtube chapters not working',
    'check youtube timestamp format',
  ],
  alternates: { canonical: '/youtube-chapter-validator' },
  openGraph: {
    title: 'YouTube Chapter Timestamp Validator | yttools.pro',
    description: 'Find chapter formatting problems and copy a cleaned YouTube-ready timestamp block.',
  },
};

export default function YouTubeChapterValidatorPage() {
  return (
    <ToolPageShell
      toolName="YouTube Chapter Timestamp Validator"
      toolDescription="Check chapter timestamps, titles, order, spacing, and video length before pasting into YouTube."
      toolSlug="youtube-chapter-validator"
      title="YouTube Chapter Timestamp Validator"
      description="Find why YouTube chapters are not showing and copy a corrected timestamp block."
      answerFirst="YouTube chapters need a first timestamp at 00:00, at least three timestamps in ascending order, and chapter sections of at least 10 seconds. Paste or upload your timestamp list to check every rule locally."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <YouTubeChapterValidatorClient />
    </ToolPageShell>
  );
}
