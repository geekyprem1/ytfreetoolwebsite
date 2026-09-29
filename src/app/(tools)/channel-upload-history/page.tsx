import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { ChannelUploadHistoryClient } from './client';

export const metadata: Metadata = {
  title: { absolute: 'YouTube Channel Upload History | yttools.pro' },
  description: 'Browse up to 100 public YouTube channel uploads in pages of 25, using the channel uploads playlist.',
  alternates: { canonical: '/channel-upload-history' },
};

export default function ChannelUploadHistoryPage() {
  return (
    <ToolPageShell
      toolName="Channel Upload History"
      toolDescription="Browse recent public uploads from a channel."
      toolSlug="channel-upload-history"
      title="YouTube Channel Upload History"
      description="Enter a channel ID or @handle to browse recent public uploads. Load more pages when needed."
      answerFirst="This tool reads the channel's uploads playlist in pages of 25, up to 100 entries per session. It is a bounded public list, not a complete archive of deleted, private or unlisted videos."
      faqs={[{ q: 'Does it show every video ever uploaded?', a: 'No. It shows up to 100 accessible entries from the channel uploads playlist, 25 per page.' }, { q: 'Can it find deleted or private uploads?', a: 'No. YouTube does not provide private or deleted video access through this public tool.' }]}
    >
      <ChannelUploadHistoryClient />
    </ToolPageShell>
  );
}
