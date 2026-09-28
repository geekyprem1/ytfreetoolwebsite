import type { Metadata } from 'next';
import { ChannelAgeCheckerClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/youtube-channel-age-checker';

const title = 'YouTube Channel Age Checker — Find Channel Creation Date | yttools.pro';
const description =
  'Check how old any YouTube channel is. Paste a channel URL or @handle to see the exact creation date, age in years, months and days, and lifetime uploads per year. Free, no login.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    'youtube channel age checker',
    'youtube channel creation date',
    'how old is a youtube channel',
    'when was youtube channel created',
    'youtube channel joined date',
  ],
  alternates: { canonical: '/youtube-channel-age-checker' },
  openGraph: { title, description },
};

export default async function ChannelAgeCheckerPage({
  searchParams,
}: {
  searchParams: Promise<{ url?: string }>;
}) {
  const params = await searchParams;
  return (
    <ToolPageShell
      toolName="Channel Age Checker"
      toolDescription="Find when any YouTube channel was created and exactly how old it is."
      toolSlug="youtube-channel-age-checker"
      title="YouTube Channel Age Checker"
      description="Paste any channel URL, @handle or channel ID to see the date the channel was created, its exact age in years, months and days, and lifetime averages like videos per year."
      answerFirst="YouTube (YT) Toolkit's Channel Age Checker shows the exact date any YouTube channel was created — the same “Joined” date on the channel’s About page — plus its age in years, months and days. Paste a URL or @handle; it is free and needs no login."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <ChannelAgeCheckerClient initialUrl={params.url} />
    </ToolPageShell>
  );
}
