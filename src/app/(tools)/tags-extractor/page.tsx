import type { Metadata } from 'next';
import { TagsExtractorClient } from './client';
import { ToolPageSchema } from '@/components/tools/tool-page-schema';

export const metadata: Metadata = {
  title: 'Free YouTube Tags Extractor — Extract Video Tags Instantly',
  description:
    'Extract all tags from any YouTube video instantly. Copy tags or download as TXT. No login required. Find competitor tags for SEO research.',
  keywords: ['youtube tags extractor', 'extract youtube tags', 'youtube tag finder', 'video tags tool'],
  alternates: { canonical: '/tags-extractor' },
};

export default async function TagsExtractorPage({
  searchParams,
}: {
  searchParams: Promise<{ url?: string }>;
}) {
  const params = await searchParams;
  return (
    <ToolPageSchema
      toolName="Tags Extractor"
      toolDescription="Extract all tags from any YouTube video instantly. Copy or download as TXT."
      toolSlug="tags-extractor"
    >
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          Free YouTube <span className="text-red-500">Tags Extractor</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Extract tags from any YouTube video. Copy, download, and analyze competitor video tags for SEO research.
        </p>
      </div>

      <TagsExtractorClient initialUrl={params.url} />

      <article className="mt-16 prose prose-neutral dark:prose-invert max-w-none">
        <h2>How to Extract YouTube Video Tags</h2>
        <ol>
          <li><strong>Copy the video URL</strong> — Find any YouTube video and copy its URL.</li>
          <li><strong>Paste it above</strong> — Paste the URL and click Analyze.</li>
          <li><strong>Get all tags</strong> — All video tags appear instantly.</li>
          <li><strong>Copy or download</strong> — Copy individual tags or download all as a TXT file.</li>
        </ol>

        <h2>Features</h2>
        <ul>
          <li>🏷️ <strong>Complete Tag List</strong> — Every tag the creator used on the video</li>
          <li>📋 <strong>One-Click Copy</strong> — Click any tag to copy it, or copy all at once</li>
          <li>📥 <strong>Download as TXT</strong> — Export all tags as a text file</li>
          <li>🔓 <strong>No Login Required</strong> — Completely free, no signup needed</li>
        </ul>

        <h2>Why Extract YouTube Tags?</h2>
        <p>
          YouTube tags help videos get discovered through search and suggested videos. By analyzing
          the tags used by successful creators in your niche, you can improve your own video SEO
          strategy. Our tool lets you peek behind the curtain and see exactly what tags any video is using.
        </p>

        <h2>Tips for Using Tags</h2>
        <ul>
          <li>Study tags from top-ranking videos in your niche</li>
          <li>Look for long-tail keyword tags that have less competition</li>
          <li>Include a mix of broad and specific tags in your own videos</li>
          <li>Use the exported TXT to import tags into your upload workflow</li>
        </ul>
      </article>
    </ToolPageSchema>
  );
}
