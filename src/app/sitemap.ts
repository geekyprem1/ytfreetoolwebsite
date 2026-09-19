import type { MetadataRoute } from 'next';
import { tools } from '@/content/tools-metadata';
import { blogPosts } from '@/content/blog/posts';
import { site } from '@/content/site';
import { geoPages } from '@/content/geo-pages';

export default function sitemap(): MetadataRoute.Sitemap {
  const toolPages = tools.map((tool) => ({
    url: `${site.url}${tool.route}`,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
    ...(tool.lastModified ? { lastModified: tool.lastModified } : {}),
  }));

  const geo: MetadataRoute.Sitemap = geoPages().map((p) => ({
    url: `${site.url}${p.path}`,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
    ...(p.lastModified ? { lastModified: p.lastModified } : {}),
  }));

  const blogIndex = {
    url: `${site.url}/blog`,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  };

  const blogPages = blogPosts.map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
    lastModified: post.publishedAt,
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

  return [...staticPages, blogIndex, ...blogPages, ...toolPages, ...geo];
}
