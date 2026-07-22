import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ContentPageShell } from '@/components/layout/content-page-shell';
import { blogPosts, getPostBySlug } from '@/content/blog/posts';
import { JsonLd } from '@/components/seo/json-ld';
import { site } from '@/content/site';

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: { absolute: `${post.title} | yttools.pro` },
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedAt,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    author: { '@type': 'Organization', name: site.legalName, url: site.url },
    publisher: { '@type': 'Organization', name: site.legalName, url: site.url },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <ContentPageShell
        breadcrumbLabel="Blog"
        title={post.title}
        description={`${post.publishedAt} · ${post.readingMinutes} min read`}
      >
        <p>
          <Link href="/blog">← All guides</Link>
        </p>
        {slug === 'youtube-tag-ranking-2026' && <TagRankingArticle />}
        {slug === 'youtube-thumbnail-dimensions-guide' && <ThumbnailGuideArticle />}
        {slug === 'youtube-transcript-to-blog-post' && <TranscriptBlogArticle />}
      </ContentPageShell>
    </>
  );
}

function TagRankingArticle() {
  return (
    <>
      <p>
        YouTube Video SEO Tags are metadata keywords on a video — not HTML tags and not RFID tracking
        tags. In 2026 they are a lighter ranking signal than title, thumbnail, and viewer satisfaction,
        but they still help YouTube disambiguate synonyms, brand names, and secondary topics.
      </p>
      <h2>SEO discovery vs AI recommendations</h2>
      <p>
        Classic SEO thinking treated tags like keyword stuffing fields. Modern YouTube ranking blends
        search matches with recommendation systems that watch session time, click-through, and topical
        coherence. Tags support the &ldquo;what is this about&rdquo; graph; they rarely overcome a weak
        title or a low CTR thumbnail on their own.
      </p>
      <h2>The 500-character budget</h2>
      <p>
        YouTube enforces roughly <strong>500 characters total across all tags</strong>. Aim for about
        15–30 relevant YouTube Video SEO Tags. Prefer a mix of brand, topic, and intent phrases instead
        of repeating the same stem ten times.
      </p>
      <h2>Practical workflow</h2>
      <ol>
        <li>
          Extract competitor tags with the free{' '}
          <Link href="/tags-extractor">YouTube Tags Extractor</Link> (no extension required).
        </li>
        <li>Keep only tags that truthfully describe your video.</li>
        <li>
          Cross-check spoken keywords via the{' '}
          <Link href="/transcript-extractor">Transcript Extractor</Link>.
        </li>
        <li>
          Grade packaging with the <Link href="/seo-score-checker">SEO Score Checker</Link>.
        </li>
      </ol>
      <p>
        For official video resource fields, see the{' '}
        <a
          href="https://developers.google.com/youtube/v3/docs/videos"
          target="_blank"
          rel="noopener noreferrer"
        >
          YouTube Data API v3 Videos documentation
        </a>
        .
      </p>
    </>
  );
}

function ThumbnailGuideArticle() {
  return (
    <>
      <p>
        A YouTube Video Thumbnail Downloader (HD maxresdefault) targets the cover image YouTube hosts on
        its CDN — not Windows <code>thumbs.db</code> system files. Use these exact public sizes when
        researching competitors or verifying your own upload.
      </p>
      <h2>Standard CDN dimensions</h2>
      <ul>
        <li>
          <code>maxresdefault.jpg</code> — 1280×720 (when available)
        </li>
        <li>
          <code>sddefault.jpg</code> — 640×480
        </li>
        <li>
          <code>hqdefault.jpg</code> — 480×360
        </li>
        <li>
          <code>mqdefault.jpg</code> — 320×180
        </li>
        <li>
          <code>default.jpg</code> — 120×90
        </li>
      </ul>
      <h2>Packaging principles</h2>
      <p>
        YouTube Creator Academy guidance emphasizes clear faces, high contrast, and readable text.
        Design for mobile crop: important elements near the center survive better than edge text.
        Prefer Max (1280×720) for audits; fall back to HQ when maxres was never generated.
      </p>
      <p>
        Download originals with the{' '}
        <Link href="/thumbnail-downloader">Thumbnail Downloader</Link>. CDN paths are documented in the{' '}
        <a
          href="https://developers.google.com/youtube/v3/docs/thumbnails"
          target="_blank"
          rel="noopener noreferrer"
        >
          YouTube Data API v3 Thumbnails docs
        </a>
        .
      </p>
      <h2>Legal note</h2>
      <p>
        Limited research use may implicate fair use under{' '}
        <a
          href="https://www.law.cornell.edu/uscode/text/17/107"
          target="_blank"
          rel="noopener noreferrer"
        >
          17 U.S. Code § 107
        </a>
        . Do not republish someone else’s exact artwork as your own cover.
      </p>
    </>
  );
}

function TranscriptBlogArticle() {
  return (
    <>
      <p>
        A YouTube Video Transcript &amp; Subtitles extract is caption text from the player — not a
        college transcript. With timestamps, you can convert a long video into a blog outline without
        scrubbing the timeline for an hour.
      </p>
      <h2>Step-by-step</h2>
      <ol>
        <li>Confirm the video has captions (auto or manual).</li>
        <li>
          Paste the URL into the{' '}
          <Link href="/transcript-extractor">Transcript Extractor</Link>.
        </li>
        <li>Download a text file with timestamps.</li>
        <li>Cluster segments into H2 sections; rewrite for readers (do not paste raw ASR).</li>
        <li>
          Draft chapters with the <Link href="/timestamp-generator">Timestamp Generator</Link> when you
          also update the YouTube description.
        </li>
      </ol>
      <h2>From captions to article structure</h2>
      <p>
        Use the first 30–60 seconds for the lede (the promise). Group mid-video explanations into
        how-to steps. Pull closing CTAs into a short conclusion. Proofread names and numbers —
        automatic captions often mangle brands and statistics.
      </p>
      <p>
        Caption resources:{' '}
        <a
          href="https://developers.google.com/youtube/v3/docs/captions"
          target="_blank"
          rel="noopener noreferrer"
        >
          YouTube Data API v3 Captions
        </a>
        . Respect copyright when publishing derived articles.
      </p>
    </>
  );
}
