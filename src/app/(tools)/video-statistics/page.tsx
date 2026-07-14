import type { Metadata } from 'next';
import { VideoStatisticsClient } from './client';
import { ToolPageSchema } from '@/components/tools/tool-page-schema';

export const metadata = {
  title: 'Free YouTube Video Statistics — View Any Video Analytics',
  description: 'View detailed analytics for any YouTube video. Views, likes, comments, publish date, duration, category, and more.',
  keywords: ['youtube video statistics', 'youtube analytics', 'video stats', 'youtube video data'],
  alternates: { canonical: '/video-statistics' },
};

export default async function VideoStatisticsPage({
  searchParams,
}: {
  searchParams: Promise<{ url?: string }>;
}) {
  const params = await searchParams;
  return (
    <ToolPageSchema
      toolName="Video Statistics"
      toolDescription="View detailed analytics for any YouTube video. Views, likes, comments, and more."
      toolSlug="video-statistics"
    >
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          YouTube <span className="text-red-500">Video Statistics</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          View detailed analytics for any YouTube video. Views, likes, comments, thumbnail, channel info and more.
        </p>
      </div>
      <VideoStatisticsClient initialUrl={params.url} />
      <article className="mt-16 prose prose-neutral dark:prose-invert max-w-none">
        <h2>How to View Video Statistics</h2>
        <ol><li><strong>Copy a video URL</strong> — Any public YouTube video.</li><li><strong>Paste it above</strong> — Click Analyze.</li><li><strong>View all stats</strong> — Everything from views to tags in one place.</li></ol>
        <h2>Features</h2>
        <ul><li>📊 View count, likes, comments</li><li>📅 Publish date & duration</li><li>🎬 Category, thumbnail</li><li>🏷️ Tags (if available)</li><li>📺 Channel info</li></ul>
      </article>
    </ToolPageSchema>
  );
}
