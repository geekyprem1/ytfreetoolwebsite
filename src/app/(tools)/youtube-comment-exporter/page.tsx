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
      description="Export the comments from any public YouTube video to CSV or JSON. Sort by likes or date, search the text, and download the data for analysis, research, or backup."
      answerFirst="Paste a YouTube video URL and this free tool loads its comments so you can export them to CSV or JSON. Sort by likes or date and search the text before downloading. Top-level comments only, no login."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <CommentExporterClient initialUrl={params.url} />
    </ToolPageShell>
  );
}
