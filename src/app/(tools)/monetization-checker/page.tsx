import type { Metadata } from 'next';
import { MonetizationCheckerClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/monetization-checker';

export const metadata: Metadata = {
  title: 'YouTube Monetization Checker — Free Estimate Tool',
  description:
    'Estimate whether a YouTube channel is monetized using public signals, with a confidence score. Not an official YouTube Partner Program status.',
  keywords: [
    'youtube monetization checker',
    'is youtube channel monetized',
    'youtube partner program checker',
    'youtube monetization status',
    'check if youtube channel is monetized',
  ],
  alternates: { canonical: '/monetization-checker' },
  openGraph: {
    title: 'YouTube Monetization Checker — Free Estimate Tool',
    description:
      'Estimate monetization status for any public YouTube channel with supporting signals and a confidence score. Estimate only — not official YPP status.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YouTube Monetization Checker — Free Estimate Tool',
    description:
      'Estimate whether a YouTube channel is monetized using public Data API signals and a confidence score.',
  },
};

export default async function MonetizationCheckerPage({
  searchParams,
}: {
  searchParams: Promise<{ url?: string }>;
}) {
  const params = await searchParams;
  return (
    <ToolPageShell
      toolName="YouTube Monetization Checker"
      toolDescription="Estimate whether a YouTube channel is monetized using public signals and a confidence score."
      toolSlug="monetization-checker"
      title="YouTube Monetization Checker"
      description="Estimate monetization status for any public channel. Paste a channel URL, @handle, or channel ID — results are estimates, not official YouTube Partner Program status."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <MonetizationCheckerClient initialUrl={params.url} />
    </ToolPageShell>
  );
}
