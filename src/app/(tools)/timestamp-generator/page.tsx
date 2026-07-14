import type { Metadata } from 'next';
import { TimestampGeneratorClient } from './client';
import { ToolPageSchema } from '@/components/tools/tool-page-schema';

export const metadata = {
  title: 'Free AI YouTube Timestamp Generator — Generate Video Chapters',
  description: 'Auto-generate video chapters from transcripts with AI. Create clickable timestamps for better navigation.',
  keywords: ['youtube timestamp generator', 'video chapters', 'chapter generator', 'timestamps'],
  alternates: { canonical: '/timestamp-generator' },
};

export default function TimestampGeneratorPage() {
  return (
    <ToolPageSchema
      toolName="Timestamp Generator"
      toolDescription="Auto-generate video chapters from transcripts with AI."
      toolSlug="timestamp-generator"
    >
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          AI <span className="text-red-500">Timestamp Generator</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Generate video chapters from transcripts. Perfect for longer videos to improve viewer navigation.
        </p>
      </div>
      <TimestampGeneratorClient />
      <article className="mt-16 prose prose-neutral dark:prose-invert max-w-none">
        <h2>How to Generate Chapters</h2>
        <ol><li><strong>Paste a transcript</strong> — From our Transcript Extractor or manually.</li><li><strong>Generate</strong> — AI creates meaningful chapters.</li><li><strong>Copy</strong> — Paste the chapters into your video description.</li></ol>
        <h2>Features</h2>
        <ul><li>🤖 AI-generated chapters from transcript</li><li>⏱️ Proper timestamp formatting</li><li>📋 Ready-to-paste format</li></ul>
      </article>
    </ToolPageSchema>
  );
}
