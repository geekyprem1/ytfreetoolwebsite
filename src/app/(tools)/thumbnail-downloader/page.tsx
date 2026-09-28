import type { Metadata } from 'next';
import { ThumbnailDownloaderClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/thumbnail-downloader';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube Thumbnail Downloader — Available Sizes | YT Toolkit',
  },
  description:
    'Save YouTube video thumbnails in common CDN sizes up to 1280×720 when available. Free online thumbnail downloader with no login required.',
  keywords: [
    'YouTube Video Thumbnail Downloader',
    'HD maxresdefault',
    'download youtube thumbnail sizes',
    'youtube thumbnail grabber',
    'free youtube thumbnail download',
  ],
  alternates: { canonical: '/thumbnail-downloader' },
  openGraph: {
    title: 'YouTube Thumbnail Downloader — Available Sizes | YT Toolkit',
    description:
      'Save common YouTube thumbnail sizes up to 1280×720 when available, with no login required.',
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
      toolDescription="Save common YouTube thumbnail sizes. Free and no login required."
      toolSlug="thumbnail-downloader"
      title="Free YouTube Video Thumbnail Downloader (HD maxresdefault)"
      description="Save YouTube video thumbnails in common CDN sizes from 120×90 to Max 1280×720, when those versions are available. Paste a public or unlisted video URL; no login or extension required."
      answerFirst="Paste a YouTube video URL to preview and save common thumbnail sizes. Max is typically 1280×720 when available; SD, HQ, MQ, and Default offer smaller versions. This tool does not promise 1080p or 4K thumbnail files."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <ThumbnailDownloaderClient initialUrl={params.url} />
    </ToolPageShell>
  );
}
