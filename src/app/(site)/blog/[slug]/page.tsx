import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ContentPageShell } from '@/components/layout/content-page-shell';
import { blogPosts, getPostBySlug } from '@/content/blog/posts';
import { JsonLd } from '@/components/seo/json-ld';
import { site } from '@/content/site';
import { graphJsonLd, breadcrumbNode } from '@/lib/seo/schema-graph';

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
  const description =
    slug === 'youtube-thumbnail-dimensions-guide'
      ? 'Learn the recommended YouTube thumbnail size, dimensions, resolution, and 1280x720 canvas for clear video packaging.'
      : post.description;
  return {
    title: { absolute: `${post.title} | yttools.pro` },
    description,
    keywords:
      slug === 'youtube-thumbnail-dimensions-guide'
        ? [
            'youtube thumbnail size',
            'youtube thumbnail dimensions',
            'youtube thumbnail resolution',
            'youtube thumbnail 1280x720',
            'youtube thumbnail size pixels',
          ]
        : undefined,
    alternates: { canonical: `/blog/${post.slug}` },
    authors: [{ name: 'YT Toolkit Editorial Team', url: `${site.url}/about` }],
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.dateModified ?? post.publishedAt,
      authors: [`${site.url}/about`],
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: post.title }],
    },
    twitter: { card: 'summary_large_image', images: ['/opengraph-image'] },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const articleSchema = graphJsonLd([
    {
      '@type': 'BlogPosting',
      '@id': `${site.url}/blog/${post.slug}#article`,
      headline: post.title,
      description: post.description,
      datePublished: post.publishedAt,
      dateModified: post.dateModified ?? post.publishedAt,
      image: [`${site.url}/opengraph-image`],
      author: { '@id': `${site.url}/about#person` },
      publisher: {
        '@type': 'Organization',
        '@id': `${site.url}/#organization`,
        name: site.legalName,
        url: site.url,
        logo: { '@type': 'ImageObject', url: `${site.url}/icon` },
      },
      mainEntityOfPage: { '@type': 'WebPage', '@id': `${site.url}/blog/${post.slug}` },
      isPartOf: { '@id': `${site.url}/#website` },
    },
    { ...breadcrumbNode([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }, { name: post.title, path: `/blog/${post.slug}` }]), '@id': `${site.url}/blog/${post.slug}#breadcrumb` },
  ]);

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
        {slug === 'youtube-monetization-requirements-2027' && <MonetizationRequirements2027Article />}
        {slug === 'how-many-views-for-8000-watch-hours' && <EightThousandWatchHoursArticle />}
        {slug === '20-million-shorts-views-in-90-days' && <TwentyMillionShortsViewsArticle />}
        {slug === 'qualified-youtube-watch-hours-what-counts' && <QualifiedWatchHoursArticle />}
        {slug === 'youtube-monetization-current-vs-2027' && <CurrentVs2027Article />}
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
        <strong>Short answer:</strong> use a 1280x720 YouTube thumbnail at a 16:9 aspect ratio. This is the
        recommended full-size canvas for a video thumbnail; keep important text and faces away from the edges so
        mobile and compact previews can crop safely.
      </p>
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

