import type { Metadata } from 'next';
import { ChannelTagsClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/channel-tags';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube Channel Tags Extractor (Free) | yttools.pro',
  },
  description:
    'Free YouTube channel tags extractor that infers keyword themes from recent video tags (about 10 uploads). Paste a channel URL. Research only - not HTML tags.',
  keywords: ['youtube channel tags', 'channel keywords', 'channel tag extractor'],
  alternates: { canonical: '/channel-tags' },
  openGraph: {
    title: 'YouTube Channel Tags Extractor (Free) | yttools.pro',
    description:
      'Free YouTube channel tags extractor that infers keyword themes from recent video tags (about 10 uploads). Paste a channel URL. Research only - not HTML tags.',
  },
};

export default async function ChannelTagsPage({
  searchParams,
}: {
  searchParams: Promise<{ url?: string }>;
}) {
  const params = await searchParams;
  return (
    <ToolPageShell
      toolName="Channel Tags Extractor"
      toolDescription="Discover channel keywords by analyzing recent video tags."
      toolSlug="channel-tags"
      title="YouTube Channel Tags Extractor"
      description="Extract inferred YouTube channel tags from recent video metadata—keyword themes for research, not HTML or RFID tags. Paste a channel URL to aggregate tags across about 10 recent public uploads."
      answerFirst="YouTube (YT) Toolkit's Channel Tags tool infers keyword themes from about 10 recent public uploads on a channel. Free, no login - paste a channel URL to aggregate research tags from recent video metadata."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <ChannelTagsClient initialUrl={params.url} />
    </ToolPageShell>
  );
}
