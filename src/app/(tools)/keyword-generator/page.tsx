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
    'Free YouTube keyword tool and generator for video titles, tags, and topics. Get related phrases, search intent, and difficulty signals with no login.',
  keywords: [
    'free youtube keyword tool',
    'keyword tool for youtube',
    'youtube keyword generator',
    'youtube keyword research tool',
    'keyword tools for youtube',
  ],
  alternates: { canonical: '/keyword-generator' },
  openGraph: {
    title: 'Free YouTube Keyword Tool & Generator | yttools.pro',
    description:
      'Generate YouTube keyword ideas for titles, tags, and topics with intent and difficulty signals. Free and no login.',
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
      description="Generate free YouTube keyword ideas with difficulty, popularity, and search intent—not generic Google SEO lists. Enter a seed topic to expand into title and tag phrases you can actually publish."
      answerFirst="This free YouTube keyword tool expands a seed topic into keyword ideas for videos, titles, and tags. Review related phrases, search intent, and relative difficulty, then validate the shortlist in YouTube search. No login required."
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
