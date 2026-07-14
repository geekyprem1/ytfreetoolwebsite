import type { Metadata } from 'next';
import { KeywordGeneratorClient } from './client';
import { ToolPageSchema } from '@/components/tools/tool-page-schema';

export const metadata = {
  title: 'Free YouTube Keyword Generator — Find High-Ranking Keywords',
  description: 'Generate keyword ideas with difficulty, popularity, and search intent analysis. AI powered, no login required.',
  keywords: ['youtube keyword generator', 'keyword research', 'seo keywords', 'video keywords'],
  alternates: { canonical: '/keyword-generator' },
};

export default function KeywordGeneratorPage() {
  return (
    <ToolPageSchema
      toolName="Keyword Generator"
      toolDescription="Find high-ranking YouTube keywords with search intent and difficulty analysis."
      toolSlug="keyword-generator"
    >
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          YouTube <span className="text-red-500">Keyword Generator</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Find high-ranking YouTube keywords with difficulty, popularity, and search intent analysis.
        </p>
      </div>
      <KeywordGeneratorClient />
      <article className="mt-16 prose prose-neutral dark:prose-invert max-w-none">
        <h2>How to Find YouTube Keywords</h2>
        <ol><li><strong>Enter a seed keyword</strong> — Start with your main topic.</li><li><strong>Choose language</strong> — Generate keywords in your target language.</li><li><strong>Generate</strong> — Get keyword ideas with metadata.</li></ol>
        <h2>Features</h2>
        <ul>
          <li>🔑 Keyword difficulty (easy/medium/hard)</li>
          <li>📈 Popularity indicators</li>
          <li>🎯 Search intent analysis</li>
          <li>🔗 Related keywords & suggested questions</li>
        </ul>
      </article>
    </ToolPageSchema>
  );
}
