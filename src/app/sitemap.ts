import type { MetadataRoute } from 'next';
import { tools } from '@/content/tools-metadata';
import { site } from '@/content/site';

/** Stable content revision date for sitemap freshness (update when content ships). */
const CONTENT_UPDATED = new Date('2026-07-15');

export default function sitemap(): MetadataRoute.Sitemap {
  const toolPages = tools.map((tool) => ({
    url: `${site.url}${tool.route}`,
    lastModified: CONTENT_UPDATED,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, lastModified: CONTENT_UPDATED, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${site.url}/about`, lastModified: CONTENT_UPDATED, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${site.url}/contact`, lastModified: CONTENT_UPDATED, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${site.url}/privacy`, lastModified: CONTENT_UPDATED, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${site.url}/terms`, lastModified: CONTENT_UPDATED, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${site.url}/docs`, lastModified: CONTENT_UPDATED, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${site.url}/changelog`, lastModified: CONTENT_UPDATED, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${site.url}/roadmap`, lastModified: CONTENT_UPDATED, changeFrequency: 'monthly', priority: 0.4 },
  ];

  return [...staticPages, ...toolPages];
}