function MonetizationRequirements2027Article() {
  return (
    <>
      <p>
        <strong>Short answer:</strong> from 1 February 2027, new applicants need 1,000 subscribers and
        either 8,000 qualified watch hours from public long-form videos in the last 365 days or 20
        million qualified public Shorts views in the last 90 days to enter YouTube&apos;s ads and Premium
        revenue tier.
      </p>
      <p>
        This is a future rule change, not a rumour. YouTube&apos;s announcement says the new entry
        thresholds apply to new creators from that date. A channel already in the YouTube Partner
        Program (YPP) does not lose its status because of this threshold update.
      </p>

      <h2>The 2027 YPP entry paths</h2>
      <table>
        <thead>
          <tr>
            <th scope="col">Requirement</th>
            <th scope="col">Long-form route</th>
            <th scope="col">Shorts route</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Subscribers</td>
            <td>1,000</td>
            <td>1,000</td>
          </tr>
          <tr>
            <td>Performance metric</td>
            <td>8,000 qualified watch hours</td>
            <td>20M qualified Shorts views</td>
          </tr>
          <tr>
            <td>Measurement window</td>
            <td>Last 365 days</td>
            <td>Last 90 days</td>
          </tr>
        </tbody>
      </table>
      <p>
        You choose one performance route, not both. Subscriber growth is still required whichever route
        you pursue. Passing a number also is not automatic approval: YouTube reviews channels against
        its program policies.
      </p>

      <h2>What is not changing</h2>
      <p>
        The earlier-access thresholds for fan funding, Creator Partnerships, and YouTube Shopping remain
        at 500 subscribers plus either 3,000 qualified watch hours in the last year or 3 million
        qualified Shorts views in 90 days. That milestone can be useful, but it is not the same thing as
        the ads and Premium entry tier.
      </p>
      <p>
        If your channel is already monetized, the action item is different: review and accept the updated
        terms in YouTube Studio by 31 January 2027 to keep earning from the affected monetization
        features. The threshold change itself does not remove an existing YPP channel.
      </p>

      <h2>Plan using the right number</h2>
      <p>
        Do not use an all-time view count as a proxy for YPP progress. The targets use moving windows, so
        open YouTube Studio&apos;s Earn area for the qualified values, then put those values into the{' '}
        <Link href="/youtube-monetization-progress-calculator">
          YouTube Monetization Progress Calculator
        </Link>
        . It shows your gap under the current rules and the rules that begin in February 2027.
      </p>
      <p>
        Long-form creators can also use the{' '}
        <Link href="/youtube-watch-time-calculator">Watch Time Calculator</Link> to model a realistic
        view-duration scenario. Shorts-first channels should work backward from the 90-day window: 20M
        views means a sustained pace, not one lucky upload.
      </p>
      <p>
        Related reading: <Link href="/blog/youtube-monetization-current-vs-2027">current vs 2027 YPP
        requirements</Link> and <Link href="/blog/qualified-youtube-watch-hours-what-counts">what counts
        as a qualified watch hour</Link>.
      </p>

      <h2>Official source and update date</h2>
      <p>
        Last verified 18 September 2026 against YouTube&apos;s{' '}
        <a
          href="https://support.google.com/youtube/answer/12843009?hl=en"
          target="_blank"
          rel="noopener noreferrer"
        >
          YPP change announcement
        </a>
        . YouTube&apos;s policies and availability can change, so treat Studio&apos;s Earn tab as the final
        eligibility view for your channel.
      </p>
    </>
  );
}

