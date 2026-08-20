import type { Metadata } from 'next';
import { YoutubeCpmCalculatorClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/youtube-cpm-calculator';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube CPM Calculator - Cost Per Mille (Free) | yttools.pro',
  },
  description:
    'Free YouTube CPM Calculator — calculate CPM from ad revenue and monetized views. See what advertisers pay per 1,000 views.',
  keywords: ['youtube cpm calculator', 'cpm youtube', 'cost per mille youtube', 'youtube cpm meaning', 'calculate cpm'],
  alternates: { canonical: '/youtube-cpm-calculator' },
  openGraph: {
    title: 'YouTube CPM Calculator - Cost Per Mille (Free) | yttools.pro',
    description: 'Free YouTube CPM Calculator — calculate CPM from ad revenue and monetized views. Instant.',
  },
};

export default function YoutubeCpmCalculatorPage() {
  return (
    <ToolPageShell
      toolName="YouTube CPM Calculator"
      toolDescription="Calculate CPM from ad revenue and monetized views instantly."
      toolSlug="youtube-cpm-calculator"
      title="YouTube CPM Calculator"
      description="Calculate CPM (advertiser cost per 1,000 monetized views) from gross ad revenue and monetized playbacks. Free, no login — compare niches and seasons."
      answerFirst="YouTube (YT) Toolkit's CPM Calculator computes CPM as (Ad Revenue ÷ Monetized Views) × 1000 — what advertisers pay before YouTube's 45% cut. Free, instant — creators keep ~55% as RPM."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <YoutubeCpmCalculatorClient />
    </ToolPageShell>
  );
}
