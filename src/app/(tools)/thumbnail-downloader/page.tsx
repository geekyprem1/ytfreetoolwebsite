import type { Metadata } from 'next';
import { ThumbnailDownloaderClient } from './client';
import { ToolPageSchema } from '@/components/tools/tool-page-schema';

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
    <ToolPageSchema
      toolName="Thumbnail Downloader"
      toolDescription="Download YouTube thumbnails in HD, SD, HQ quality. Free and no login required."
      toolSlug="thumbnail-downloader"
    >
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          Free YouTube <span className="text-red-500">Thumbnail Downloader</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Download thumbnails from any YouTube video in HD quality. No login, no signup, completely free.
        </p>
      </div>

      <ThumbnailDownloaderClient initialUrl={params.url} />

      <article className="mt-16 prose prose-neutral dark:prose-invert max-w-none">
        <h2>How to Download YouTube Thumbnails</h2>
        <ol>
          <li>
            <strong>Copy the YouTube video URL</strong> — Go to any YouTube video and copy its URL from the address bar.
          </li>
          <li>
            <strong>Paste it above</strong> — Paste the URL in the input box and click Analyze.
          </li>
          <li>
            <strong>Choose your quality</strong> — Select from Max, HD, SD, HQ, or MQ resolution thumbnails.
          </li>
          <li>
            <strong>Download</strong> — Click the Download button to save the thumbnail to your device.
          </li>
        </ol>

        <h2>Features</h2>
        <ul>
          <li>📸 <strong>5 Quality Options</strong> — Max (1280×720), HD, SD, HQ, and MQ resolutions</li>
          <li>⚡ <strong>Instant Preview</strong> — See the thumbnail instantly before downloading</li>
          <li>🔓 <strong>No Login Required</strong> — Use the tool without creating any account</li>
          <li>📱 <strong>Mobile Friendly</strong> — Works perfectly on all devices</li>
          <li>🎯 <strong>Any YouTube Video</strong> — Works with regular videos, Shorts, and embeds</li>
        </ul>

        <h2>Why Use Our Thumbnail Downloader?</h2>
        <p>
          YouTube thumbnails are the first thing viewers see. Whether you&apos;re analyzing competitor thumbnails,
          gathering inspiration, or creating content about other videos, our tool makes it effortless. Unlike
          screenshot-based methods, you get the original high-resolution image directly from YouTube&apos;s servers.
        </p>
        <p>
          Many thumbnail downloaders require signup, bombard you with ads, or only offer one quality. We give
          you all five quality variants with a single click — completely free and with no signup required.
        </p>

        <h2>Tips for Using Thumbnails</h2>
        <ul>
          <li>Use <strong>Max quality</strong> for presentations, blogs, or printing</li>
          <li>Use <strong>HQ quality</strong> for social media shares and quick previews</li>
          <li>Study top-performing thumbnails in your niche for design inspiration</li>
          <li>Check if your own thumbnails are rendering correctly across all qualities</li>
        </ul>
      </article>
    </ToolPageSchema>
  );
}
