import type { Metadata } from 'next';
import { TitleGeneratorClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/title-generator';
import { toolOgImages } from '@/lib/seo/tool-og';

export const metadata: Metadata = {
  title: {
    absolute: 'Free AI YouTube Title Generator | Clickable Titles',
  },
  description:
    'Free AI YouTube title generator for clickable SEO headlines. Create title ideas with your topic, keyword, tone, and language—no login required.',
  keywords: [
    'youtube title generator',
    'ai youtube title generator',
    'ai title generator for youtube',
    'youtube title generator ai',
    'youtube title generator with emojis',
    'ai title generator',
    'seo titles',
    'youtube title ideas',
    'video title maker',
  ],
  alternates: { canonical: '/title-generator' },
  openGraph: {
    title: 'Free AI YouTube Title Generator | Clickable Titles',
    description:
      'Create clickable YouTube title ideas with AI from a topic and keyword. Choose tone and language, then copy SEO-friendly options with no login.',
    images: toolOgImages('ai-generator', 'Free AI YouTube Title Generator'),
  },
};

export default function TitleGeneratorPage() {
  return (
    <ToolPageShell
      toolName="AI Title Generator"
      toolDescription="Generate SEO-optimized, click-worthy YouTube titles with AI."
      toolSlug="title-generator"
      title="Free AI YouTube Title Generator"
      description="Generate free AI YouTube titles built to earn clicks—not blog headlines. Get SEO-friendly options near the 40–60 character range, choose a tone, and copy multiple clickable ideas with no login."
      answerFirst="YouTube (YT) Toolkit's Title Generator creates AI clickable YouTube titles in the 40-60 character range so your packaging earns more clicks. Free, no login - pick a tone and copy SEO-friendly options in seconds."
      seo={<SeoContent />}
      faqs={faqs}
      howToSteps={[
        { name: 'Describe the video topic', text: 'Enter the outcome, audience, and format so the title ideas stay specific.' },
        { name: 'Add a primary keyword', text: 'Use the phrase viewers might search for or the topic your video genuinely answers.' },
        { name: 'Choose tone and language', text: 'Match the wording to your channel voice and target audience.' },
        { name: 'Generate and shortlist', text: 'Compare several options with the thumbnail promise, then refine and copy the strongest title.' },
      ]}
    >
      <TitleGeneratorClient />
    </ToolPageShell>
  );
}
