import type { Metadata } from 'next';
import Link from 'next/link';
import { ContentPageShell } from '@/components/layout/content-page-shell';
import { blogPosts } from '@/content/blog/posts';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube Creator Guides & Blog | yttools.pro',
  },
  description:
    'Educational guides on YouTube Video SEO Tags, thumbnail dimensions (HD maxresdefault), and converting YouTube Video Transcript & Subtitles into blog posts.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'YouTube Creator Guides & Blog | yttools.pro',
    description:
      'Guides on YouTube tags, thumbnails, and transcripts for creators — free toolkit companion content.',
  },
};

export default function BlogIndexPage() {
  return (
    <ContentPageShell
      breadcrumbLabel="Blog"
      title="Creator guides"
      description="Practical SEO and packaging guides for YouTube creators — tags, thumbnails, and transcripts."
      wide
    >
      <ul className="not-prose space-y-6 list-none p-0 m-0">
        {blogPosts.map((post) => (
          <li key={post.slug} className="border-b border-border/60 pb-6 last:border-0">
            <p className="text-xs text-muted-foreground mb-2 tabular-nums">
              {post.publishedAt} · {post.readingMinutes} min read
            </p>
            <Link
              href={`/blog/${post.slug}`}
              className="text-display text-lg font-semibold text-foreground hover:text-primary transition-colors"
            >
              {post.title}
            </Link>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{post.description}</p>
          </li>
        ))}
      </ul>
    </ContentPageShell>
  );
}
