import Link from 'next/link';

export function TranscriptFormatsArticle() {
  return (
    <>
      <p>
        <strong>Choose by what happens next.</strong> If you want to read or annotate a lecture,
        download TXT. If you need captions in a video editor, start with SRT. If you are adding a
        timed text track to an HTML video, use VTT. Each file may contain the same words, but the
        timing syntax and intended use differ.
      </p>
      <table>
        <thead>
          <tr><th scope="col">Format</th><th scope="col">Contains timing?</th><th scope="col">Good for</th></tr>
        </thead>
        <tbody>
          <tr><td>TXT</td><td>Optional in our export</td><td>Reading, notes, searching, drafting</td></tr>
          <tr><td>SRT</td><td>Yes, with comma milliseconds</td><td>Simple caption files and editing workflows</td></tr>
          <tr><td>VTT</td><td>Yes, with dot milliseconds</td><td>Web video text tracks and captions</td></tr>
        </tbody>
      </table>

      <h2>TXT: text first</h2>
      <p>
        A plain <code>.txt</code> transcript is easiest to read in a notes app. Without timestamps,
        it becomes flowing text. With timestamps, our export puts a marker beside each caption
        segment so you can return to the video. TXT is not a ready-to-play subtitle file: a video
        player needs structured start and end times for each cue.
      </p>
      <pre><code>{`[0:04] Today we'll test the first method.
[0:08] Start by checking the source.`}</code></pre>

      <h2>SRT: numbered caption cues</h2>
      <p>
        An <code>.srt</code> file has a cue number, a start and end time separated by an arrow, the
        caption text, then a blank line. Its milliseconds use a comma. The Library of Congress
        describes this basic SubRip structure, and YouTube accepts basic UTF-8 SRT files for caption
        uploads. SRT is a useful default when an editor or upload form specifically asks for it.
      </p>
      <pre><code>{`1
00:00:04,000 --> 00:00:07,500
Today we'll test the first method.`}</code></pre>

      <h2>VTT: timed text for the web</h2>
      <p>
        A <code>.vtt</code> file starts with <code>WEBVTT</code>. Its cue timing uses a dot before
        milliseconds. WebVTT is the format used by HTML <code>&lt;track&gt;</code> elements for
        captions, subtitles, and other timed text. The format can support extra cue settings, though
        our basic export contains only cue times and spoken text.
      </p>
      <pre><code>{`WEBVTT

00:00:04.000 --> 00:00:07.500
Today we'll test the first method.`}</code></pre>

      <h2>How to export the right one</h2>
      <ol>
        <li>Paste a captioned video URL into the <Link href="/transcript-extractor">Transcript Extractor</Link>.</li>
        <li>Choose the available caption language you need.</li>
        <li>Select TXT for notes, SRT for a basic caption workflow, or VTT for a web text track.</li>
        <li>Open the file and proofread names, numbers, line breaks, and cue timing before using it.</li>
      </ol>
      <p>
        Our tool also offers JSON with video ID, language, and segment start/end/duration values in
        seconds. That structured export is useful for software or data workflows, but it is not a
        direct replacement for an SRT or VTT caption file.
      </p>

      <h2>Can you rename a TXT file to SRT?</h2>
      <p>
        No. Changing the extension does not create cue numbers or start/end times. Likewise,
        changing <code>.srt</code> to <code>.vtt</code> does not add the WebVTT header or change
        comma milliseconds to dots. Export the format you need or convert the cue structure
        explicitly. If you only need to find and copy spoken words, start with the{' '}
        <Link href="/blog/how-to-get-youtube-transcript">YouTube-to-text guide</Link>.
      </p>

      <h2>Sources</h2>
      <p>
        Format details checked 28 September 2026: the{' '}
        <a href="https://www.loc.gov/preservation/digital/formats/fdd/fdd000569.shtml" target="_blank" rel="noopener noreferrer">Library of Congress SRT format description</a>,{' '}
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API/Web_Video_Text_Tracks_Format" target="_blank" rel="noopener noreferrer">MDN WebVTT reference</a>, and{' '}
        <a href="https://support.google.com/youtube/answer/2734698?hl=en-GB" target="_blank" rel="noopener noreferrer">YouTube supported caption files</a>.
      </p>
    </>
  );
}
