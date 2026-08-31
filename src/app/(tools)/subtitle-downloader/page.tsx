import type { Metadata } from 'next';
import { SubtitleDownloaderClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/subtitle-downloader';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube Subtitle Downloader — SRT, VTT, TXT (Free) | yttools.pro',
  },
  description:
    'Download YouTube subtitles as SRT, VTT, or plain TXT. Paste a video URL to export captions with timestamps. Free, no login, works with auto-generated captions.',
  keywords: [
    'youtube subtitle downloader',
    'download srt from youtube',
    'youtube vtt download',
    'youtube caption downloader',
  ],
  alternates: { canonical: '/subtitle-downloader' },
  openGraph: {
    title: 'YouTube Subtitle Downloader — SRT, VTT, TXT (Free) | yttools.pro',
    description:
      'Download YouTube subtitles as SRT, VTT, or plain TXT with timestamps. Free, no login.',
  },
};

export default async function SubtitleDownloaderPage({
  searchParams,
}: {
  searchParams: Promise<{ url?: string }>;
}) {
  const params = await searchParams;
  return (
    <ToolPageShell
      toolName="Subtitle Downloader"
      toolDescription="Download YouTube subtitles as SRT, VTT, or plain TXT with timestamps."
      toolSlug="subtitle-downloader"
      title="YouTube Subtitle Downloader"
      description="Download the captions from any public YouTube video as an SRT, VTT, or plain-text file. Paste a video URL to export subtitles with timestamps for editing, translation, or repurposing."
      answerFirst="Paste a YouTube video URL and this free tool exports its captions as SRT, VTT, or plain TXT with timestamps. Works with auto-generated and uploaded captions. No login — download subtitle files ready for editors and translation."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <SubtitleDownloaderClient initialUrl={params.url} />
    </ToolPageShell>
  );
}