function EightThousandWatchHoursArticle() {
  return (
    <>
      <p>
        <strong>Short answer:</strong> the number of views needed for 8,000 watch hours depends on your
        average view duration. At a four-minute average, it is about 120,000 views. At eight minutes,
        about 60,000. At twelve minutes, about 40,000.
      </p>
      <p>
        8,000 qualified watch hours is the long-form YPP entry target announced for new applicants from
        1 February 2027. It is measured over the last 365 days and sits alongside the 1,000-subscriber
        requirement. It is not an all-time channel target.
      </p>

      <h2>The simple 8,000-hour views formula</h2>
      <p>
        Start by converting hours to minutes: 8,000 x 60 = 480,000 watch minutes. Then divide by your
        average view duration in minutes.
      </p>
      <p>
        <strong>Estimated views = 480,000 divided by average view duration in minutes.</strong>
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Average view duration</th>
            <th scope="col">Estimated views for 8,000 hours</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2 minutes</td>
            <td>240,000 views</td>
          </tr>
          <tr>
            <td>4 minutes</td>
            <td>120,000 views</td>
          </tr>
          <tr>
            <td>6 minutes</td>
            <td>80,000 views</td>
          </tr>
          <tr>
            <td>8 minutes</td>
            <td>60,000 views</td>
          </tr>
          <tr>
            <td>10 minutes</td>
            <td>48,000 views</td>
          </tr>
          <tr>
            <td>15 minutes</td>
            <td>32,000 views</td>
          </tr>
        </tbody>
      </table>
      <p>
        This is a planning estimate, not an eligibility counter. Views on different videos can have very
        different average durations, and YouTube counts qualified watch hours rather than your own manual
        estimate.
      </p>

      <h2>Use qualified watch hours, not a convenient total</h2>
      <p>
        The metric is specifically qualified watch hours from public long-form videos. YouTube&apos;s Help
        Centre says private, unlisted, deleted, ad-campaign, and Shorts watch time does not count toward
        this route; unlisted, deleted, or non-VOD live streams are also excluded. Open the Earn section
        in YouTube Studio when deciding what progress to enter in a plan.
      </p>

      <h2>Turn the total into a publishing target</h2>
      <ol>
        <li>Check your current qualified watch hours in YouTube Studio.</li>
        <li>Subtract that value from 8,000.</li>
        <li>Use the average view duration from comparable long-form videos.</li>
        <li>Divide the remaining views across the time left in your 365-day window.</li>
      </ol>
      <p>
        Enter your current hours, subscribers, and expected upload performance into the{' '}
        <Link href="/youtube-monetization-progress-calculator">
          Monetization Progress Calculator
        </Link>{' '}
        for a live gap and pace. For a single-video scenario, use the{' '}
        <Link href="/youtube-watch-time-calculator">YouTube Watch Time Calculator</Link>.
      </p>
      <p>
        Related reading: <Link href="/blog/qualified-youtube-watch-hours-what-counts">what counts as a
        qualified watch hour</Link> and <Link href="/blog/youtube-monetization-requirements-2027">the
        complete 2027 monetization requirements</Link>.
      </p>

      <h2>Official basis for the 8,000-hour number</h2>
      <p>
        YouTube says new creators will need 8,000 qualified watch hours in the last 365 days, or 20M
        qualified Shorts views in 90 days, from 1 February 2027. Read the primary source:{' '}
        <a
          href="https://support.google.com/youtube/answer/12843009?hl=en"
          target="_blank"
          rel="noopener noreferrer"
        >
          Changes to the YouTube Partner Program
        </a>
        .
      </p>
    </>
  );
}

function TwentyMillionShortsViewsArticle() {
  return (
    <>
      <p>
        <strong>Short answer:</strong> 20 million qualified YouTube Shorts views in 90 days is roughly
        222,223 views per day, 1.56 million per week, or 6.67 million per 30 days. New applicants from
        1 February 2027 need that route or 8,000 qualified watch hours, plus 1,000 subscribers, for YPP
        ads and Premium entry.
      </p>
      <p>
        The key word is <em>qualified</em>. Do not build a plan from a public all-time channel view count.
        YouTube Studio&apos;s Earn area is where to check your channel&apos;s eligibility progress.
      </p>

      <h2>Break 20M into a 90-day operating target</h2>
      <table>
        <thead>
          <tr>
            <th scope="col">Time period</th>
            <th scope="col">Views needed</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>90 days</td>
            <td>20,000,000</td>
          </tr>
          <tr>
            <td>30 days (average)</td>
            <td>6,666,667</td>
          </tr>
          <tr>
            <td>7 days (average)</td>
            <td>1,555,556</td>
          </tr>
          <tr>
            <td>1 day (average)</td>
            <td>222,223</td>
          </tr>
        </tbody>
      </table>
      <p>
        These are average paces, not a promise that YouTube will distribute views evenly. A spike can help
        within the rolling 90-day window, but a plan that depends on one viral video has no margin for a
        normal slowdown.
      </p>

      <h2>Entry threshold versus monthly Shorts earnings</h2>
      <p>
        These are two different figures in the 2027 update. The 20M figure is the entry threshold for a
        new creator using the Shorts route. Once in YPP, YouTube says a creator needs to maintain 10M
        qualified Shorts views over the last 90 days to earn each month from the Shorts Creator Pool. If
        that monthly performance threshold is missed, YouTube says the channel is not removed from YPP and
        other earnings are not affected.
      </p>

      <h2>Make the plan measurable</h2>
      <ol>
        <li>Record your qualified Shorts-view number from the Earn tab, not only Analytics views.</li>
        <li>Set a daily and weekly target using the remaining gap rather than starting from zero.</li>
        <li>Track subscriber growth alongside views: the 1,000-subscriber requirement remains.</li>
        <li>Use long-form content too if it creates a more realistic path to 8,000 qualified hours.</li>
      </ol>
      <p>
        Put your current figures into the{' '}
        <Link href="/youtube-monetization-progress-calculator">
          Monetization Progress Calculator
        </Link>{' '}
        to compare the Shorts and long-form routes. If you are estimating revenue rather than eligibility,
        the{' '}
        <Link href="/youtube-shorts-earnings-calculator">Shorts Earnings Calculator</Link> is a separate
        planning tool.
      </p>
      <p>
        Related reading: <Link href="/blog/youtube-monetization-requirements-2027">all 2027 YPP
        requirements</Link> and <Link href="/blog/youtube-monetization-current-vs-2027">the current vs
        2027 comparison</Link>.
      </p>

      <p>
        Source, verified 18 September 2026:{' '}
        <a
          href="https://support.google.com/youtube/answer/12843009?hl=en"
          target="_blank"
          rel="noopener noreferrer"
        >
          YouTube&apos;s YPP update
        </a>
        .
      </p>
    </>
  );
}

