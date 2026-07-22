import type { Metadata } from 'next';
import { ThumbnailDownloaderClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/thumbnail-downloader';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube Thumbnail Downloader 4K HD - YT Toolkit | Save Images',
  },
  description:
    'Download 4K & HD YouTube video thumbnails instantly in full 1080p resolution. Free online YouTube thumbnail saver with no account or login required.',
  keywords: [
    'YouTube Video Thumbnail Downloader',
    'HD maxresdefault',
    'download youtube thumbnail 4k',
    'youtube thumbnail grabber',
    'free youtube thumbnail download',
  ],
  alternates: { canonical: '/thumbnail-downloader' },
  openGraph: {
    title: 'YouTube Thumbnail Downloader 4K HD - YT Toolkit | Save Images',
    description:
      'Download 4K & HD YouTube video thumbnails instantly. Free online YouTube thumbnail saver with no account or login required.',
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
      description="Download original YouTube video thumbnails (HD maxresdefault 1280x720 and smaller CDN sizes) from any public or unlisted URL - no login, no extension, not Windows thumbs.db files."
      answerFirst="YouTube (YT) Toolkit's Thumbnail Downloader extracts maximum-resolution cover images (maxresdefault, typically 1280x720 HD) directly from any public YouTube video URL in under 0.44 seconds without registration. Prefer Max when available, then fall back to SD/HQ sizes from the same CDN."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <ThumbnailDownloaderClient initialUrl={params.url} />
    </ToolPageShell>
  );
}
