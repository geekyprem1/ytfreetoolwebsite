import type { Metadata } from 'next';
import { KeywordGeneratorClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/keyword-generator';

export const metadata: Metadata = {
  title: 'YouTube Keyword Generator — Find High-Ranking Keywords',
  description: 'Generate keyword ideas with difficulty, popularity, and search intent analysis. AI powered, no login required.',
  keywords: ['youtube keyword generator', 'keyword research', 'seo keywords', 'video keywords'],
  alternates: { canonical: '/keyword-generator' },
  openGraph: {
    title: 'YouTube Keyword Generator — Find High-Ranking Keywords',
    description: 'Expand seed topics into YouTube keyword ideas with difficulty, popularity, and intent.',
  },
};

export default function KeywordGeneratorPage() {
  return (
    <ToolPageShell
      toolName="Keyword Generator"
      toolDescription="Find high-ranking YouTube keywords with search intent and difficulty analysis."
      toolSlug="keyword-generator"
      title="YouTube Keyword Generator"
      description="Find high-ranking YouTube keywords with difficulty, popularity, and search intent analysis."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <KeywordGeneratorClient />
    </ToolPageShell>
  );
}
