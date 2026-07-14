import type { Metadata } from 'next';
import { TranscriptExtractorClient } from './client';
import { ToolPageSchema } from '@/components/tools/tool-page-schema';

export const metadata: Metadata = {
  title: 'Free YouTube Transcript Extractor — Get Video Transcript Instantly',
  description:
    'Get the full transcript of any YouTube video with timestamps. Copy, download as TXT, or AI summarize. No login required.',
  keywords: ['youtube transcript extractor', 'youtube transcript download', 'video transcript', 'youtube caption extractor'],
  alternates: { canonical: '/transcript-extractor' },
};

export default async function TranscriptExtractorPage({
  searchParams,
}: {
  searchParams: Promise<{ url?: string }>;
}) {
  const params = await searchParams;
  return (
    <ToolPageSchema
      toolName="Transcript Extractor"
      toolDescription="Get the full transcript of any YouTube video with timestamps. Copy, download as TXT, or AI summarize."
      toolSlug="transcript-extractor"
    >
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          Free YouTube <span className="text-red-500">Transcript Extractor</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Extract the complete transcript of any YouTube video. Get timestamped text, copy it, or download as TXT.
        </p>
      </div>

      <TranscriptExtractorClient initialUrl={params.url} />

      <article className="mt-16 prose prose-neutral dark:prose-invert max-w-none">
        <h2>How to Extract YouTube Transcripts</h2>
        <ol>
          <li><strong>Copy the video URL</strong> — Find a video with captions and copy its URL.</li>
          <li><strong>Paste it above</strong> — Paste the URL and click Analyze.</li>
          <li><strong>Get the transcript</strong> — The full transcript with timestamps appears instantly.</li>
          <li><strong>Copy or download</strong> — Copy to clipboard or download as a TXT file.</li>
        </ol>

        <h2>Features</h2>
        <ul>
          <li>📝 <strong>Full Transcript</strong> — Complete video text with timestamps</li>
          <li>🌐 <strong>Multi-Language</strong> — Transcripts available in multiple languages when provided</li>
          <li>📋 <strong>Copy & Download</strong> — Copy to clipboard or save as TXT</li>
          <li>🤖 <strong>AI Summary</strong> — Get an AI-powered summary of the transcript</li>
          <li>⏱️ <strong>Timestamped Segments</strong> — Each segment shows its time offset</li>
        </ul>

        <h2>Why Extract Transcripts?</h2>
        <p>
          Video transcripts are useful for content research, creating blog posts from videos,
          studying how creators structure their content, or extracting quotes. Our tool makes it
          simple — just paste a URL and get the full transcript in seconds.
        </p>

        <h2>Tips</h2>
        <ul>
          <li>Not all videos have transcripts — they must have captions enabled</li>
          <li>Use transcripts to find key moments and create timestamps</li>
          <li>AI-powered summary helps you quickly grasp long videos</li>
          <li>Download transcripts for offline reading or content repurposing</li>
        </ul>
      </article>
    </ToolPageSchema>
  );
}
