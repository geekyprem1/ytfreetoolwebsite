import type { Metadata } from 'next';
import { DescriptionGeneratorClient } from './client';
import { ToolPageSchema } from '@/components/tools/tool-page-schema';

export const metadata: Metadata = {
  title: 'Free AI YouTube Description Generator — SEO Optimized Descriptions',
  description:
    'Generate complete YouTube video descriptions with chapters, hashtags, and CTAs using AI. No login required. Free and easy to use.',
  keywords: ['youtube description generator', 'ai description generator', 'video description', 'seo description'],
  alternates: { canonical: '/description-generator' },
};

export default function DescriptionGeneratorPage() {
  return (
    <ToolPageSchema
      toolName="AI Description Generator"
      toolDescription="Generate complete video descriptions with chapters, hashtags, and CTAs using AI."
      toolSlug="description-generator"
    >
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          AI YouTube <span className="text-red-500">Description Generator</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Generate complete, SEO-optimized video descriptions with chapters, hashtags, and CTAs. Powered by AI.
        </p>
      </div>

      <DescriptionGeneratorClient />

      <article className="mt-16 prose prose-neutral dark:prose-invert max-w-none">
        <h2>How to Generate YouTube Descriptions</h2>
        <ol>
          <li><strong>Enter your topic</strong> — What is your video about?</li>
          <li><strong>Add a keyword</strong> — Your target SEO keyword for ranking.</li>
          <li><strong>Write a summary</strong> — Brief overview of the video content.</li>
          <li><strong>Choose options</strong> — Include timestamps, hashtags, and CTA.</li>
          <li><strong>Generate</strong> — Get a complete, ready-to-paste description.</li>
        </ol>

        <h2>Features</h2>
        <ul>
          <li>📝 <strong>Complete Description</strong> — Fully written, keyword-rich description</li>
          <li>#️⃣ <strong>Auto Hashtags</strong> — Relevant hashtags included</li>
          <li>⏱️ <strong>Chapter Timestamps</strong> — Structured chapters for better navigation</li>
          <li>📢 <strong>CTA Section</strong> — Call-to-action optimized for engagement</li>
          <li>🌍 <strong>Multiple Tones</strong> — Professional, casual, educational, enthusiastic</li>
        </ul>

        <h2>Why Good Descriptions Matter</h2>
        <p>
          YouTube descriptions help your video rank in search and provide context to viewers.
          The first 2-3 lines appear in search results and suggested videos. A well-crafted description
          with timestamps, keywords, and CTAs can significantly boost your video&apos;s performance.
        </p>

        <h2>Description Writing Tips</h2>
        <ul>
          <li>Put the most important information in the first 2-3 lines</li>
          <li>Include your main keyword 2-3 times naturally</li>
          <li>Add timestamps for longer videos (10+ minutes)</li>
          <li>Include links to related content or social media</li>
          <li>End with a clear call-to-action (subscribe, watch next, etc.)</li>
        </ul>
      </article>
    </ToolPageSchema>
  );
}
