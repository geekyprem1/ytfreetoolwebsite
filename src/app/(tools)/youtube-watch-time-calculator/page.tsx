import type { Metadata } from 'next';
import { YoutubeWatchTimeCalculatorClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/youtube-watch-time-calculator';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube Watch Time Calculator - Hours from Views & AVD | yttools.pro',
  },
  description:
    'Free YouTube Watch Time Calculator — convert views and average view duration into total watch hours. Track progress to 4,000 hours.',
  keywords: ['youtube watch time calculator', 'watch hours calculator', 'youtube watch time', '4000 watch hours', 'youtube watch time hours'],
  alternates: { canonical: '/youtube-watch-time-calculator' },
  openGraph: {
    title: 'YouTube Watch Time Calculator - Hours from Views & AVD | yttools.pro',
    description: 'Free Watch Time Calculator — views × AVD = watch hours. Instant, no login. Track YPP progress.',
  },
};

export default function YoutubeWatchTimeCalculatorPage() {
  return (
    <ToolPageShell
      toolName="YouTube Watch Time Calculator"
      toolDescription="Convert views and average view duration into total watch hours."
      toolSlug="youtube-watch-time-calculator"
      title="YouTube Watch Time Calculator"
      description="Convert views and average view duration into total watch hours — see progress to YouTube Partner Program 4,000 hours. Free, instant, no login."
      answerFirst="YouTube (YT) Toolkit's Watch Time Calculator computes Watch Hours as Views × Average View Duration ÷ 60, with YPP 4,000-hour progress. Free, instant — enter views and AVD to plan monetization."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <YoutubeWatchTimeCalculatorClient />
    </ToolPageShell>
  );
}
