import type { Metadata } from 'next';
import { MonetizationCheckerClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/monetization-checker';
import { toolOgImages } from '@/lib/seo/tool-og';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube Monetization Checker (Free Estimate) | yttools.pro',
  },
  description:
    'Free YouTube monetization checker: estimate Partner Program status from public signals + confidence score. Paste URL or @handle. Estimate only - not official.',
  keywords: [
    'youtube monetization checker',
    'is youtube channel monetized',
    'youtube partner program checker',
    'youtube monetization status',
    'check if youtube channel is monetized',
  ],
  alternates: { canonical: '/monetization-checker' },
  openGraph: {
    title: 'YouTube Monetization Checker (Free Estimate) | yttools.pro',
    description:
      'Free YouTube monetization checker: estimate Partner Program status from public signals + confidence score. Paste URL or @handle. Estimate only - not official.',
    type: 'website',
    images: toolOgImages('analytics', 'YouTube Monetization Checker'),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YouTube Monetization Checker (Free Estimate) | yttools.pro',
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
      title="YouTube Monetization Checker"
      description="Estimate YouTube channel monetization from public signals and a 0–100 confidence score—not official YouTube Partner Program status. Paste a channel URL or @handle for a free estimate."
      answerFirst="YouTube (YT) Toolkit's Monetization Checker estimates channel monetization from public signals and a 0-100 confidence score - not official YouTube Partner Program status. Free and no login - paste a channel URL or @handle for a quick estimate."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <MonetizationCheckerClient initialUrl={params.url} />
    </ToolPageShell>
  );
}
