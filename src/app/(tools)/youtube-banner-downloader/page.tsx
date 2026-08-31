import type { Metadata } from 'next';
import { BannerDownloaderClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/youtube-banner-downloader';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube Banner Downloader (Free) | yttools.pro',
  },
  description:
    'Download any YouTube channel banner (channel art) in full resolution. Paste a channel URL or @handle. Includes the official 2048×1152 banner size guide. Free, no login.',
  keywords: [
    'youtube banner downloader',
    'download youtube channel art',
    'youtube banner size',
    'youtube channel banner download',
  ],
  alternates: { canonical: '/youtube-banner-downloader' },
  openGraph: {
    title: 'YouTube Banner Downloader (Free) | yttools.pro',
    description:
      'Download any YouTube channel banner (channel art) in full resolution. Paste a URL or @handle. Free, no login.',
  },
};

export default async function BannerDownloaderPage({
  searchParams,
}: {
  searchParams: Promise<{ url?: string }>;
}) {
  const params = await searchParams;
  return (
    <ToolPageShell
      toolName="Banner Downloader"
      toolDescription="Download any YouTube channel banner (channel art) in full resolution."
      toolSlug="youtube-banner-downloader"
      title="YouTube Banner Downloader"
      description="Download any YouTube channel's banner (channel art) in full resolution. Paste a channel URL or @handle to preview and save the header image, and check the official banner size requirements."
      answerFirst="Paste a YouTube channel URL or @handle and this free tool fetches the channel banner (channel art) in full resolution, ready to download. YouTube banners are 2048×1152 px minimum with a 1235×338 safe area. No login."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <BannerDownloaderClient initialUrl={params.url} />
    </ToolPageShell>
  );
}
