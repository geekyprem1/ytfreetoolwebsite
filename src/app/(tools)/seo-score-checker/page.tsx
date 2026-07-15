import type { Metadata } from 'next';
import { SeoScoreCheckerClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/seo-score-checker';

export const metadata: Metadata = {
  title: 'Free YouTube SEO Score Checker — Optimize Your Videos',
  description:
    'Check your YouTube video SEO score out of 100. Get detailed breakdown and actionable tips. No login required.',
  keywords: ['youtube seo score', 'seo checker', 'video seo analysis', 'seo score calculator'],
  alternates: { canonical: '/seo-score-checker' },
  openGraph: {
    title: 'Free YouTube SEO Score Checker — Optimize Your Videos',
    description:
      'Check your YouTube video SEO score out of 100. Get detailed breakdown and actionable tips. No login required.',
  },
};

export default function SeoScoreCheckerPage() {
  return (
    <ToolPageShell
      toolName="SEO Score Checker"
      toolDescription="Grade your video SEO with a detailed score breakdown and improvement tips."
      toolSlug="seo-score-checker"
      title="YouTube SEO Score Checker"
      description="Grade your video SEO with a detailed score breakdown. Get actionable tips to rank higher on YouTube."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <SeoScoreCheckerClient />
    </ToolPageShell>
  );
}
