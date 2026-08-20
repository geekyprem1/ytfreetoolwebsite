import type { Metadata } from 'next';
import { YoutubeAverageViewDurationCalculatorClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/youtube-average-view-duration-calculator';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube Average View Duration Calculator (AVD) | yttools.pro',
  },
  description:
    'Free YouTube Average View Duration Calculator — calculate AVD from watch hours and views. See retention % vs video length.',
  keywords: ['youtube average view duration calculator', 'avd calculator youtube', 'average view duration youtube', 'youtube retention calculator', 'youtube avd'],
  alternates: { canonical: '/youtube-average-view-duration-calculator' },
  openGraph: {
    title: 'YouTube Average View Duration Calculator (AVD) | yttools.pro',
    description: 'Free AVD Calculator — AVD = Watch Minutes ÷ Views, plus retention %. Instant.',
  },
};

export default function YoutubeAverageViewDurationCalculatorPage() {
  return (
    <ToolPageShell
      toolName="YouTube Average View Duration Calculator"
      toolDescription="Calculate average view duration from watch time and views."
      toolSlug="youtube-average-view-duration-calculator"
      title="YouTube Average View Duration Calculator"
      description="Calculate YouTube average view duration (AVD) from watch hours and views — plus retention % vs video length. Free, instant, no login."
      answerFirst="YouTube (YT) Toolkit's Average View Duration Calculator computes AVD as Watch Minutes ÷ Views, with retention vs video length rated Low to Excellent. Free, instant — 40-60% retention is strong for 8-12 minute videos."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <YoutubeAverageViewDurationCalculatorClient />
    </ToolPageShell>
  );
}
