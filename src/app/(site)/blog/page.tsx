import type { Metadata } from 'next';
import Link from 'next/link';
import { ContentPageShell } from '@/components/layout/content-page-shell';
import { blogCategories, blogPosts } from '@/content/blog/posts';

export const metadata: Metadata = {
  title: {
    absolute: 'YouTube Creator Guides & Blog | yttools.pro',
  },
  description:
    'Practical YouTube creator guides on SEO, transcripts, comments, channel data, publication times, and income planning, with links to official YouTube guidance.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'YouTube Creator Guides & Blog | yttools.pro',
    description:
      'Guides on YouTube SEO, transcripts, comments, channel data, publication times, and income planning.',
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
      <nav aria-label="Guide topics" className="not-prose mb-10 flex flex-wrap gap-2">
        {blogCategories.filter((category) => blogPosts.some((post) => post.category === category)).map((category) => (
          <a
            key={category}
            href={`#${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
            className="rounded-full border border-border px-3 py-1.5 text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
          >
            {category}
          </a>
        ))}
      </nav>

      <div className="not-prose space-y-12">
        {blogCategories.map((category) => {
          const posts = blogPosts.filter((post) => post.category === category);
          if (posts.length === 0) return null;
          const id = category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
          return (
            <section id={id} key={category} aria-labelledby={`${id}-heading`} className="scroll-mt-24">
              <div className="mb-5 flex items-baseline justify-between border-b border-border pb-3">
                <h2 id={`${id}-heading`} className="text-display text-xl font-semibold">{category}</h2>
                <span className="font-mono text-xs text-muted-foreground">{posts.length} guides</span>
              </div>
              <ul className="m-0 list-none space-y-6 p-0">
                {posts.map((post) => (
                  <li key={post.slug} className="border-b border-border/60 pb-6 last:border-0">
                    <p className="mb-2 text-xs text-muted-foreground tabular-nums">
                      <time dateTime={post.publishedAt}>{post.publishedAt}</time> · {post.readingMinutes} min read
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-display text-lg font-semibold text-foreground hover:text-primary transition-colors"
                    >
                      {post.title}
                    </Link>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.description}</p>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </ContentPageShell>
  );
}
