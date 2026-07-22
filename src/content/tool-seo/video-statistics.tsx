import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'What metrics does the YouTube video statistics tool show?',
    a: 'For public videos it typically shows view count, like count, comment count, publish date, duration, category, thumbnail, title, channel name, and tags when YouTube exposes them. It does not show private Studio metrics such as impressions, CTR, or audience retention.',
  },
  {
    q: 'Can I see statistics for private or unlisted videos?',
    a: 'Private videos are not available through public lookups. Unlisted videos may be reachable if you have the exact URL, but many third-party tools only reliably return data for fully public videos. Always assume private content stays invisible without ownership access.',
  },
  {
    q: 'Why are likes or comments missing on some videos?',
    a: 'Creators can disable likes display or turn off comments. When those controls are off, public APIs may return zero, omit the field, or show limited engagement data even though the video still has views.',
  },
  {
    q: 'Are video tags always included in the statistics result?',
    a: 'No. Tags are optional metadata. Many videos have no public tags, and YouTube does not always surface tags the same way in every interface. If tags are unavailable, the statistics view still returns core metrics like views and publish date.',
  },
  {
    q: 'How is this different from YouTube Analytics in Studio?',
    a: 'Studio Analytics is private to the uploader and includes impressions, traffic sources, retention graphs, revenue, and end-screen clicks. This tool only aggregates publicly visible video statistics that anyone can see without logging in as the owner.',
  },
  {
    q: 'What URL formats work for video statistics?',
    a: 'Standard watch URLs (youtube.com/watch?v=…), short links (youtu.be/…), and Shorts URLs usually work when the video is public. The tool extracts the video ID and fetches the public snippet and statistics for that ID.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>What is a YouTube video statistics lookup?</h2>
      <p>
        This free YouTube Video Statistics Analyzer shows public views, likes, comments, duration, and
        publish date for any public video—not private Studio CTR or retention. Paste a URL to pull
        structured stats typically in under 2 seconds.
      </p>
      <p>
        That public layer is enough for competitive breakdowns, thumbnail studies, and “why did this upload work?”
        reviews. It is not YouTube Studio. Studio holds impression volume, click-through rate, average percentage
        viewed, and revenue. Those remain owner-only. Confusing the two leads people to expect retention curves from
        a public URL paste, which no legitimate public tool can provide.
      </p>
      <p>
        Used correctly, video-level stats answer concrete questions: How many views did this title and thumbnail
        earn in its first window of life? What is the like-to-view ratio as a rough satisfaction signal? How long is
        the video, and does length correlate with performance in this niche? When were competing uploads published
        relative to yours?
      </p>

      <h2>How to view statistics for any YouTube video</h2>
      <ol>
        <li>
          <strong>Copy a public video URL</strong> — Use the address bar on youtube.com/watch, a youtu.be short
          link, or a Shorts URL. Confirm the video plays without a login wall.
        </li>
        <li>
          <strong>Paste and analyze</strong> — Drop the URL into the field above. The tool extracts the 11-character
          video ID and requests public snippet and statistics data.
        </li>
        <li>
          <strong>Read engagement together</strong> — Views alone mislead. Compare likes and comments against views.
          A video with 100,000 views and almost no comments behaves differently from one with dense discussion.
        </li>
        <li>
          <strong>Note publish date and duration</strong> — Fresh uploads with strong early views differ from
          evergreen videos that accumulate slowly. Duration helps you compare like-for-like within a niche (for
          example 8–12 minute tutorials versus 60-second Shorts).
        </li>
        <li>
          <strong>Capture packaging clues</strong> — Title, thumbnail, category, and any available tags are the
          public packaging layer. Save them when you are building a swipe file of winners in your topic.
        </li>
      </ol>

      <h2>Features included in this video statistics tool</h2>
      <ul>
        <li>
          <strong>View count</strong> — Public play count for the video at the time of the lookup.
        </li>
        <li>
          <strong>Likes and comments</strong> — Engagement totals when the creator has not disabled those surfaces.
        </li>
        <li>
          <strong>Publish date</strong> — Upload timestamp for aging and “velocity” comparisons.
        </li>
        <li>
          <strong>Duration</strong> — Length of the video, useful when normalizing performance across formats.
        </li>
        <li>
          <strong>Category</strong> — YouTube category assigned to the upload (for example Education or Gaming).
        </li>
        <li>
          <strong>Thumbnail preview</strong> — The default public thumbnail image associated with the video.
        </li>
        <li>
          <strong>Channel context</strong> — Channel title and identity so you can jump from one video to the
          broader channel footprint.
        </li>
        <li>
          <strong>Tags when available</strong> — Public tag strings if YouTube exposes them for that video; many
          uploads simply have none.
        </li>
      </ul>

      <h2>Why video-level public stats matter for creators</h2>
      <p>
        Titles and thumbnails compete in the same impression auctions as your own uploads. Looking up a competitor
        video’s public stats tells you whether a packaging pattern actually earned distribution—not just whether it
        looks clever in a screenshot. A thumbnail style that appears everywhere but consistently sits under 10,000
        views in your niche is inspiration theater, not evidence.
      </p>
      <p>
        Ratios help more than raw totals. Likes ÷ views is a blunt satisfaction proxy; comments ÷ views hints at
        conversation density. Neither replaces retention data, but both are directionally useful when Studio access
        is impossible. Publish date lets you estimate velocity: 50,000 views in three days is a different outcome
        than 50,000 views over three years.
      </p>
      <p>
        For freelancers pitching clients, a short table of comparable videos—URL, views, publish date, duration—beats
        vague claims about “what works on YouTube.” For your own channel, auditing older uploads shows which topics
        still earn search or suggested traffic long after publish day.
      </p>

      <h3>Public stats versus private Studio metrics</h3>
      <p>
        Public: views, likes, comments, duration, publish time, category, visible description, and sometimes tags.
        Private: impressions, CTR, unique viewers, average view duration, traffic sources, revenue, memberships, and
        end screen clicks. If a decision needs CTR or retention, you need Studio (or an authorized API connection).
        If the decision is “is this competitor video actually big?” public statistics are enough.
      </p>

      <h2>Tips and mistakes when reading video statistics</h2>
      <ul>
        <li>
          <strong>Do not compare Shorts to long-form on raw views alone.</strong> Formats have different discovery
          surfaces and typical lengths; normalize by format first.
        </li>
        <li>
          <strong>Watch for disabled engagement.</strong> Zero likes can mean hidden counts, not a hated video.
        </li>
        <li>
          <strong>Missing tags are normal.</strong> Absence of tags does not mean the video ranks poorly; YouTube has
          de-emphasized tags for years relative to title, thumbnail, and audience behavior.
        </li>
        <li>
          <strong>Sample more than one winner.</strong> Three to five peer videos beat a single viral outlier when
          you are choosing a title pattern or hook style.
        </li>
        <li>
          <strong>Follow the channel when scale matters.</strong> Use{' '}
          <Link href="/channel-statistics">channel statistics</Link> to see whether a breakout video sits on a large
          audience or punched above a small subscriber base.
        </li>
        <li>
          <strong>Save the thumbnail separately when needed.</strong> For design reference, pair this lookup with the{' '}
          <Link href="/thumbnail-downloader">thumbnail downloader</Link> to grab the original image file.
        </li>
      </ul>

      <h2>Related tools</h2>
      <p>
        Expand from one video to channel context with{' '}
        <Link href="/channel-statistics">Channel Statistics</Link>, pull tag lists with the{' '}
        <Link href="/tags-extractor">Tags Extractor</Link>, or download the artwork via the{' '}
        <Link href="/thumbnail-downloader">Thumbnail Downloader</Link>.
      </p>
    </>
  );
}
