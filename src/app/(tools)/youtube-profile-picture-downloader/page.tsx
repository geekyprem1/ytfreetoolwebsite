import type { Metadata } from 'next';
import { ProfilePictureDownloaderClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/youtube-profile-picture-downloader';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube Profile Picture Downloader (Free) | yttools.pro',
  },
  description:
    'Download any YouTube channel profile picture (avatar / logo) in full resolution. Paste a channel URL or @handle and save the PFP. Free, no login, HD quality.',
  keywords: [
    'youtube profile picture downloader',
    'download youtube channel logo',
    'youtube pfp download',
    'youtube avatar downloader',
  ],
  alternates: { canonical: '/youtube-profile-picture-downloader' },
  openGraph: {
    title: 'YouTube Profile Picture Downloader (Free) | yttools.pro',
    description:
      'Download any YouTube channel profile picture (avatar) in full resolution. Paste a URL or @handle. Free, no login.',
  },
};

export default async function ProfilePictureDownloaderPage({
  searchParams,
}: {
  searchParams: Promise<{ url?: string }>;
}) {
  const params = await searchParams;
  return (
    <ToolPageShell
      toolName="Profile Picture Downloader"
      toolDescription="Download any YouTube channel profile picture in full resolution."
      toolSlug="youtube-profile-picture-downloader"
      title="YouTube Profile Picture Downloader"
      description="Grab any YouTube channel's profile picture (avatar) in full resolution. Paste a channel URL or @handle to preview and download the image — useful for research, fan edits, and press kits."
      answerFirst="Paste a YouTube channel URL or @handle and this free tool fetches the channel's profile picture (avatar) in the highest resolution YouTube provides, ready to download. No login. Use images in line with the creator's rights."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <ProfilePictureDownloaderClient initialUrl={params.url} />
    </ToolPageShell>
  );
}
