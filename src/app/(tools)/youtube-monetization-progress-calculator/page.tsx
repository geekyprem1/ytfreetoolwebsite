import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/youtube-monetization-progress-calculator';
import { YoutubeMonetizationProgressCalculatorClient } from './client';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube Monetization Progress Calculator 2027 | yttools.pro',
  },
  description:
    'Track YouTube Partner Program progress: subscribers, qualified watch hours, Shorts views, daily pace, and current vs 2027 YPP thresholds.',
  keywords: [
    'youtube monetization progress calculator 2027',
    'youtube 8000 watch hours calculator',
    '20 million shorts views calculator',
    'youtube ypp eligibility calculator',
    'youtube monetization calculator',
  ],
  alternates: { canonical: '/youtube-monetization-progress-calculator' },
  openGraph: {
    title: 'YouTube Monetization Progress Calculator 2027 | yttools.pro',
    description: 'Compare current and 2027 YPP thresholds, calculate what remains, and plan a daily pace.',
  },
};

export default function YoutubeMonetizationProgressCalculatorPage() {
  return (
    <ToolPageShell
      toolName="YouTube Monetization Progress Calculator"
      toolDescription="Track your YPP progress, remaining requirements, daily pace, and estimated route to eligibility."
      toolSlug="youtube-monetization-progress-calculator"
      title="YouTube Monetization Progress Calculator"
      description="Compare your subscribers, qualified watch hours, and Shorts views against current and 2027 YouTube Partner Program thresholds."
      answerFirst="Enter your YouTube Studio numbers to see what remains for each YPP route. This calculator compares today’s 4,000-watch-hour / 10M-Shorts-view thresholds with the 8,000-hour / 20M-view targets for new applicants from 1 February 2027."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <YoutubeMonetizationProgressCalculatorClient />
    </ToolPageShell>
  );
}
