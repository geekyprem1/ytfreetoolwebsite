import type { Metadata } from 'next';
import { ThumbnailDownloaderClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/thumbnail-downloader';

export const metadata: Metadata = {
  title: {
    absolute: 'Free YouTube Thumbnail Downloader (HD, 4K) | yttools.pro',
  },
  description:
    'Free YouTube Video Thumbnail Downloader (HD maxresdefault). Save 1280×720, 640×480, 480×360 & more from any video URL. No login required.',
  keywords: [
    'YouTube Video Thumbnail Downloader',
    'HD maxresdefault',
    'download youtube thumbnail',
    'youtube thumbnail grabber',
    'free youtube thumbnail download',
  ],
  alternates: { canonical: '/thumbnail-downloader' },
  openGraph: {
    title: 'Free YouTube Thumbnail Downloader (HD, 4K) | yttools.pro',
    description:
      'Download YouTube video thumbnails in Max HD maxresdefault and other qualities. Fast, free, no signup.',
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
      title="Free YouTube Video Thumbnail Downloader (HD maxresdefault)"
      description="Download original YouTube video thumbnails (HD maxresdefault 1280×720 and smaller CDN sizes) from any public or unlisted URL in under 0.8 seconds — no login, no extension, not Windows thumbs.db files."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <ThumbnailDownloaderClient initialUrl={params.url} />
    </ToolPageShell>
  );
}
