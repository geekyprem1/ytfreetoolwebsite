import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { CommentSentimentAnalyzerClient } from './client';
import { SeoContent, faqs } from '@/content/tool-seo/youtube-comment-sentiment-analyzer';

const title = 'YouTube Comment Sentiment Analyzer (Free) | yttools.pro';
const description = 'Analyze a bounded sample of YouTube comments for sentiment and recurring themes. See positive, negative, mixed, neutral, and unclear reactions. Free, no login.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    'youtube comment sentiment analyzer',
    'youtube comment sentiment analysis',
    'analyze youtube comments',
    'youtube audience feedback analyzer',
  ],
  alternates: { canonical: '/youtube-comment-sentiment-analyzer' },
  openGraph: { title, description, type: 'website' },
};

export default async function CommentSentimentAnalyzerPage({
  searchParams,
}: {
  searchParams: Promise<{ url?: string }>;
}) {
  const params = await searchParams;
  return (
    <ToolPageShell
      toolName="Comment Sentiment Analyzer"
      toolDescription="Summarize the sentiment and recurring themes in a bounded sample of public YouTube comments."
      toolSlug="youtube-comment-sentiment-analyzer"
      title="YouTube Comment Sentiment Analyzer"
      description="Get a quick read on a small sample of public video comments. Review the sentiment split, recurring themes, and comments behind the result."
      answerFirst="Paste a public YouTube video URL to analyze up to 40 top-level comments returned in relevance order. See an AI-assisted sentiment split and recurring themes; results describe only this sample, not every viewer."
      seo={<SeoContent />}
      faqs={faqs}
    >
      <CommentSentimentAnalyzerClient initialUrl={params.url} />
    </ToolPageShell>
  );
}
