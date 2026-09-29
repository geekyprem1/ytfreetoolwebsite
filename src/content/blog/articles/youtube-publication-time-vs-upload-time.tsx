import Link from 'next/link';

export function YouTubePublicationTimeArticle() {
  return (
    <>
      <p>
        <strong>Short answer:</strong> YouTube’s public video field <code>snippet.publishedAt</code> is a publication
        timestamp, not a guaranteed record of the first time the creator uploaded the file. If a video was uploaded
        privately and made public later, YouTube says the field can show when it became public.
      </p>

      <h2>What the timestamp tells you</h2>
      <p>
        Public video metadata includes a date and time in ISO 8601 format, such as{' '}
        <code>2026-09-25T16:30:00Z</code>. The trailing <code>Z</code> means the timestamp is expressed in UTC. The
        same instant is 22:00 in India Standard Time (UTC+05:30). A time-zone conversion changes its display, not
        the underlying moment.
      </p>
      <p>
        For a public lookup, read this value as when the video was published for public viewing. YouTube documents
        special cases: a private video later made public can report its public release time; owner-authorized
        metadata for a private video can report the upload time; and an unlisted video’s field reports its upload
        time. A public stats lookup does not expose a full upload and visibility history.
      </p>
      <p>
        The official <code>videos</code> resource defines <code>snippet.publishedAt</code> as the date and time the
        video was published and explicitly says it can differ from upload time. Read the{' '}
        <a href="https://developers.google.com/youtube/v3/docs/videos" target="_blank" rel="noopener noreferrer">YouTube Data API Videos reference</a>{' '}
        before using the field as a historical upload date.
      </p>

      <h2>Why the distinction matters in a competitor review</h2>
      <p>
        Suppose two public videos have the same view count today, but one became public yesterday and the other has
        been public for a year. Their current totals describe different exposure windows. Use the public publication
        timestamp when you calculate “days since release” or compare early public performance. Do not claim that the
        date proves when the creator first uploaded or began preparing the video.
      </p>
      <p>
        A private draft can exist before public release. Public video metadata does not let an outside researcher
        reconstruct that private period. If you own the channel and need internal production or upload history, use
        the records available in YouTube Studio rather than inferring it from a public lookup.
      </p>

      <h2>Read local time and keep the exact value</h2>
      <p>
        The <Link href="/video-statistics">Video Statistics</Link> tool shows the returned timestamp in your local
        timezone and UTC, alongside the raw ISO value. Copy the ISO value when you put it in a spreadsheet so another
        person can convert it without guessing your timezone. The JSON export preserves that same raw timestamp.
      </p>
      <p>
        Do not mix local calendar dates and UTC dates in the same comparison table without labeling them. A release
        near midnight can fall on different calendar dates in different timezones even though both values represent
        the same moment. For channel context, <Link href="/channel-statistics">Channel Statistics</Link> also shows
        the channel’s creation date and dates for recent uploads.
      </p>
    </>
  );
}
