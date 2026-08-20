import type { Metadata } from 'next';
import { YoutubeEngagementCalculatorClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/youtube-engagement-calculator';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube Engagement Rate Calculator (Free) | yttools.pro',
  },
  description:
    'Free YouTube Engagement Rate Calculator — measure engagement from likes, comments, shares and views. See how your video compares.',
  keywords: ['youtube engagement rate calculator', 'engagement rate youtube', 'youtube engagement calculator', 'like rate youtube', 'youtube engagement rate'],
  alternates: { canonical: '/youtube-engagement-calculator' },
  openGraph: {
    title: 'YouTube Engagement Rate Calculator (Free) | yttools.pro',
    description: 'Free Engagement Calculator — (Likes+Comments+Shares) ÷ Views ×100. Instant.',
  },
};

export default function YoutubeEngagementCalculatorPage() {
  return (
    <ToolPageShell
      toolName="YouTube Engagement Rate Calculator"
      toolDescription="Measure engagement rate from likes, comments and views."
      toolSlug="youtube-engagement-calculator"
      title="YouTube Engagement Rate Calculator"
      description="Measure YouTube engagement rate from likes, comments, shares and views — benchmark against 1-5% averages. Free, no login, instant result."
      answerFirst="YouTube (YT) Toolkit's Engagement Calculator computes (Likes+Comments+Shares) ÷ Views ×100, rated Low to Excellent vs 1-5% benchmarks. Free, instant — paste counts to audit engagement."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <YoutubeEngagementCalculatorClient />
    </ToolPageShell>
  );
}
