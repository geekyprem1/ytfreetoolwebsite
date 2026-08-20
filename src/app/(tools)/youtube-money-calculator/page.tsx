import type { Metadata } from 'next';
import { YoutubeMoneyCalculatorClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/youtube-money-calculator';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube Money Calculator (Free) - Estimate Earnings | yttools.pro',
  },
  description:
    'Free YouTube Money Calculator — estimate earnings from views, CPM and monetized play rate. Instant, no login. Plan revenue before you publish.',
  keywords: [
    'youtube money calculator',
    'youtube earnings calculator',
    'youtube revenue calculator',
    'how much does youtube pay',
    'youtube money per view',
  ],
  alternates: { canonical: '/youtube-money-calculator' },
  openGraph: {
    title: 'YouTube Money Calculator (Free) - Estimate Earnings | yttools.pro',
    description:
      'Free YouTube Money Calculator — estimate earnings from views, CPM and monetized play rate. Instant, no login.',
  },
};

export default function YoutubeMoneyCalculatorPage() {
  return (
    <ToolPageShell
      toolName="YouTube Money Calculator"
      toolDescription="Estimate YouTube earnings from views, CPM and monetized play rate. Free, instant."
      toolSlug="youtube-money-calculator"
      title="YouTube Money Calculator"
      description="Estimate YouTube earnings from any view count — enter views, CPM and monetized play rate for an instant revenue estimate. Free, no login — plan before you publish."
      answerFirst="YouTube (YT) Toolkit's Money Calculator estimates earnings as (Views × Monetized Rate ÷ 1000) × CPM, with a ±30% range for season and niche variance. Free, instant and no login — adjust CPM and monetized rate to plan revenue."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <YoutubeMoneyCalculatorClient />
    </ToolPageShell>
  );
}
