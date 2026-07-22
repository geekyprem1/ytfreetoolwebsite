import type { Metadata } from 'next';
import { KeywordGeneratorClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/keyword-generator';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube Keyword Generator (Free SEO Ideas) | yttools.pro',
  },
  description:
    'Free YouTube keyword generator with difficulty, popularity, and search intent labels. Expand a seed topic into SEO ideas for titles and tags. No login required.',
  keywords: ['youtube keyword generator', 'keyword research', 'seo keywords', 'video keywords'],
  alternates: { canonical: '/keyword-generator' },
  openGraph: {
    title: 'YouTube Keyword Generator (Free SEO Ideas) | yttools.pro',
    description:
      'Free YouTube keyword generator with difficulty, popularity, and search intent labels. Expand a seed topic into SEO ideas for titles and tags. No login required.',
  },
};

export default function KeywordGeneratorPage() {
  return (
    <ToolPageShell
      toolName="Keyword Generator"
      toolDescription="Find high-ranking YouTube keywords with search intent and difficulty analysis."
      toolSlug="keyword-generator"
      title="YouTube Keyword Generator"
      description="Generate free YouTube keyword ideas with difficulty, popularity, and search intent—not generic Google SEO lists. Enter a seed topic to expand into title and tag phrases you can actually publish."
      answerFirst="YouTube (YT) Toolkit's Keyword Generator expands a seed topic into YouTube keyword ideas with difficulty, popularity, and search intent. Free, no login - get title and tag phrases built for YouTube, not generic web SEO lists."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <KeywordGeneratorClient />
    </ToolPageShell>
  );
}
