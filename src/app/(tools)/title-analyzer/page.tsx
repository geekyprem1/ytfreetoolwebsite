import type { Metadata } from 'next';
import { TitleAnalyzerClient } from './client';
import { ToolPageSchema } from '@/components/tools/tool-page-schema';

export const metadata = {
  title: 'Free YouTube Title Analyzer — Compare & Predict Title Performance',
  description: 'Compare two YouTube titles and predict which will get more clicks. AI-powered CTR prediction and SEO analysis.',
  keywords: ['youtube title analyzer', 'title comparison', 'title ab test', 'title score'],
  alternates: { canonical: '/title-analyzer' },
};

export default function TitleAnalyzerPage() {
  return (
    <ToolPageSchema
      toolName="Title Analyzer"
      toolDescription="Compare two titles and predict which will get more clicks and rank better."
      toolSlug="title-analyzer"
    >
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          YouTube <span className="text-red-500">Title Analyzer</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Compare two video titles and predict which one will perform better. AI-powered CTR prediction, SEO score, and emotion analysis.
        </p>
      </div>
      <TitleAnalyzerClient />
      <article className="mt-16 prose prose-neutral dark:prose-invert max-w-none">
        <h2>How to Compare Titles</h2>
        <ol><li><strong>Enter Title A & Title B</strong> — The two titles you want to compare.</li><li><strong>Add keyword (optional)</strong> — Your target keyword.</li><li><strong>Analyze</strong> — Get side-by-side comparison.</li></ol>
        <p>This is an AI prediction, not real A/B testing. YouTube doesn't support native title A/B testing.</p>
        <h2>Features</h2>
        <ul><li>📊 CTR prediction</li><li>🎯 SEO score</li><li>😊 Emotion score</li><li>⚡ Power words detected</li><li>🏆 Winner + analysis</li></ul>
      </article>
    </ToolPageSchema>
  );
}
