import type { Metadata } from 'next';
import { ShortsIdeasClient } from './client';
import { ToolPageSchema } from '@/components/tools/tool-page-schema';

export const metadata = {
  title: 'Free YouTube Shorts Idea Generator — 50 Viral Ideas',
  description: 'Generate 50 viral YouTube Shorts ideas with trend and virality scores. AI powered. No login required.',
  keywords: ['youtube shorts ideas', 'shorts generator', 'viral shorts', 'shorts content'],
  alternates: { canonical: '/shorts-ideas' },
};

export default function ShortsIdeasPage() {
  return (
    <ToolPageSchema
      toolName="Shorts Idea Generator"
      toolDescription="Generate 50 viral YouTube Shorts ideas with trend and virality scores."
      toolSlug="shorts-ideas"
    >
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          YouTube <span className="text-red-500">Shorts Idea Generator</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Generate viral YouTube Shorts ideas with trend and virality scores. 50 ideas in one click.
        </p>
      </div>
      <ShortsIdeasClient />
      <article className="mt-16 prose prose-neutral dark:prose-invert max-w-none">
        <h2>How to Generate Shorts Ideas</h2>
        <ol><li><strong>Enter a topic</strong> — Your niche or content theme.</li><li><strong>Choose count</strong> — 5-50 ideas at once.</li><li><strong>Generate</strong> — Get idea cards with scores.</li></ol>
        <h2>Features</h2>
        <ul><li>🔥 Trend & virality scores per idea</li><li>🎬 Category tags (tutorial, lifehack, challenge, etc.)</li><li>📋 Copy all or individual ideas</li></ul>
      </article>
    </ToolPageSchema>
  );
}
