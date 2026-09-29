import Link from 'next/link';

export function ReadingYouTubeCommentSentimentArticle() {
  return (
    <>
      <p>
        <strong>Short answer:</strong> read a sentiment result as a quick summary of the comments that were analyzed,
        not a poll of every viewer. Our analyzer uses up to 40 readable top-level comments returned in YouTube’s
        relevance order; the result is not random, and replies are excluded.
      </p>

      <h2>What each part of the result means</h2>
      <ul>
        <li><strong>Positive / negative:</strong> the text expresses a clear favorable or unfavorable view.</li>
        <li><strong>Neutral:</strong> a question or statement without a clear positive or negative opinion.</li>
        <li><strong>Mixed:</strong> the same comment contains clear positive and negative views.</li>
        <li><strong>Unclear:</strong> there is too little context or no interpretable opinion.</li>
        <li><strong>Themes:</strong> short topic phrases assigned per comment and grouped into sample counts; a low count means few analyzed comments received that label.</li>
      </ul>
      <p>
        The percentages use the analyzed comment count as their denominator. For example, if a 40-comment sample
        contains 18 positive, 8 negative, 8 neutral, 4 mixed, and 2 unclear comments, the displayed shares are 45%,
        20%, 20%, 10%, and 5%. That describes those 40 comments only.
      </p>

      <h2>Why the sample is not an audience poll</h2>
      <p>
        The input is capped at 40 top-level comments returned in YouTube relevance order. That order is not a random
        selection of everyone who watched. People who never commented are absent, replies are not included, and
        comments outside the returned sample do not affect the score. A percentage therefore cannot be read as
        “45% of viewers liked the video.” It means “45% of this analyzed comment sample was labeled positive.”
      </p>
      <p>
        The model also selects one representative comment per label from the sample, favoring the comment with the
        most likes in that label. This is an example to inspect, not the typical comment or proof that the theme is
        widespread. Theme counts count model-assigned comments, not unique people or all comments on the video.
      </p>

      <h2>Use the result as a reading queue</h2>
      <ol>
        <li><strong>Check the sample count and fetch time.</strong> A smaller sample gives a thinner basis for a pattern.</li>
        <li><strong>Read the representative comments.</strong> Check whether the model’s label fits the actual wording.</li>
        <li><strong>Look at the original comments.</strong> Sarcasm, irony, short replies, emojis and code-switching can change the meaning.</li>
        <li><strong>Validate important themes.</strong> Search a larger loaded set with the <Link href="/youtube-comment-exporter">Comment Exporter</Link> before changing a video or product based on one summary.</li>
      </ol>
      <p>
        The classifier is AI-assisted and has not been independently benchmarked for English, Hindi or Hinglish.
        Treat a language nuance as uncertain until you read the original text. The tool shows an empty state rather
        than inventing a percentage when no readable public comments are returned.
      </p>

      <h2>Turn a pattern into a useful next step</h2>
      <p>
        A repeated question may suggest a clearer explanation in the next video; a complaint may point to a mismatch
        between a title promise and the content. Those are hypotheses to verify, not instructions from the model.
        Keep the original comment and your own context beside any decision. Use the{' '}
        <Link href="/youtube-comment-sentiment-analyzer">Comment Sentiment Analyzer</Link> for a fast first pass,
        then use the <Link href="/youtube-video-ideas-generator">Video Ideas Generator</Link> to develop a validated
        audience question into a topic.
      </p>
    </>
  );
}
