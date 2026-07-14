import type { Metadata } from 'next';
import { HashtagGeneratorClient } from './client';
import { ToolPageSchema } from '@/components/tools/tool-page-schema';

export const metadata = {
  title: 'Free AI YouTube Hashtag Generator — Trending Hashtags',
  description: 'Generate trending, niche, and broad hashtags for YouTube videos with AI. Grouped by category for better discoverability.',
  keywords: ['youtube hashtag generator', 'ai hashtags', 'trending hashtags', 'video hashtags'],
  alternates: { canonical: '/hashtag-generator' },
};

export default function HashtagGeneratorPage() {
  return (
    <ToolPageSchema
      toolName="AI Hashtag Generator"
      toolDescription="Generate trending, niche, and broad hashtags for your YouTube videos."
      toolSlug="hashtag-generator"
    >
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          AI YouTube <span className="text-red-500">Hashtag Generator</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Generate trending, niche, and broad hashtags for your YouTube videos. Grouped and ready to copy.
        </p>
      </div>
      <HashtagGeneratorClient />
      <article className="mt-16 prose prose-neutral dark:prose-invert max-w-none">
        <h2>How to Generate YouTube Hashtags</h2>
        <ol>
          <li><strong>Enter your topic</strong> — Describe what your video is about.</li>
          <li><strong>Choose count</strong> — How many hashtags you want (5-50).</li>
          <li><strong>Generate</strong> — Get grouped hashtags instantly.</li>
        </ol>
        <h2>Features</h2>
        <ul>
          <li>🏷️ <strong>Smart Grouping</strong> — Broad, niche, and trending categories</li>
          <li>🤖 <strong>AI Powered</strong> — Contextually relevant hashtags</li>
          <li>📋 <strong>One-Click Copy</strong> — Copy all or per category</li>
          <li>🔓 <strong>No Login Required</strong></li>
        </ul>
        <h2>Why Hashtags Matter</h2>
        <p>YouTube hashtags help your video appear in hashtag search results. Using a mix of broad (high reach), niche (targeted audience), and trending (current buzz) hashtags maximizes your discoverability.</p>
      </article>
    </ToolPageSchema>
  );
}
