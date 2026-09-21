import type { Metadata } from 'next';
import { KeywordGeneratorClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/keyword-generator';
import { toolOgImages } from '@/lib/seo/tool-og';

export const metadata: Metadata = {
  title: {
    absolute: 'Free YouTube Keyword Tool & Generator | yttools.pro',
  },
  description:
    'Find keyword ideas for YouTube videos, Shorts, and channels. Get related phrases, search intent, and relative difficulty—free, no login.',
  keywords: [
    'free youtube keyword tool',
    'free keyword tool for youtube',
    'free youtube keyword research tool',
    'keyword tool for youtube',
    'youtube keyword generator',
    'keyword generator for youtube',
    'youtube keyword search tool',
    'keyword tools for youtube',
  ],
  alternates: { canonical: '/keyword-generator' },
  openGraph: {
    title: 'Free YouTube Keyword Tool & Generator | yttools.pro',
    description:
      'Find YouTube keyword ideas for videos, Shorts, and channels with related phrases, intent, and relative difficulty. Free and no login.',
    images: toolOgImages('ai-generator', 'Free YouTube Keyword Tool'),
  },
};

export default function KeywordGeneratorPage() {
  return (
    <ToolPageShell
      toolName="Keyword Generator"
      toolDescription="Find high-ranking YouTube keywords with search intent and difficulty analysis."
      toolSlug="keyword-generator"
      title="Free YouTube Keyword Tool & Generator"
      description="Find keyword ideas for YouTube videos, Shorts, and channels. Review related phrases, search intent, and relative difficulty—not official search volume."
      answerFirst="This free YouTube keyword tool generates ideas for videos, Shorts, and channels from one seed topic. Review related phrases, search intent, and relative difficulty, then validate the shortlist in YouTube search. No login required."
      seo={<SeoContent />}
      faqs={faqs}
      howToSteps={[
        { name: 'Enter a seed topic', text: 'Type the core subject of the video or content cluster you want to plan.' },
        { name: 'Choose the audience language', text: 'Select the language that matches the viewers you want to reach.' },
        { name: 'Generate and filter ideas', text: 'Review related phrases, intent labels, popularity signals, and relative difficulty.' },
        { name: 'Validate before publishing', text: 'Search the strongest phrases on YouTube and choose one primary phrase that the video genuinely answers.' },
      ]}
    >
      <KeywordGeneratorClient />
    </ToolPageShell>
  );
}
