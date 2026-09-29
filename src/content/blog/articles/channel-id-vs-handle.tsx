import Link from 'next/link';

export function ChannelIdVsHandleArticle() {
  return (
    <>
      <p>
        <strong>Short answer:</strong> use a channel’s <code>@handle</code> when you want people to find it; use the
        YouTube channel ID when a script, API request, or tool asks for the channel’s system identifier. A display
        name is for presentation and may not uniquely identify a channel.
      </p>

      <h2>Three values that look similar but do different jobs</h2>
      <table>
        <thead><tr><th scope="col">Value</th><th scope="col">Example shape</th><th scope="col">Best use</th></tr></thead>
        <tbody>
          <tr><td>Display name</td><td>“Example Studio”</td><td>Show the channel name to a person; names can be duplicated.</td></tr>
          <tr><td>Handle</td><td><code>@exampleStudio</code></td><td>Readable channel search and sharing link.</td></tr>
          <tr><td>Channel ID</td><td><code>UC…</code></td><td>Pass an exact channel identifier to a data tool or API.</td></tr>
        </tbody>
      </table>
      <p>
        YouTube treats the handle as a public, human-facing identifier and reserves the right to change, reclaim,
        or remove one. The Data API exposes a channel <code>id</code> and lets a client look up a handle with
        <code>forHandle</code>. If a workflow needs the channel ID, resolve the handle and store the ID returned by
        YouTube instead of guessing from the channel name.
      </p>

      <h2>Find the ID from the link you already have</h2>
      <ol>
        <li><strong>Copy the channel reference.</strong> It may be an <code>@handle</code>, a <code>/channel/UC…</code> URL, or a legacy <code>/c/</code> or <code>/user/</code> path.</li>
        <li><strong>Resolve it once.</strong> Paste the full URL or handle into the <Link href="/channel-id-finder">Channel ID Finder</Link>.</li>
        <li><strong>Use the returned ID where required.</strong> For example, the <Link href="/channel-statistics">Channel Statistics</Link> tool accepts channel links or handles, while API requests can use the channel ID directly.</li>
      </ol>
      <p>
        In the official Data API, <code>channels.list</code> supports <code>forHandle</code> for handle-based lookup
        and <code>id</code> for channel-ID lookup. A display name is not a substitute for either parameter. See the{' '}
        <a href="https://developers.google.com/youtube/v3/docs/channels/list" target="_blank" rel="noopener noreferrer">channels.list parameters</a>{' '}
        and <a href="https://support.google.com/youtube/answer/11585688?hl=en" target="_blank" rel="noopener noreferrer">YouTube’s handle guidance</a>.
      </p>

      <h2>Choose the reference for the job</h2>
      <ul>
        <li><strong>Sharing with viewers:</strong> use the channel’s current handle URL; it is easier to read and remember.</li>
        <li><strong>Joining records across tools:</strong> use the channel ID returned by YouTube so a display-name change does not break a name-based match.</li>
        <li><strong>Building an API request:</strong> follow that endpoint’s documented identifier parameter. Some requests accept a handle; others require an ID.</li>
      </ul>
      <p>
        Keep both values with a record when useful: the channel ID for matching and the current handle for display.
        If a handle link stops resolving, run it through the finder again rather than trying to infer an ID from the
        text after <code>@</code>.
      </p>
    </>
  );
}
