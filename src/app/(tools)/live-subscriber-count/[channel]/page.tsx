import type { Metadata } from 'next';
import { LiveSubscriberCountClient } from '../client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/live-subscriber-count';

interface PageProps {
  params: Promise<{ channel: string }>;
}

/** Human label for a raw channel segment (@handle, UC…, or custom name). */
function channelLabel(raw: string): string {
  const decoded = decodeURIComponent(raw);
  return decoded.startsWith('@') ? decoded : `@${decoded.replace(/^@/, '')}`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { channel } = await params;
  const label = channelLabel(channel);
  const title = `${label} Live Subscriber Count (Real-Time) | yttools.pro`;
  const description = `Track ${label}'s YouTube subscriber count in real time. Watch the number update live, no login required. Estimated public count.`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/live-subscriber-count/${channel}` },
    openGraph: { title, description },
  };
}

export default async function LiveSubscriberChannelPage({ params }: PageProps) {
  const { channel } = await params;
  const decoded = decodeURIComponent(channel);
  const label = channelLabel(channel);

  return (
    <ToolPageShell
      toolName="Live Subscriber Count"
      toolDescription="Track any YouTube channel’s subscriber count in real time."
      toolSlug="live-subscriber-count"
      title={`${label} — Live Subscriber Count`}
      description={`Live subscriber count for ${label}, updating in real time. The number refreshes automatically with a smooth animation between updates.`}
      answerFirst={`This page tracks ${label}'s YouTube subscriber count live, refreshing about every 60 seconds. The figure is the public estimated count — YouTube rounds subscriber numbers above 1,000.`}
      seo={<SeoContent />}
      faqs={faqs}
    >
      <LiveSubscriberCountClient initialChannel={decoded} />
    </ToolPageShell>
  );
}
