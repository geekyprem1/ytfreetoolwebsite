import type { Metadata } from 'next';
import { DescriptionGeneratorClient } from './client';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { SeoContent, faqs } from '@/content/tool-seo/description-generator';
import { toolOgImages } from '@/lib/seo/tool-og';

export const metadata: Metadata = {
  title: {
    absolute: 'Free AI YouTube Description Generator | yttools.pro',
  },
  description:
    'Generate a free AI YouTube description for videos, chapters, hashtags, and CTAs. Enter a topic, keyword, and summary for a Studio-ready plain-text draft—no login.',
  keywords: [
    'youtube description generator',
    'free youtube description generator',
    'ai youtube description generator',
    'youtube description generator ai',
    'ai description generator for youtube',
    'short description generator',
  ],
  alternates: { canonical: '/description-generator' },
  openGraph: {
    title: 'Free AI YouTube Description Generator | yttools.pro',
    description:
      'Generate a free AI YouTube description with chapters, hashtags, and CTAs from a topic, keyword, and summary. Copy a Studio-ready draft with no login.',
    images: toolOgImages('ai-generator', 'Free AI YouTube Description Generator'),
  },
};

export default function DescriptionGeneratorPage() {
  return (
    <ToolPageShell
      toolName="AI Description Generator"
      toolDescription="Generate complete video descriptions with chapters, hashtags, and CTAs using AI."
      toolSlug="description-generator"
      title="Free AI YouTube Description Generator"
      description="Create a free AI YouTube description with summary, chapters, hashtags, and CTAs—not a product listing blurb. Paste a topic and keyword to get a Studio-ready plain-text draft in seconds."
      answerFirst="YouTube (YT) Toolkit's Description Generator drafts SEO-ready YouTube descriptions with summary, chapters, hashtags, and CTAs from a topic and keyword. Free and no login - copy a Studio-ready plain-text draft in seconds."
      seo={<SeoContent />}
      faqs={faqs}
      howToSteps={[
        { name: 'Enter the video topic and keyword', text: 'Describe the video and add the primary phrase viewers should understand it for.' },
        { name: 'Add a short summary', text: 'List the key outcomes, sections, links, or products covered in the final video.' },
        { name: 'Choose tone and sections', text: 'Select a tone and enable only the chapters, hashtags, and CTA blocks you will verify.' },
        { name: 'Generate, edit, and copy', text: 'Review the plain-text draft, replace placeholders, correct timestamps, and paste it into YouTube Studio.' },
      ]}
    >
      <DescriptionGeneratorClient />
    </ToolPageShell>
  );
}
