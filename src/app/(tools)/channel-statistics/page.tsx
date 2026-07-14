import type { Metadata } from 'next';
import { ChannelStatisticsClient } from './client';
import { ToolPageSchema } from '@/components/tools/tool-page-schema';

export const metadata = {
  title: 'Free YouTube Channel Statistics — Analyze Any Channel',
  description: 'View detailed channel stats — subscribers, total views, video count, join date, and recent uploads.',
  keywords: ['youtube channel statistics', 'channel analytics', 'youtube channel stats'],
  alternates: { canonical: '/channel-statistics' },
};

export default async function ChannelStatisticsPage({
  searchParams,
}: {
  searchParams: Promise<{ url?: string }>;
}) {
  const params = await searchParams;
  return (
    <ToolPageSchema
      toolName="Channel Statistics"
      toolDescription="Analyze any YouTube channel. Subscribers, total views, recent uploads."
      toolSlug="channel-statistics"
    >
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          YouTube <span className="text-red-500">Channel Statistics</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Analyze any YouTube channel. Subscribers, total views, video count, join date, and recent uploads.
        </p>
      </div>
      <ChannelStatisticsClient initialUrl={params.url} />
      <article className="mt-16 prose prose-neutral dark:prose-invert max-w-none">
        <h2>How to View Channel Stats</h2>
        <ol><li><strong>Copy a channel URL</strong> — e.g., youtube.com/@creator.</li><li><strong>Paste it above</strong></li><li><strong>View all stats</strong></li></ol>
        <h2>Features</h2>
        <ul><li>👥 Subscriber count</li><li>📊 Total views & videos</li><li>📅 Join date & country</li><li>🎬 Latest 5 uploads</li></ul>
      </article>
    </ToolPageSchema>
  );
}
