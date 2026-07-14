import type { Metadata } from 'next';
import { SeoScoreCheckerClient } from './client';
import { ToolPageSchema } from '@/components/tools/tool-page-schema';

export const metadata: Metadata = {
  title: 'Free YouTube SEO Score Checker — Optimize Your Videos',
  description: 'Check your YouTube video SEO score out of 100. Get detailed breakdown and actionable tips. No login required.',
  keywords: ['youtube seo score', 'seo checker', 'video seo analysis', 'seo score calculator'],
  alternates: { canonical: '/seo-score-checker' },
};

export default function SeoScoreCheckerPage() {
  return (
    <ToolPageSchema
      toolName="SEO Score Checker"
      toolDescription="Grade your video SEO with a detailed score breakdown and improvement tips."
      toolSlug="seo-score-checker"
    >
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          YouTube <span className="text-red-500">SEO Score Checker</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Grade your video SEO with a detailed score breakdown. Get actionable tips to rank higher on YouTube.
        </p>
      </div>
      <SeoScoreCheckerClient />
      <article className="mt-16 prose prose-neutral dark:prose-invert max-w-none">
        <h2>How to Check Your SEO Score</h2>
        <ol>
          <li><strong>Enter your details</strong> — Fill in your title, description, tags, and keyword.</li>
          <li><strong>Click Analyze</strong> — Get your score instantly.</li>
          <li><strong>Review breakdown</strong> — See scores per category with specific suggestions.</li>
        </ol>
        <h2>Features</h2>
        <ul>
          <li>📊 <strong>Overall Score</strong> — Get a score out of 100 with a visual gauge</li>
          <li>📋 <strong>Category Breakdown</strong> — Title, description, tags, keywords, readability</li>
          <li>💡 <strong>Actionable Tips</strong> — Specific suggestions to improve each area</li>
          <li>⚡ <strong>Instant Results</strong> — No AI calls, purely computational — super fast</li>
        </ul>
        <h2>What We Check</h2>
        <ul>
          <li><strong>Title (10%)</strong> — Length, keyword placement, power words</li>
          <li><strong>Description (10%)</strong> — Length, structure, keyword density</li>
          <li><strong>Tags (15%)</strong> — Count, relevance, variety</li>
          <li><strong>Keyword Density (20%)</strong> — Optimal keyword usage across your metadata</li>
          <li><strong>Hashtags (10%)</strong> — Usage and variety</li>
          <li><strong>Readability (15%)</strong> — Reading ease, structure</li>
          <li><strong>Structure (10%)</strong> — Line breaks, formatting</li>
          <li><strong>Engagement Hooks (10%)</strong> — CTAs, question hooks</li>
        </ul>
      </article>
    </ToolPageSchema>
  );
}
