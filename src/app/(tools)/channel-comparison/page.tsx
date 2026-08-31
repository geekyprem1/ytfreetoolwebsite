import type { Metadata } from 'next';
import { ChannelComparisonClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/channel-comparison';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube Channel Comparison Tool (Free) | yttools.pro',
  },
  description:
    'Compare up to three YouTube channels side by side: subscribers, total views, video count, average views per video, and channel age. Free, no login.',
  keywords: [
    'youtube channel comparison',
    'compare youtube channels',
    'youtube channel vs channel',
    'compare subscribers',
  ],
  alternates: { canonical: '/channel-comparison' },
  openGraph: {
    title: 'YouTube Channel Comparison Tool (Free) | yttools.pro',
    description:
      'Compare up to three YouTube channels side by side — subscribers, views, videos, and more. Free, no login.',
  },
};

export default function ChannelComparisonPage() {
  return (
    <ToolPageShell
      toolName="Channel Comparison"
      toolDescription="Compare up to three YouTube channels side by side."
      toolSlug="channel-comparison"
      title="YouTube Channel Comparison"
      description="Compare two or three YouTube channels side by side. See subscribers, total views, video count, average views per video, and channel age together to benchmark growth and spot who is really outperforming."
      answerFirst="Paste two or three YouTube channels and this free tool lines up their public stats side by side: subscribers, total views, video count, average views per video, and channel age. No login — useful for competitive research and benchmarking."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <ChannelComparisonClient />
    </ToolPageShell>
  );
}
