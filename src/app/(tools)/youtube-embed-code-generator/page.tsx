import type { Metadata } from 'next';
import { EmbedCodeGeneratorClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/youtube-embed-code-generator';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube Embed Code Generator (Free) | yttools.pro',
  },
  description:
    'Generate responsive YouTube embed code with start/end time, autoplay, mute, loop, and privacy (nocookie) options. Live preview and copy-paste iframe. Free, no login.',
  keywords: [
    'youtube embed code generator',
    'responsive youtube embed',
    'youtube nocookie embed',
    'youtube iframe generator',
  ],
  alternates: { canonical: '/youtube-embed-code-generator' },
  openGraph: {
    title: 'YouTube Embed Code Generator (Free) | yttools.pro',
    description:
      'Generate responsive YouTube embed code with start/end time, autoplay, privacy mode, and more. Live preview and copy-paste iframe. Free, no login.',
  },
};

export default async function EmbedCodeGeneratorPage({
  searchParams,
}: {
  searchParams: Promise<{ url?: string }>;
}) {
  const params = await searchParams;
  return (
    <ToolPageShell
      toolName="Embed Code Generator"
      toolDescription="Generate responsive YouTube embed code with privacy and playback options."
      toolSlug="youtube-embed-code-generator"
      title="YouTube Embed Code Generator"
      description="Build clean, responsive YouTube embed code. Toggle start and end time, autoplay, mute, loop, controls, and privacy-enhanced (nocookie) mode, then copy the iframe with a live preview."
      answerFirst="Paste a YouTube URL and this free tool generates a copy-paste iframe embed. Options include responsive sizing, start/end time, autoplay, mute, loop, hidden controls, and privacy-enhanced youtube-nocookie mode. Live preview included, no login."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <EmbedCodeGeneratorClient initialUrl={params.url} />
    </ToolPageShell>
  );
}
