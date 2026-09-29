import Link from 'next/link';

export function CommentExportTroubleshootingArticle() {
  return (
    <>
      <p>
        <strong>Short answer:</strong> the Comment Exporter searches only the top-level comments it loaded for one
        video—up to 2,000 per lookup. If results look incomplete, check the URL, comment availability, the sample-cap
        notice, and whether you expected replies to be included.
      </p>

      <h2>Start with a video URL, not a channel URL</h2>
      <p>
        The exporter needs one video at a time. Paste a regular watch link, a <code>youtu.be</code> link, or a Shorts
        link. A channel home page or playlist does not identify which comment section to load. If the video itself
        is private, deleted, or otherwise unavailable to a public lookup, the tool cannot fetch its comments.
      </p>

      <h2>Read the result count before searching</h2>
      <p>
        The result reports how many top-level comments were loaded. Search checks comment text and author names
        inside that loaded array; it does not query YouTube again for each search term. The current exporter caps a
        lookup at 2,000 comments and displays them in the relevance order returned by YouTube. When the cap notice
        appears, a phrase that is only in an unreturned comment cannot match.
      </p>
      <p>
        The preview is shorter than the export: it shows at most 300 matching rows to keep the page manageable.
        CSV and JSON downloads include all matches in the loaded sample after the current text filter and sort.
        Searching does not include nested replies.
      </p>

      <h2>Use this troubleshooting sequence</h2>
      <ol>
        <li><strong>Check the exact video.</strong> Open the pasted URL in YouTube and confirm it is the intended video.</li>
        <li><strong>Check whether comments are available.</strong> A creator can turn comments off or pause new comments. Public tools cannot read private or held-for-review comments.</li>
        <li><strong>Separate “no matches” from “no comments.”</strong> Clear the search field first. If comments load but your search is empty, the term may not occur in the loaded text or author names.</li>
        <li><strong>Check the cap notice.</strong> A capped result is a bounded sample, not a complete archive. Try a narrower workflow or download the available sample for offline review.</li>
        <li><strong>Use the right sort.</strong> Likes, newest and oldest reorder loaded results; sorting does not fetch additional comments.</li>
      </ol>

      <p>
        YouTube’s comment settings let the creator turn comments on, pause them, or turn them off; moderation can
        also hold comments so they are not publicly visible. The Data API’s <code>commentThreads.list</code> request
        returns at most 100 threads per page, which is why a capped export is assembled from multiple pages rather
        than a single unbounded request. See{' '}
        <a href="https://support.google.com/youtube/answer/9483359?hl=en" target="_blank" rel="noopener noreferrer">YouTube comment settings</a>{' '}
        and the <a href="https://developers.google.com/youtube/v3/docs/commentThreads/list" target="_blank" rel="noopener noreferrer">commentThreads.list reference</a>.
      </p>

      <h2>When to use the sentiment tool</h2>
      <p>
        If the question is “which comments mention this feature?”, use text search in the{' '}
        <Link href="/youtube-comment-exporter">Comment Exporter</Link>. If you want a quick tone-and-theme summary,
        the <Link href="/youtube-comment-sentiment-analyzer">Comment Sentiment Analyzer</Link> classifies up to 40
        relevance-ordered top-level comments. That smaller sample is useful for triage, not a vote from every viewer.
        Read the <Link href="/blog/reading-youtube-comment-sentiment">sentiment interpretation guide</Link> before
        treating its percentages as a broader audience measure.
      </p>
    </>
  );
}
