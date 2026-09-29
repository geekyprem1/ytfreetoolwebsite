import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { LiveLikeCountClient } from './client';

export const metadata: Metadata = {
  title: { absolute: 'YouTube Live Like Count | yttools.pro' },
  description: 'Follow the public like count for a YouTube video with refreshes about once a minute. Shows when likes are unavailable.',
  alternates: { canonical: '/live-like-count' },
};

export default async function LiveLikeCountPage({ searchParams }: { searchParams: Promise<{ v?: string }> }) {
  const params = await searchParams;
  return (
    <ToolPageShell
      toolName="Live Like Count"
      toolDescription="Follow public likes on a YouTube video."
      toolSlug="live-like-count"
      title="YouTube Live Like Count"
      description="Paste a video URL or ID to watch its public like count. The display checks for a newer snapshot about once a minute."
      answerFirst="This counter refreshes about every 60 seconds using YouTube's public video statistics. YouTube may update its number in batches, and unavailable likes are shown as unavailable."
      faqs={[{ q: 'Is this a per-second live count?', a: 'No. The tool checks for updates about every 60 seconds and the data may be cached for up to 60 seconds.' }, { q: 'What if likes are unavailable?', a: 'The tool shows Unavailable instead of treating a missing public count as zero.' }]}
    >
      <LiveLikeCountClient initialVideo={params.v} />
    </ToolPageShell>
  );
}
