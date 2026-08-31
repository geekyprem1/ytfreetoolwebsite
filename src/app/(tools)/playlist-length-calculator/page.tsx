import type { Metadata } from 'next';
import { PlaylistLengthCalculatorClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/playlist-length-calculator';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube Playlist Length Calculator (Free) | yttools.pro',
  },
  description:
    'Calculate the total length of any YouTube playlist: total duration, video count, average length, and watch time at 1.25x, 1.5x, 1.75x, and 2x speed. Free, no login.',
  keywords: [
    'youtube playlist length',
    'playlist duration calculator',
    'how long is this playlist',
    'youtube playlist time calculator',
  ],
  alternates: { canonical: '/playlist-length-calculator' },
  openGraph: {
    title: 'YouTube Playlist Length Calculator (Free) | yttools.pro',
    description:
      'Total duration, video count, average length, and watch time at 1.25x–2x speed for any YouTube playlist. Free, no login.',
  },
};

export default async function PlaylistLengthCalculatorPage({
  searchParams,
}: {
  searchParams: Promise<{ url?: string }>;
}) {
  const params = await searchParams;
  return (
    <ToolPageShell
      toolName="Playlist Length Calculator"
      toolDescription="Calculate the total duration of any YouTube playlist, plus watch time at faster speeds."
      toolSlug="playlist-length-calculator"
      title="YouTube Playlist Length Calculator"
      description="Find out exactly how long a YouTube playlist is. Paste the playlist URL to see total duration, video count, average length, and adjusted watch time at 1.25x, 1.5x, 1.75x, and 2x playback speed."
      answerFirst="Paste a YouTube playlist URL and this free tool adds up the runtime of every video to show total duration, video count, and average length, plus watch time at 1.25x, 1.5x, 1.75x, and 2x speed. No login."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <PlaylistLengthCalculatorClient initialUrl={params.url} />
    </ToolPageShell>
  );
}
