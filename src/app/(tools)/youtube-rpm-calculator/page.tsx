import type { Metadata } from 'next';
import { YoutubeRpmCalculatorClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/youtube-rpm-calculator';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube RPM Calculator - Revenue Per Mille (Free) | yttools.pro',
  },
  description:
    'Free YouTube RPM Calculator — calculate RPM from revenue and views. Understand what you earn per 1,000 views. No login required.',
  keywords: ['youtube rpm calculator', 'rpm youtube', 'revenue per mille', 'youtube rpm meaning', 'calculate rpm youtube'],
  alternates: { canonical: '/youtube-rpm-calculator' },
  openGraph: {
    title: 'YouTube RPM Calculator - Revenue Per Mille (Free) | yttools.pro',
    description: 'Free YouTube RPM Calculator — calculate RPM from revenue and views. Instant, no login.',
  },
};

export default function YoutubeRpmCalculatorPage() {
  return (
    <ToolPageShell
      toolName="YouTube RPM Calculator"
      toolDescription="Calculate RPM (revenue per mille) from total revenue and views."
      toolSlug="youtube-rpm-calculator"
      title="YouTube RPM Calculator"
      description="Calculate RPM (revenue per 1,000 views) from total revenue and views — the creator-side metric after YouTube's cut. Free, instant, no login."
      answerFirst="YouTube (YT) Toolkit's RPM Calculator computes RPM as (Revenue ÷ Views) × 1000 — what you actually keep per mille. Free, instant — enter Analytics revenue and views for your true RPM."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <YoutubeRpmCalculatorClient />
    </ToolPageShell>
  );
}
