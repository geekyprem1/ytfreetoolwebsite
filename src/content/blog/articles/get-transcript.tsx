import Link from 'next/link';

export function GetTranscriptArticle() {
  return (
    <>
      <p>
        <strong>The fastest route is inside the video.</strong> Open a captioned YouTube video,
        expand its description, and select <strong>Show transcript</strong>. You can read along or
        select a line to jump to that moment. If you need a file for notes, subtitles, or research,
        use the export steps below.
      </p>
      <p>
        A YouTube transcript is the spoken text from a caption track. It is useful for searching a
        lecture, checking a quote, or finding where a tutorial explains a step. It is not guaranteed
        to be a perfect record: automatic captions can mishear names, jargon, numbers, and speakers.
      </p>

      <h2>Option 1: read the transcript on YouTube</h2>
      <ol>
        <li>Open the video on YouTube and check that captions are available.</li>
        <li>Expand the description beneath the video and choose <strong>Show transcript</strong>.</li>
        <li>Read the lines beside the video; select a line to jump to its time.</li>
        <li>Use the transcript to locate the section you need, then check it against the audio.</li>
      </ol>
      <p>
        YouTube documents this view for videos with captions. The control’s position may vary by
        device and interface. If it is absent, first confirm the video has a caption track.
      </p>

      <h2>Option 2: turn a YouTube video into a text file</h2>
      <ol>
        <li>Copy the public video or Shorts URL.</li>
        <li>Paste it into our <Link href="/transcript-extractor">Transcript Extractor</Link>.</li>
        <li>Choose a caption language if the video offers more than one.</li>
        <li>Switch timestamps on if you need to return to exact moments.</li>
        <li>Copy the text or download TXT, SRT, VTT, or JSON.</li>
      </ol>
      <p>
        Choose TXT for reading or notes. Choose SRT or VTT when another app needs timed caption
        cues. The export comes from the available caption text; it does not transcribe a video that
        lacks captions. The tool also shows word count and estimated reading time, which can help
        when you are reviewing a long lecture or interview.
      </p>

      <h2>Keep timestamps or remove them?</h2>
      <p>
        With timestamps, each segment has a time such as <code>[4:18]</code>. Keep those markers
        when you need to cite a moment, check a quote, or create a video outline. Turn them off when
        you want flowing text to annotate. Our TXT export adds paragraph breaks after longer pauses,
        but you should still edit the text before publishing it as prose.
      </p>
      <p>
        For a study workflow, write a short summary in your own words and keep two or three times
        that lead back to the explanation. The <Link href="/for-students">student guide</Link> shows
        how to combine transcript, summary, and review timestamps.
      </p>

      <h2>What if the transcript is unavailable?</h2>
      <p>
        A transcript requires captions. Some videos have manually uploaded captions, some have
        automatic captions, and some have none. YouTube says automatic captions are not always
        available, and speech recognition can be affected by audio quality or language support.
        If the video has no caption track, this extractor cannot produce its spoken text. Try a
        different captioned video or ask the uploader for a transcript.
      </p>
      <p>
        If several languages appear, select the track that matches the speech or your reading
        needs. A language menu only shows tracks the video offers. Check any translation or
        automatically generated text against the video before quoting it.
      </p>

      <h2>Use the text for the right job</h2>
      <p>
        A transcript makes it easier to find facts, build notes, and outline a video. It does not
        give you ownership of someone else’s words. When quoting another creator, attribute the
        source and check the exact wording and context in the video. To turn your own captions into
        a readable article, follow our{' '}
        <Link href="/blog/youtube-transcript-to-blog-post">transcript-to-blog workflow</Link>.
        If you need a caption file, see{' '}
        <Link href="/blog/srt-vs-vtt-vs-txt">SRT vs VTT vs TXT</Link> before downloading.
      </p>

      <h2>Official sources</h2>
      <p>
        Checked 28 September 2026: YouTube’s{' '}
        <a href="https://support.google.com/youtube/answer/15930243?hl=en" target="_blank" rel="noopener noreferrer">view transcripts guide</a>{' '}
        and <a href="https://support.google.com/youtube/answer/6373554?hl=en" target="_blank" rel="noopener noreferrer">automatic captioning guide</a>.
      </p>
    </>
  );
}
