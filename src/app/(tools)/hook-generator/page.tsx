import type { Metadata } from 'next';
import { HookGeneratorClient } from './client';
import { ToolPageSchema } from '@/components/tools/tool-page-schema';

export const metadata = {
  title: 'Free AI YouTube Hook Generator — Capture Attention in 3 Seconds',
  description: 'Generate powerful hooks for your YouTube videos — questions, stories, curiosity gaps, and shock statements.',
  keywords: ['youtube hook generator', 'video hooks', 'attention hooks', 'opening hooks'],
  alternates: { canonical: '/hook-generator' },
};

export default function HookGeneratorPage() {
  return (
    <ToolPageSchema
      toolName="Hook Generator"
      toolDescription="Generate powerful hooks for your YouTube videos — questions, stories, curiosity gaps, and shock statements."
      toolSlug="hook-generator"
    >
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          AI YouTube <span className="text-red-500">Hook Generator</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Generate powerful hooks that grab attention in the first 3 seconds. Question, story, curiosity, and shock hooks.
        </p>
      </div>
      <HookGeneratorClient />
      <article className="mt-16 prose prose-neutral dark:prose-invert max-w-none">
        <h2>How to Create Powerful Hooks</h2>
        <ol>
          <li><strong>Enter your topic</strong> — What is your video about?</li>
          <li><strong>Define your audience</strong> — Who are you talking to?</li>
          <li><strong>Pick a tone</strong> — Bold, humorous, professional, or dramatic.</li>
          <li><strong>Generate</strong> — Get hooks in 4 categories.</li>
        </ol>
        <h2>Features</h2>
        <ul>
          <li>❓ <strong>Question Hooks</strong> — Spark curiosity with compelling questions</li>
          <li>📖 <strong>Story Hooks</strong> — Tease an interesting narrative</li>
          <li>🤔 <strong>Curiosity Hooks</strong> — Create information gaps</li>
          <li>😲 <strong>Shock Hooks</strong> — Use surprising facts or bold claims</li>
        </ul>
        <h2>Why Hooks Matter</h2>
        <p>The first 3 seconds determine whether viewers keep watching or scroll away. A great hook creates enough curiosity or emotional impact to make them stay for the full video.</p>
      </article>
    </ToolPageSchema>
  );
}
