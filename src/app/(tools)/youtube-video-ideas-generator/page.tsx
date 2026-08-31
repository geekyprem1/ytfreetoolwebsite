import type { Metadata } from 'next';
import { VideoIdeasGeneratorClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/youtube-video-ideas-generator';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube Video Ideas Generator — AI (Free) | yttools.pro',
  },
  description:
    'Generate YouTube video ideas with AI. Enter your niche and audience to get titles with search intent and ranking difficulty. Beat creative block. Free, no login.',
  keywords: [
    'youtube video ideas generator',
    'youtube content ideas',
    'video ideas ai',
    'what to make a video about',
  ],
  alternates: { canonical: '/youtube-video-ideas-generator' },
  openGraph: {
    title: 'YouTube Video Ideas Generator — AI (Free) | yttools.pro',
    description:
      'Generate YouTube video ideas with AI — titles, search intent, and difficulty. Free, no login.',
  },
};

export default function VideoIdeasGeneratorPage() {
  return (
    <ToolPageShell
      toolName="Video Ideas Generator"
      toolDescription="Generate YouTube video ideas with AI, complete with titles and intent."
      toolSlug="youtube-video-ideas-generator"
      title="YouTube Video Ideas Generator"
      description="Never run out of things to film. Describe your niche and audience and AI returns specific, searchable video ideas — each with a suggested title, the search intent it serves, and how hard it is to rank."
      answerFirst="Enter your niche and audience and this free AI tool generates specific YouTube video ideas, each with a suggested title, search intent, and ranking difficulty. Beat creative block with filmable angles. No login."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <VideoIdeasGeneratorClient />
    </ToolPageShell>
  );
}
