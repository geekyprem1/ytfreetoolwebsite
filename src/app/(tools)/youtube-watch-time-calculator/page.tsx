import type { Metadata } from 'next';
import { YoutubeWatchTimeCalculatorClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/youtube-watch-time-calculator';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube Watch Time Calculator - 4K & 8K YPP Progress | yttools.pro',
  },
  description:
    'Free YouTube Watch Time Calculator — convert views and average view duration into watch hours. Compare current 4,000-hour and 2027 8,000-hour YPP targets.',
  keywords: ['youtube watch time calculator', 'watch hours calculator', 'youtube watch time', '4000 watch hours', '8000 watch hours calculator', 'youtube watch time hours'],
  alternates: { canonical: '/youtube-watch-time-calculator' },
  openGraph: {
    title: 'YouTube Watch Time Calculator - 4K & 8K YPP Progress | yttools.pro',
    description: 'Free Watch Time Calculator — views × AVD = watch hours. Compare current and upcoming YPP progress.',
  },
};

export default function YoutubeWatchTimeCalculatorPage() {
  return (
    <ToolPageShell
      toolName="YouTube Watch Time Calculator"
      toolDescription="Convert views and average view duration into total watch hours."
      toolSlug="youtube-watch-time-calculator"
      title="YouTube Watch Time Calculator"
      description="Convert views and average view duration into total watch hours — compare current 4,000-hour and upcoming 8,000-hour YPP progress. Free, instant, no login."
      answerFirst="YouTube (YT) Toolkit's Watch Time Calculator computes Watch Hours as Views × Average View Duration ÷ 60. It shows progress toward the current 4,000-hour YPP target and the 8,000-hour target for new applicants from 1 February 2027."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <YoutubeWatchTimeCalculatorClient />
    </ToolPageShell>
  );
}