function QualifiedWatchHoursArticle() {
  return (
    <>
      <p>
        <strong>Short answer:</strong> qualified YouTube watch hours are watch hours from public
        long-form videos that meet YouTube&apos;s eligibility rules. They are not simply the largest watch-time
        number you can find in Analytics, and Shorts-feed watch hours do not count toward the long-form
        YPP route.
      </p>
      <p>
        For the current full YPP entry route, YouTube shows 4,000 qualified watch hours in the last 365
        days. For new applicants from 1 February 2027, YouTube has announced an 8,000-hour target using
        the same qualified-long-form concept.
      </p>

      <h2>What YouTube says counts</h2>
      <p>
        YouTube&apos;s eligibility help specifies qualified watch hours gained from long-form videos set to
        public. This is why the Earn tab should win whenever it differs from an estimate based on total
        channel watch time.
      </p>
      <h2>What does not count toward the watch-hour route</h2>
      <ul>
        <li>Private, unlisted, or deleted videos</li>
        <li>Watch time generated through ad campaigns</li>
        <li>YouTube Shorts watch time</li>
        <li>Live streams that are unlisted, deleted, or not converted to video on demand</li>
      </ul>
      <p>
        Shorts can still be a valid YPP path through qualified Shorts views. It is a separate measurement:
        you cannot turn Shorts-feed watch hours into the long-form watch-hour total.
      </p>

      <h2>Why your number changes</h2>
      <p>
        The long-form threshold looks back across a rolling 365-day period. As older watch time moves out
        of that period, the qualified total can fall even if your channel&apos;s all-time watch time only goes
        up. That is normal for a rolling eligibility window.
      </p>

      <h2>A clean monthly check-in</h2>
      <ol>
        <li>Open YouTube Studio, then the Earn area.</li>
        <li>Record subscribers and qualified watch hours on the same date.</li>
        <li>Separate long-form watch-hour work from your Shorts-view strategy.</li>
        <li>Use the gap to decide whether the long-form or Shorts route is more achievable.</li>
      </ol>
      <p>
        The{' '}
        <Link href="/youtube-monetization-progress-calculator">
          Monetization Progress Calculator
        </Link>{' '}
        lets you log both routes and see the current 4,000-hour threshold alongside the 8,000-hour 2027
        threshold. For a per-video forecast, try the{' '}
        <Link href="/youtube-watch-time-calculator">Watch Time Calculator</Link>.
      </p>
      <p>
        Related reading: <Link href="/blog/how-many-views-for-8000-watch-hours">how many views 8,000
        hours may require</Link> and <Link href="/blog/youtube-monetization-requirements-2027">the full
        2027 requirements guide</Link>.
      </p>

      <h2>Official definition</h2>
      <p>
        Read YouTube&apos;s primary eligibility guidance:{' '}
        <a
          href="https://support.google.com/youtube/answer/72851?hl=en-GB"
          target="_blank"
          rel="noopener noreferrer"
        >
          YouTube Partner Programme overview and eligibility
        </a>
        . Last verified 18 September 2026; YouTube Studio remains the authoritative view for an individual
        channel.
      </p>
    </>
  );
}

