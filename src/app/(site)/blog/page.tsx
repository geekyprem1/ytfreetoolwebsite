import type { Metadata } from 'next';
import Link from 'next/link';
import { ContentPageShell } from '@/components/layout/content-page-shell';
import { blogPosts } from '@/content/blog/posts';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube Creator Guides & Blog | yttools.pro',
  },
  description:
    'Practical guides on YouTube SEO, keyword research, thumbnails, transcripts, and creator workflows, with links to official YouTube guidance.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'YouTube Creator Guides & Blog | yttools.pro',
    description:
      'Guides on YouTube SEO, keyword research, thumbnails, and transcripts for creators.',
  },
};

export default function BlogIndexPage() {
  return (
    <ContentPageShell
      breadcrumbLabel="Blog"
      title="Creator guides"
      description="Practical guides for YouTube creators — from topic research and video packaging to transcripts and channel planning."
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
