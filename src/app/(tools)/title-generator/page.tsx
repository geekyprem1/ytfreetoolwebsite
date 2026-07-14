import type { Metadata } from 'next';
import { TitleGeneratorClient } from './client';
import { ToolPageSchema } from '@/components/tools/tool-page-schema';

export const metadata: Metadata = {
  title: 'Free AI YouTube Title Generator — SEO Optimized Titles',
  description:
    'Generate SEO-optimized, click-worthy YouTube titles with AI. Choose tone, language, and get multiple title ideas. No login required.',
  keywords: ['youtube title generator', 'ai title generator', 'seo titles', 'youtube title ideas', 'video title maker'],
  alternates: { canonical: '/title-generator' },
};

export default function TitleGeneratorPage() {
  return (
    <ToolPageSchema
      toolName="AI Title Generator"
      toolDescription="Generate SEO-optimized, click-worthy YouTube titles with AI."
      toolSlug="title-generator"
    >
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          AI YouTube <span className="text-red-500">Title Generator</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Generate SEO-optimized, click-worthy YouTube titles with AI. Choose your tone, language, and get multiple ideas.
        </p>
      </div>

      <TitleGeneratorClient />

      <article className="mt-16 prose prose-neutral dark:prose-invert max-w-none">
        <h2>How to Generate YouTube Titles with AI</h2>
        <ol>
          <li><strong>Enter your topic</strong> — Describe what your video is about.</li>
          <li><strong>Add a keyword</strong> — Include your target keyword for SEO.</li>
          <li><strong>Choose tone & language</strong> — Select the style that fits your audience.</li>
          <li><strong>Generate</strong> — Get 5-20 AI-powered title suggestions instantly.</li>
        </ol>

        <h2>Features</h2>
        <ul>
          <li>🤖 <strong>AI-Powered</strong> — Uses Gemini 2.5 Flash for creative, relevant titles</li>
          <li>🎯 <strong>SEO Optimized</strong> — Every title includes your target keyword naturally</li>
          <li>🎨 <strong>5 Tone Options</strong> — Professional, casual, clickbait, educational, humorous</li>
          <li>🌍 <strong>20+ Languages</strong> — Generate titles in your preferred language</li>
          <li>📋 <strong>Copy & Regenerate</strong> — Copy your favorites or generate more ideas</li>
        </ul>

        <h2>Why Good Titles Matter</h2>
        <p>
          Your video title is the #1 factor that determines whether someone clicks. A great title
          balances SEO keywords with curiosity and emotion. Our AI understands YouTube best practices
          and generates titles that rank well while getting clicks.
        </p>

        <h2>Title Writing Tips</h2>
        <ul>
          <li>Keep titles between 50-70 characters for best display</li>
          <li>Place your main keyword near the beginning</li>
          <li>Use power words like &quot;Ultimate,&quot; &quot;Complete,&quot; &quot;Proven&quot;</li>
          <li>Create curiosity gaps without being misleading</li>
          <li>Test different tones to see what resonates with your audience</li>
        </ul>
      </article>
    </ToolPageSchema>
  );
}
