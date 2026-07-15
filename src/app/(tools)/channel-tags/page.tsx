import type { Metadata } from 'next';
import { ChannelTagsClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/channel-tags';

export const metadata: Metadata = {
  title: 'YouTube Channel Tags Extractor — Find Channel Keywords',
  description: 'Discover channel keywords by analyzing recent video tags. Inferred from the 10 most recent uploads.',
  keywords: ['youtube channel tags', 'channel keywords', 'channel tag extractor'],
  alternates: { canonical: '/channel-tags' },
  openGraph: {
    title: 'YouTube Channel Tags Extractor — Find Channel Keywords',
    description: 'Infer a channel’s keyword themes from tags on its most recent public uploads.',
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
      description="Discover what keywords a YouTube channel targets. Tags are inferred from recent video tags."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <ChannelTagsClient initialUrl={params.url} />
    </ToolPageShell>
  );
}
