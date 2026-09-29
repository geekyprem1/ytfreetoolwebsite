import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { UrlInspectorClient } from './client';

export const metadata: Metadata = {
  title: { absolute: 'YouTube URL Inspector & ID Extractor | yttools.pro' },
  description: 'Inspect a YouTube video, channel or playlist link. Extract its identifier and copy a clean URL locally, without an API call.',
  alternates: { canonical: '/youtube-url-inspector' },
};

export default function UrlInspectorPage() {
  return (
    <ToolPageShell
      toolName="YouTube URL Inspector"
      toolDescription="Extract identifiers and clean links from YouTube URLs."
      toolSlug="youtube-url-inspector"
      title="YouTube URL Inspector"
      description="Paste a YouTube video, channel or playlist link to see what it contains and copy a clean link. Parsing happens in your browser."
      answerFirst="The inspector recognizes watch, Shorts, live, embed, channel and playlist links. It extracts an ID or handle and removes tracking parameters. A parsed link is not proof that its video or channel still exists."
      faqs={[{ q: 'Does a channel handle count as a channel ID?', a: 'No. An @handle, a legacy custom name and a UC… channel ID are different identifiers. This tool labels each separately.' }, { q: 'Does the inspector contact YouTube?', a: 'No. It parses the text locally and does not verify that a resource exists or is public.' }]}
    >
      <UrlInspectorClient />
    </ToolPageShell>
  );
}
