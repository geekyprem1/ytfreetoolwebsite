import type { Metadata } from 'next';
import { YoutubeShortsEarningsCalculatorClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/youtube-shorts-earnings-calculator';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube Shorts Earnings Calculator (Free) | yttools.pro',
  },
  description:
    'Free YouTube Shorts Earnings Calculator — estimate Shorts revenue from views and Shorts RPM. Understand the Creator Pool.',
  keywords: ['youtube shorts earnings calculator', 'shorts earnings calculator', 'youtube shorts money calculator', 'shorts rpm', 'youtube shorts revenue'],
  alternates: { canonical: '/youtube-shorts-earnings-calculator' },
  openGraph: {
    title: 'YouTube Shorts Earnings Calculator (Free) | yttools.pro',
    description: 'Free Shorts Earnings Calculator — estimate from views at 0.01-0.08 RPM. Instant, no login.',
  },
};

export default function YoutubeShortsEarningsCalculatorPage() {
  return (
    <ToolPageShell
      toolName="YouTube Shorts Earnings Calculator"
      toolDescription="Estimate Shorts revenue from views with Shorts RPM range."
      toolSlug="youtube-shorts-earnings-calculator"
      title="YouTube Shorts Earnings Calculator"
      description="Estimate YouTube Shorts earnings from views and Shorts RPM (typically $0.01–$0.08). See per-million payout and pool range. Free, instant."
      answerFirst="YouTube (YT) Toolkit's Shorts Earnings Calculator estimates (Views ÷ 1000) × Shorts RPM, with a $0.01–$0.05 range for Creator Pool variance. Free, instant — Shorts pay ~50-100× less than long-form per mille."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <YoutubeShortsEarningsCalculatorClient />
    </ToolPageShell>
  );
}
