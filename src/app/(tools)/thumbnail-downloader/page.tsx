import type { Metadata } from 'next';
import { ThumbnailDownloaderClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/thumbnail-downloader';

export const metadata: Metadata = {
  title: 'Free YouTube Thumbnail Downloader — Download HD Thumbnails Instantly',
  description:
    'Download YouTube thumbnails in Max, HD, SD, HQ, and MQ quality. No login required. Free, fast, and easy to use. Save thumbnails from any YouTube video.',
  keywords: [
    'youtube thumbnail downloader',
    'download youtube thumbnail',
    'youtube thumbnail grabber',
    'free youtube thumbnail download',
    'hd thumbnail downloader',
  ],
  alternates: { canonical: '/thumbnail-downloader' },
  openGraph: {
    title: 'Free YouTube Thumbnail Downloader — No Login Required',
    description: 'Download YouTube thumbnails in all qualities. Fast, free, and no signup needed.',
  },
};

export default async function ThumbnailDownloaderPage({
  searchParams,
}: {
  searchParams: Promise<{ url?: string }>;
}) {
  const params = await searchParams;
  return (
    <ToolPageShell
      toolName="Thumbnail Downloader"
      toolDescription="Download YouTube thumbnails in HD, SD, HQ quality. Free and no login required."
      toolSlug="thumbnail-downloader"
      title="Free YouTube Thumbnail Downloader"
      description="Download thumbnails from any YouTube video in HD quality. No login, no signup, completely free."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <ThumbnailDownloaderClient initialUrl={params.url} />
    </ToolPageShell>
  );
}
