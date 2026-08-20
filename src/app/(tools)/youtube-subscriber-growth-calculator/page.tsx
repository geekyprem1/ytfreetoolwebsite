import type { Metadata } from 'next';
import { YoutubeSubscriberGrowthCalculatorClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/youtube-subscriber-growth-calculator';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube Subscriber Growth Calculator (Free) | yttools.pro',
  },
  description:
    'Free YouTube Subscriber Growth Calculator — track growth rate, daily gains and projections to 100K. Plan channel growth.',
  keywords: ['youtube subscriber growth calculator', 'subscriber growth rate', 'youtube growth calculator', 'youtube subscriber calculator', 'subscriber projection'],
  alternates: { canonical: '/youtube-subscriber-growth-calculator' },
  openGraph: {
    title: 'YouTube Subscriber Growth Calculator (Free) | yttools.pro',
    description: 'Free Subscriber Growth Calculator — growth %, per day, per month and 1-year projection.',
  },
};

export default function YoutubeSubscriberGrowthCalculatorPage() {
  return (
    <ToolPageShell
      toolName="YouTube Subscriber Growth Calculator"
      toolDescription="Track subscriber growth rate, daily gain and projections."
      toolSlug="youtube-subscriber-growth-calculator"
      title="YouTube Subscriber Growth Calculator"
      description="Track YouTube subscriber growth — rate, daily and monthly gain, plus linear projection to 100K. Free, instant, no login."
      answerFirst="YouTube (YT) Toolkit's Subscriber Growth Calculator measures Growth Rate as Gain ÷ Start ×100, plus per-day and 1-year linear projection. Free, instant — enter start, current subs and days."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <YoutubeSubscriberGrowthCalculatorClient />
    </ToolPageShell>
  );
}
