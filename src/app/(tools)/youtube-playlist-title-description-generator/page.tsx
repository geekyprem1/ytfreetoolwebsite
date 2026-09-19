import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { PlaylistGeneratorClient } from './client';
import { SeoContent, faqs } from '@/content/tool-seo/youtube-playlist-title-description-generator';

export const metadata: Metadata = {
  title: { absolute: 'YouTube Playlist Title & Description Generator | yttools.pro' },
  description:
    'Generate YouTube playlist title and description ideas for a topic, audience, and keyword. Check character counts and exact keyword coverage, then copy or download your options.',
  keywords: [
    'youtube playlist title and description generator',
    'youtube playlist description generator free',
    'seo description for youtube playlist',
    'youtube playlist name ideas generator',
  ],
  alternates: { canonical: '/youtube-playlist-title-description-generator' },
  openGraph: {
    title: 'YouTube Playlist Title & Description Generator | yttools.pro',
    description: 'Generate and compare playlist title and description pairs with transparent keyword coverage checks.',
  },
};

export default function PlaylistGeneratorPage() {
  return (
    <ToolPageShell
      toolName="Playlist Title & Description Generator"
      toolDescription="Generate clear YouTube playlist titles and descriptions with AI."
      toolSlug="youtube-playlist-title-description-generator"
      title="YouTube Playlist Title & Description Generator"
      description="Create multiple playlist name and description options for your topic, audience, and keyword. See character counts and exact keyword coverage before you copy or download the final draft."
      answerFirst="This free generator creates several YouTube playlist title and description pairs, then checks the exact keyword occurrences locally so you can choose a clear, honest option without invented ranking or search-volume claims."
      seo={<SeoContent />}
      faqs={faqs}
      howToSteps={[
        { name: 'Describe the playlist', text: 'Enter the topic, audience, optional keyword, and video themes.' },
        { name: 'Choose the style', text: 'Select a tone, language, and number of playlist options.' },
        { name: 'Review keyword coverage', text: 'Compare title and description character counts and exact keyword occurrences.' },
        { name: 'Copy the final draft', text: 'Copy one option or download all options as a TXT file, then verify the claims before publishing.' },
      ]}
    >
      <PlaylistGeneratorClient />
    </ToolPageShell>
  );
}
