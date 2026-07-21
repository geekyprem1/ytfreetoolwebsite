import type { MetadataRoute } from 'next';
import { tools } from '@/content/tools-metadata';
import { site } from '@/content/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const toolPages = tools.map((tool) => ({
    url: `${site.url}${tool.route}`,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${site.url}/about`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${site.url}/contact`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${site.url}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${site.url}/terms`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${site.url}/docs`, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${site.url}/changelog`, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${site.url}/roadmap`, changeFrequency: 'monthly', priority: 0.4 },
  ];

  return [...staticPages, ...toolPages];
}
