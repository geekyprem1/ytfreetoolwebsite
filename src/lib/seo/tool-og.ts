import type { ToolCategory } from '@/content/tools-metadata';

const categoryLabels: Record<ToolCategory, string> = {
  calculator: 'YouTube calculators',
  seo: 'YouTube SEO tools',
  'ai-generator': 'AI creator tools',
  downloader: 'YouTube downloaders',
  extractor: 'YouTube extractors',
  analytics: 'YouTube analytics tools',
};

export function toolOgImages(category: ToolCategory, alt: string) {
  return [{ url: `/og/tool/${category}`, width: 1200, height: 630, alt: `${alt} — ${categoryLabels[category]}` }];
}