function CurrentVs2027Article() {
  return (
    <>
      <p>
        <strong>Short answer:</strong> until 31 January 2027, the current full YPP route is 1,000
        subscribers plus either 4,000 qualified watch hours in 365 days or 10M qualified Shorts views in
        90 days. For new applicants from 1 February 2027, those two performance thresholds become 8,000
        hours and 20M Shorts views.
      </p>
      <p>
        The subscriber threshold remains 1,000. Existing YPP channels keep their status under the update;
        this comparison is mainly for people who will apply after the new date.
      </p>

      <h2>Current rules versus the announced 2027 rules</h2>
      <table>
        <thead>
          <tr>
            <th scope="col">Requirement</th>
            <th scope="col">Current full YPP entry</th>
            <th scope="col">New applicants from 1 Feb 2027</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Subscribers</td>
            <td>1,000</td>
            <td>1,000</td>
          </tr>
          <tr>
            <td>Long-form route</td>
            <td>4,000 qualified hours / 365 days</td>
            <td>8,000 qualified hours / 365 days</td>
          </tr>
          <tr>
            <td>Shorts route</td>
            <td>10M qualified views / 90 days</td>
            <td>20M qualified views / 90 days</td>
          </tr>
          <tr>
            <td>Existing YPP channels</td>
            <td>Already in YPP</td>
            <td>Status not impacted by the threshold update</td>
          </tr>
        </tbody>
      </table>

      <h2>The earlier 500-subscriber tier is separate</h2>
      <p>
        YouTube says the earlier-access criteria for fan funding, Creator Partnerships, and Shopping do
        not change: 500 subscribers, three public uploads in the last 90 days, and either 3,000 qualified
        watch hours in the last year or 3M qualified Shorts views in 90 days. Do not label this milestone
        as full ad-revenue eligibility; it unlocks a different set of features.
      </p>

      <h2>Which target should you plan around?</h2>
      <p>
        Use the date you expect to apply. A creator who can meet the current target and apply before the
        cutoff should check Studio now. A creator whose strategy is aimed at 2027 should plan against the
        higher number so their content calendar has a realistic buffer. Either way, use qualified metrics
        from the Earn tab, not all-time totals.
      </p>
      <p>
        Start with the{' '}
        <Link href="/youtube-monetization-progress-calculator">
          Monetization Progress Calculator
        </Link>{' '}
        to compare your channel against both rule sets. Then use the{' '}
        <Link href="/youtube-subscriber-growth-calculator">Subscriber Growth Calculator</Link> if the
        1,000-subscriber milestone is your bottleneck.
      </p>
      <p>
        Related reading: <Link href="/blog/youtube-monetization-requirements-2027">the full 2027 YPP
        requirements</Link> and <Link href="/blog/20-million-shorts-views-in-90-days">how the 20M Shorts
        target breaks down by day</Link>.
      </p>

      <h2>Sources</h2>
      <p>
        The current thresholds appear in YouTube&apos;s{' '}
        <a
          href="https://support.google.com/youtube/answer/72857?hl=en"
          target="_blank"
          rel="noopener noreferrer"
        >
          monetization requirements
        </a>
        ; the future thresholds and existing-channel treatment appear in its{' '}
        <a
          href="https://support.google.com/youtube/answer/12843009?hl=en"
          target="_blank"
          rel="noopener noreferrer"
        >
          YPP change announcement
        </a>
        . Last verified 18 September 2026.
      </p>
    </>
  );
}
