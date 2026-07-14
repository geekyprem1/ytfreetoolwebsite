import type { Metadata } from 'next';
import { ChannelTagsClient } from './client';
import { ToolPageSchema } from '@/components/tools/tool-page-schema';

export const metadata = {
  title: 'Free YouTube Channel Tags Extractor — Find Channel Keywords',
  description: 'Discover channel keywords by analyzing recent video tags. Inferred from the 10 most recent uploads.',
  keywords: ['youtube channel tags', 'channel keywords', 'channel tag extractor'],
  alternates: { canonical: '/channel-tags' },
};

export default async function ChannelTagsPage({
  searchParams,
}: {
  searchParams: Promise<{ url?: string }>;
}) {
  const params = await searchParams;
  return (
    <ToolPageSchema
      toolName="Channel Tags Extractor"
      toolDescription="Discover channel keywords by analyzing recent video tags."
      toolSlug="channel-tags"
    >
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          YouTube <span className="text-red-500">Channel Tags Extractor</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Discover what keywords a YouTube channel targets. Tags are inferred from recent video tags.
        </p>
      </div>
      <ChannelTagsClient initialUrl={params.url} />
      <article className="mt-16 prose prose-neutral dark:prose-invert max-w-none">
        <h2>How It Works</h2>
        <ol><li><strong>Paste a channel URL</strong> — Any YouTube channel.</li><li><strong>Analyze</strong> — We look at the 10 most recent videos.</li><li><strong>View tags</strong> — Aggregated unique tags across all analyzed videos.</li></ol>
        <p>YouTube doesn't expose channel-level tags. This tool aggregates tags from recent uploads to give you an idea of the channel's content strategy.</p>
        <h2>Features</h2>
        <ul><li>🏷️ Inferred channel tags</li><li>📊 Video count analyzed</li><li>📋 Copy & download</li></ul>
      </article>
    </ToolPageSchema>
  );
}
