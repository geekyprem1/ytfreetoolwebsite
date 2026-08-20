import type { Metadata } from 'next';
import { YoutubeLiveEarningsCalculatorClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/youtube-live-earnings-calculator';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube Live Earnings Calculator (Super Chats + Ads) | yttools.pro',
  },
  description:
    'Free YouTube Live Earnings Calculator — estimate Live revenue from ads, Super Chats and memberships. Plan your next stream.',
  keywords: ['youtube live earnings calculator', 'live earnings calculator youtube', 'super chat calculator', 'youtube live revenue', 'youtube live money calculator'],
  alternates: { canonical: '/youtube-live-earnings-calculator' },
  openGraph: {
    title: 'YouTube Live Earnings Calculator (Super Chats + Ads) | yttools.pro',
    description: 'Free Live Earnings Calculator — ads (55%) + Super Chats (70%) + memberships. Instant.',
  },
};

export default function YoutubeLiveEarningsCalculatorPage() {
  return (
    <ToolPageShell
      toolName="YouTube Live Earnings Calculator"
      toolDescription="Estimate Live stream earnings from Super Chats, ads and views."
      toolSlug="youtube-live-earnings-calculator"
      title="YouTube Live Earnings Calculator"
      description="Estimate YouTube Live earnings from ad impressions, Super Chats and new memberships — see creator cuts (55% ads, 70% chats). Free, instant."
      answerFirst="YouTube (YT) Toolkit's Live Earnings Calculator sums Ads (Views÷1000×CPM×55%) + Super Chats×70% + Memberships×70% for total Live revenue. Free, instant — plan streams before you go live."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <YoutubeLiveEarningsCalculatorClient />
    </ToolPageShell>
  );
}
