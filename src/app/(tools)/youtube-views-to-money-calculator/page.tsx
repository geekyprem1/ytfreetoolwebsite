import type { Metadata } from 'next';
import { YoutubeViewsToMoneyCalculatorClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/youtube-views-to-money-calculator';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube Views to Money Calculator - Convert Views to Earnings | yttools.pro',
  },
  description:
    'Free YouTube Views to Money Calculator — convert any view count to estimated earnings at your RPM. See how many views for $100, $1000.',
  keywords: ['youtube views to money calculator', 'views to money youtube', 'youtube views to earnings', 'how much money per view youtube', 'youtube views calculator money'],
  alternates: { canonical: '/youtube-views-to-money-calculator' },
  openGraph: {
    title: 'YouTube Views to Money Calculator - Convert Views to Earnings | yttools.pro',
    description: 'Free Views to Money Calculator — (Views ÷1000) × RPM = earnings. Instant.',
  },
};

export default function YoutubeViewsToMoneyCalculatorPage() {
  return (
    <ToolPageShell
      toolName="YouTube Views to Money Calculator"
      toolDescription="Convert any view count to estimated earnings at your RPM."
      toolSlug="youtube-views-to-money-calculator"
      title="YouTube Views to Money Calculator"
      description="Convert any YouTube view count to estimated earnings at your RPM — see per-1K, per-100K and views needed for $100/$1,000. Free, instant."
      answerFirst="YouTube (YT) Toolkit's Views to Money Calculator converts views as (Views ÷ 1000) × RPM into dollars, plus views needed for $100 and $1,000. Free, instant — enter views and your Analytics RPM."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <YoutubeViewsToMoneyCalculatorClient />
    </ToolPageShell>
  );
}
