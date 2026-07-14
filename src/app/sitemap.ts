import type { MetadataRoute } from 'next';
import { tools } from '@/content/tools-metadata';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://yttoolkit.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const toolPages = tools.map((tool) => ({
    url: `${BASE_URL}${tool.route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  const staticPages = [
    { url: `${BASE_URL}/`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1.0 },
  ];

  return [...staticPages, ...toolPages];
}
