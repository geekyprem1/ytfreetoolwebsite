import type { Metadata } from 'next';
import { ScriptGeneratorClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/youtube-script-generator';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube Script Generator — AI (Free) | yttools.pro',
  },
  description:
    'Generate a full YouTube video script with AI. Choose a topic, length, and tone to get a hook, intro, body sections, and a call-to-action. Free, no login.',
  keywords: [
    'youtube script generator',
    'ai youtube script',
    'video script writer',
    'youtube script template',
  ],
  alternates: { canonical: '/youtube-script-generator' },
  openGraph: {
    title: 'YouTube Script Generator — AI (Free) | yttools.pro',
    description:
      'Generate a full YouTube video script with AI — hook, intro, body, and CTA. Free, no login.',
  },
};

export default function ScriptGeneratorPage() {
  return (
    <ToolPageShell
      toolName="Script Generator"
      toolDescription="Generate a full YouTube video script with AI."
      toolSlug="youtube-script-generator"
      title="YouTube Script Generator"
      description="Turn a topic into a ready-to-film YouTube script. Pick a target length and tone, and AI writes a strong hook, an intro, structured body sections, and a closing call-to-action you can edit and record."
      answerFirst="Enter a topic, target length, and tone, and this free AI tool writes a complete YouTube script — starting with a 3-5 second hook, then intro, body sections, and a call-to-action. Edit and record. No login."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <ScriptGeneratorClient />
    </ToolPageShell>
  );
}
