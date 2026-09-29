import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { YoutubeCreatorIncomeCalculatorClient } from './client';
import { faqs, SeoContent } from '@/content/tool-seo/youtube-creator-income-calculator';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube Creator Income Calculator | yttools.pro',
  },
  description:
    'Estimate monthly and yearly YouTube creator income from your Analytics RPM, sponsorship deals and affiliate sales. Compare editable scenarios for free.',
  keywords: [
    'youtube creator income calculator',
    'youtube income calculator with sponsorships',
    'youtube affiliate income calculator',
    'youtube channel revenue calculator',
  ],
  alternates: { canonical: '/youtube-creator-income-calculator' },
  openGraph: {
    title: 'YouTube Creator Income Calculator | yttools.pro',
    description:
      'Estimate monthly and yearly creator revenue from your RPM, sponsorships and affiliate sales with editable scenarios.',
  },
};

export default function YoutubeCreatorIncomeCalculatorPage() {
  return (
    <ToolPageShell
      toolName="YouTube Creator Income Calculator"
      toolDescription="Estimate creator revenue from YouTube RPM, sponsorships and affiliate sales."
      toolSlug="youtube-creator-income-calculator"
      title="YouTube Creator Income Calculator"
      description="Combine your YouTube Analytics RPM with sponsorship and affiliate assumptions to estimate monthly and yearly creator revenue."
      answerFirst="Estimate monthly creator revenue by adding YouTube Analytics RPM-based revenue (monthly views ÷ 1,000 × your RPM), sponsorship fees and affiliate commissions. YouTube RPM can include ads, Premium and fan-funding revenue; the yearly projection repeats your assumptions 12 times and is not a promise of earnings or profit."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <YoutubeCreatorIncomeCalculatorClient />
    </ToolPageShell>
  );
}
