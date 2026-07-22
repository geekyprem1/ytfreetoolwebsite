import type { Metadata } from 'next';
import { TitleAnalyzerClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/title-analyzer';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube Title Analyzer (Compare CTR) | yttools.pro',
  },
  description:
    'Free YouTube title analyzer to compare two headlines and predict CTR. Get SEO and emotion scores plus a winner rationale. AI powered, not a live A/B test.',
  keywords: ['youtube title analyzer', 'title comparison', 'title ab test', 'title score'],
  alternates: { canonical: '/title-analyzer' },
  openGraph: {
    title: 'YouTube Title Analyzer (Compare CTR) | yttools.pro',
    description:
      'Free YouTube title analyzer to compare two headlines and predict CTR. Get SEO and emotion scores plus a winner rationale. AI powered, not a live A/B test.',
  },
};

export default function TitleAnalyzerPage() {
  return (
    <ToolPageShell
      toolName="Title Analyzer"
      toolDescription="Compare two titles and predict which will get more clicks and rank better."
      toolSlug="title-analyzer"
      title="YouTube Title Analyzer"
      description="Compare two YouTube titles to predict CTR—AI guidance, not a live Studio A/B test. Paste Title A, Title B, and an optional keyword for SEO and emotion scores."
      answerFirst="YouTube (YT) Toolkit's Title Analyzer compares two YouTube titles with AI CTR guidance, SEO, and emotion scores - not a live Studio A/B test. Free with no login - paste Title A, Title B, and an optional keyword."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <TitleAnalyzerClient />
    </ToolPageShell>
  );
}
