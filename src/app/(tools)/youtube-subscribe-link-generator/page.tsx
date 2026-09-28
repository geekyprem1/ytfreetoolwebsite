import type { Metadata } from 'next';
import { SubscribeLinkGeneratorClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/youtube-subscribe-link-generator';

const title = 'YouTube Subscribe Link Generator (sub_confirmation=1) | yttools.pro';
const description =
  'Create a YouTube subscribe link that opens a “Subscribe?” prompt for signed-in viewers. Paste your channel URL or @handle and copy the link, HTML or Markdown. Free, runs in your browser.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    'youtube subscribe link generator',
    'youtube subscribe link',
    'sub_confirmation=1',
    'auto subscribe link youtube',
    'youtube subscribe button link',
  ],
  alternates: { canonical: '/youtube-subscribe-link-generator' },
  openGraph: { title, description },
};

export default function SubscribeLinkGeneratorPage() {
  return (
    <ToolPageShell
      toolName="Subscribe Link Generator"
      toolDescription="Create a YouTube link that prompts visitors to subscribe to your channel."
      toolSlug="youtube-subscribe-link-generator"
      title="YouTube Subscribe Link Generator"
      description="Turn your channel URL or @handle into a subscribe link. When a signed-in viewer opens it, YouTube shows a confirmation asking them to subscribe — useful for bios, websites, emails and descriptions."
      answerFirst="A YouTube subscribe link is your channel URL with ?sub_confirmation=1 added, for example youtube.com/@yourhandle?sub_confirmation=1. When a signed-in viewer opens it, YouTube asks them to confirm the subscription. This free tool builds the link, plus HTML and Markdown snippets, in your browser."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <SubscribeLinkGeneratorClient />
    </ToolPageShell>
  );
}
