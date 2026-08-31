import type { Metadata } from 'next';
import { ChannelNameGeneratorClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/youtube-channel-name-generator';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube Channel Name Generator + Handle Checker (Free) | yttools.pro',
  },
  description:
    'Generate brandable YouTube channel name ideas with AI, each with a suggested @handle you can check for availability. Free, no login.',
  keywords: [
    'youtube channel name generator',
    'youtube name ideas',
    'youtube handle checker',
    'channel name availability',
  ],
  alternates: { canonical: '/youtube-channel-name-generator' },
  openGraph: {
    title: 'YouTube Channel Name Generator + Handle Checker (Free) | yttools.pro',
    description:
      'Generate brandable YouTube channel names with AI and check @handle availability. Free, no login.',
  },
};

export default function ChannelNameGeneratorPage() {
  return (
    <ToolPageShell
      toolName="Channel Name Generator"
      toolDescription="Generate YouTube channel name ideas and check @handle availability."
      toolSlug="youtube-channel-name-generator"
      title="YouTube Channel Name Generator"
      description="Brainstorm brandable YouTube channel names with AI. Describe your niche and style, get name ideas each with a suggested @handle, then check which handles look available before you commit."
      answerFirst="Describe your niche and this free AI tool generates brandable YouTube channel names, each with a suggested @handle. Check a handle to see if it looks available before you claim it. No login."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <ChannelNameGeneratorClient />
    </ToolPageShell>
  );
}
