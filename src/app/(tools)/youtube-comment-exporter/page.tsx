import type { Metadata } from 'next';
import { CommentExporterClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/youtube-comment-exporter';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube Comment Exporter — CSV & JSON (Free) | yttools.pro',
  },
  description:
    'Export YouTube video comments to CSV or JSON. Sort by likes or date, search, and download for analysis or backup. Free, no login.',
  keywords: [
    'youtube comment exporter',
    'export youtube comments to csv',
    'download youtube comments',
    'youtube comments to spreadsheet',
  ],
  alternates: { canonical: '/youtube-comment-exporter' },
  openGraph: {
    title: 'YouTube Comment Exporter — CSV & JSON (Free) | yttools.pro',
    description:
      'Export YouTube video comments to CSV or JSON. Sort, search, and download. Free, no login.',
  },
};

export default async function CommentExporterPage({
  searchParams,
}: {
  searchParams: Promise<{ url?: string }>;
}) {
  const params = await searchParams;
  return (
    <ToolPageShell
      toolName="Comment Exporter"
      toolDescription="Export a YouTube video’s comments to CSV or JSON."
      toolSlug="youtube-comment-exporter"
      title="YouTube Comment Exporter"
      description="Load up to 2,000 top-level comments from a YouTube video, search and sort that sample, then export filtered matches to CSV or JSON."
      answerFirst="Paste a YouTube video URL to load up to 2,000 top-level comments. Search and sort only within the loaded sample, then export every matching row to CSV or JSON; replies and comments outside the sample are not included."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <CommentExporterClient initialUrl={params.url} />
    </ToolPageShell>
  );
}
