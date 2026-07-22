import type { Metadata } from 'next';
import { SeoScoreCheckerClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/seo-score-checker';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube SEO Score Checker (Free Grade) | yttools.pro',
  },
  description:
    'Free YouTube SEO score checker that grades title, description, tags, and hashtags out of 100. Get a packaging breakdown and fixes before you upload. No login.',
  keywords: ['youtube seo score', 'seo checker', 'video seo analysis', 'seo score calculator'],
  alternates: { canonical: '/seo-score-checker' },
  openGraph: {
    title: 'YouTube SEO Score Checker (Free Grade) | yttools.pro',
    description:
      'Free YouTube SEO score checker that grades title, description, tags, and hashtags out of 100. Get a packaging breakdown and fixes before you upload. No login.',
  },
};

export default function SeoScoreCheckerPage() {
  return (
    <ToolPageShell
      toolName="SEO Score Checker"
      toolDescription="Grade your video SEO with a detailed score breakdown and improvement tips."
      toolSlug="seo-score-checker"
      title="YouTube SEO Score Checker"
      description="Grade your YouTube video SEO score out of 100 across title, description, tags, and hashtags—not a website SEO audit. Paste draft metadata for a packaging grade and fixes before upload."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <SeoScoreCheckerClient />
    </ToolPageShell>
  );
}
