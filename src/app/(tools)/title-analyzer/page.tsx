import type { Metadata } from 'next';
import { TitleAnalyzerClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/title-analyzer';
import { toolOgImages } from '@/lib/seo/tool-og';

export const metadata: Metadata = {
  title: {
    absolute: 'Free YouTube Title Analyzer & SEO Title Checker | yttools.pro',
  },
  description:
    'Compare two YouTube titles for CTR, SEO, clarity, and emotional pull. Get AI-assisted winner guidance before publishing—no login, not a live A/B test.',
  keywords: [
    'youtube title analyzer',
    'youtube seo title checker',
    'youtube headline analyzer',
    'title comparison tool',
    'youtube title score',
  ],
  alternates: { canonical: '/title-analyzer' },
  openGraph: {
    title: 'Free YouTube Title Analyzer & SEO Title Checker | yttools.pro',
    description:
      'Compare YouTube titles for CTR, SEO, and emotional pull with AI-assisted winner guidance. Free and not a live A/B test.',
    images: toolOgImages('seo', 'Free YouTube Title Analyzer'),
  },
};

export default function TitleAnalyzerPage() {
  return (
    <ToolPageShell
      toolName="Title Analyzer"
      toolDescription="Compare two titles and predict which will get more clicks and rank better."
      toolSlug="title-analyzer"
      title="Free YouTube Title Analyzer & SEO Title Checker"
      description="Compare two YouTube titles to predict CTR—AI guidance, not a live Studio A/B test. Paste Title A, Title B, and an optional keyword for SEO and emotion scores."
      answerFirst="YouTube (YT) Toolkit's Title Analyzer compares two YouTube titles with AI CTR guidance, SEO, and emotion scores - not a live Studio A/B test. Free with no login - paste Title A, Title B, and an optional keyword."
      seo={<SeoContent />}
      faqs={faqs}
      howToSteps={[
        { name: 'Paste two title options', text: 'Enter honest alternatives for the same video in Title A and Title B.' },
        { name: 'Add a target keyword', text: 'Optionally add the phrase your video should be understood for.' },
        { name: 'Compare the guidance', text: 'Review CTR-oriented, SEO, emotion, power-word, and winner-analysis signals.' },
        { name: 'Check the full package', text: 'Confirm the winning title matches the thumbnail and the video promise before publishing.' },
      ]}
    >
      <TitleAnalyzerClient />
    </ToolPageShell>
  );
}
