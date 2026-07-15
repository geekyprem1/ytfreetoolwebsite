import type { Metadata } from 'next';
import { TitleAnalyzerClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/title-analyzer';

export const metadata: Metadata = {
  title: 'Free YouTube Title Analyzer — Compare & Predict Title Performance',
  description:
    'Compare two YouTube titles and predict which will get more clicks. AI-powered CTR prediction and SEO analysis.',
  keywords: ['youtube title analyzer', 'title comparison', 'title ab test', 'title score'],
  alternates: { canonical: '/title-analyzer' },
  openGraph: {
    title: 'Free YouTube Title Analyzer — Compare & Predict Title Performance',
    description:
      'Compare two YouTube titles and predict which will get more clicks. AI-powered CTR prediction and SEO analysis.',
  },
};

export default function TitleAnalyzerPage() {
  return (
    <ToolPageShell
      toolName="Title Analyzer"
      toolDescription="Compare two titles and predict which will get more clicks and rank better."
      toolSlug="title-analyzer"
      title="YouTube Title Analyzer"
      description="Compare two video titles and predict which one will perform better. AI-powered CTR prediction, SEO score, and emotion analysis."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <TitleAnalyzerClient />
    </ToolPageShell>
  );
}
