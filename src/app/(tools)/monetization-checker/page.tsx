import type { Metadata } from 'next';
import { MonetizationCheckerClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/monetization-checker';
import { toolOgImages } from '@/lib/seo/tool-og';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube Monetization Status Checker | Free Estimate',
  },
  description:
    'Check if a YouTube channel is monetized with a free public-signal estimate and confidence score. Paste a channel URL or @handle—never official YPP confirmation.',
  keywords: [
    'youtube monetization checker',
    'free youtube channel monetization checker',
    'check if a channel is monetized',
    'youtube channel monetization status checker',
    'youtube monetization checker tool',
    'youtube monetization eligibility checker',
    'is youtube channel monetized',
    'youtube partner program checker',
    'youtube monetization status',
    'check if youtube channel is monetized',
  ],
  alternates: { canonical: '/monetization-checker' },
  openGraph: {
    title: 'YouTube Monetization Status Checker | Free Estimate',
    description:
      'Check if a YouTube channel is monetized using public signals and a confidence score. Free estimate for a channel URL or @handle—not official YPP status.',
    type: 'website',
    images: toolOgImages('analytics', 'YouTube Monetization Checker'),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YouTube Monetization Status Checker | Free Estimate',
    description:
      'Estimate YouTube channel monetization from public Data API signals with a confidence score. Estimate only - not official.',
    images: ['/og/tool/analytics'],
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
      title="YouTube Monetization Status Checker"
      description="Estimate YouTube channel monetization from public signals and a 0–100 confidence score—not official YouTube Partner Program status. Paste a channel URL or @handle for a free estimate."
      answerFirst="YouTube (YT) Toolkit's Monetization Checker estimates channel monetization from public signals and a 0-100 confidence score - not official YouTube Partner Program status. Free and no login - paste a channel URL or @handle for a quick estimate."
      seo={<SeoContent />}
      faqs={faqs}
      howToSteps={[
        { name: 'Paste a channel identifier', text: 'Enter a public YouTube channel URL, @handle, or channel ID beginning with UC.' },
        { name: 'Run the public-signal check', text: 'Let the tool inspect available channel and recent-video metadata from public sources.' },
        { name: 'Review status and confidence', text: 'Read the estimated status, confidence score, and each detected or unavailable signal.' },
        { name: 'Treat the result as an estimate', text: 'YouTube keeps official YPP enrollment and Studio revenue private, so verify ownership data in YouTube Studio.' },
      ]}
    >
      <MonetizationCheckerClient initialUrl={params.url} />
    </ToolPageShell>
  );
}
