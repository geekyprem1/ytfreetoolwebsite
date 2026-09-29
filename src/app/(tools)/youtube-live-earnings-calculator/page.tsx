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
    description: 'Free Live Earnings Calculator — ads (55%) + gross Super Chats (70%) + an assumed $3.50 per new member. Instant.',
  },
};

export default function YoutubeLiveEarningsCalculatorPage() {
  return (
    <ToolPageShell
      toolName="YouTube Live Earnings Calculator"
      toolDescription="Estimate Live stream earnings from ads, gross Super Chats and new memberships."
      toolSlug="youtube-live-earnings-calculator"
      title="YouTube Live Earnings Calculator"
      description="Estimate YouTube Live earnings from monetized playbacks, gross Super Chats and new memberships — see each revenue component. Free, instant."
      answerFirst="YouTube (YT) Toolkit's Live Earnings Calculator estimates creator revenue as monetized playbacks ÷ 1,000 × CPM × 55%, plus 70% of gross Super Chats and an assumed $3.50 per new member. Enter your own figures to plan a Live stream."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <YoutubeLiveEarningsCalculatorClient />
    </ToolPageShell>
  );
}
