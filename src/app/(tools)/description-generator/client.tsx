'use client';

import { useState } from 'react';
import { ToolInput } from '@/components/tools/tool-input';
import { ToolOutput } from '@/components/tools/tool-output';
import { ToolLoading } from '@/components/tools/tool-loading';
import { ToolError } from '@/components/tools/tool-error';
import { OutputActions } from '@/components/tools/output-actions';
import { RelatedTools } from '@/components/tools/related-tools';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useToolApi } from '@/hooks/use-tool-api';

const TONES = [
  { value: 'professional', label: '🏢 Professional' },
  { value: 'casual', label: '😊 Casual' },
  { value: 'educational', label: '📚 Educational' },
  { value: 'enthusiastic', label: '🎉 Enthusiastic' },
];

interface Chapter {
  timestamp: string;
  title: string;
}

interface DescriptionResponse {
  description: string;
  hashtags: string[];
  timestamps: Chapter[] | string[];
  cta: string;
}

/** Normalize chapters whether API/AI returned objects or "0:00 Title" strings. */
function normalizeChapters(raw: DescriptionResponse['timestamps'] | undefined): Chapter[] {
  if (!Array.isArray(raw) || raw.length === 0) return [];

  return raw
    .map((item): Chapter | null => {
      if (typeof item === 'string') {
        const trimmed = item.trim();
        if (!trimmed) return null;
        const match = trimmed.match(/^(\d{1,2}:\d{2}(?::\d{2})?)\s+(.+)$/);
        if (match) return { timestamp: match[1], title: match[2].trim() };
        return { timestamp: '0:00', title: trimmed };
      }
      if (item && typeof item === 'object') {
        const timestamp = String(item.timestamp ?? '').trim();
        const title = String(item.title ?? '').trim();
        if (!timestamp && !title) return null;
        return { timestamp: timestamp || '0:00', title: title || 'Chapter' };
      }
      return null;
    })
    .filter((c): c is Chapter => c !== null);
}

export function DescriptionGeneratorClient() {
  const [topic, setTopic] = useState('');
  const [keyword, setKeyword] = useState('');
  const [summary, setSummary] = useState('');
  const [tone, setTone] = useState('educational');
  const [includeTimestamps, setIncludeTimestamps] = useState(true);
  const [includeHashtags, setIncludeHashtags] = useState(true);
  const [includeCTA, setIncludeCTA] = useState(true);

  const { data, isLoading, error, execute, reset } = useToolApi<DescriptionResponse>();

  const handleGenerate = () => {
    execute('/api/ai/generate-description', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic,
        keyword,
        summary,
        tone: tone as never,
        includeTimestamps,
        includeHashtags,
        includeCTA,
      }),
    });
  };

  const isValid = topic.length >= 3 && keyword.length >= 1 && summary.length >= 10;
  const chapters = data ? normalizeChapters(data.timestamps) : [];
  const hashtags = data?.hashtags?.filter((t) => typeof t === 'string' && t.trim()) ?? [];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ToolInput label="Topic" description="What is your video about?" required>
          <Input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Beginner's guide to YouTube SEO"
            disabled={isLoading}
          />
        </ToolInput>
        <ToolInput label="Keyword" description="Your target SEO keyword" required>
          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="e.g., youtube seo guide"
            disabled={isLoading}
          />
        </ToolInput>
      </div>

      <ToolInput label="Summary" description="Brief description of your video content" required>
        <Textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Write a short summary of what the video covers..."
          rows={4}
          disabled={isLoading}
        />
      </ToolInput>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ToolInput label="Tone">
          <Select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            options={TONES}
            disabled={isLoading}
          />
        </ToolInput>
        <ToolInput label="Options">
          <div className="flex flex-wrap gap-3">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={includeTimestamps}
                onChange={(e) => setIncludeTimestamps(e.target.checked)}
                className="rounded"
                disabled={isLoading}
              />
              Timestamps
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={includeHashtags}
                onChange={(e) => setIncludeHashtags(e.target.checked)}
                className="rounded"
                disabled={isLoading}
              />
              Hashtags
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={includeCTA}
                onChange={(e) => setIncludeCTA(e.target.checked)}
                className="rounded"
                disabled={isLoading}
              />
              CTA
            </label>
          </div>
        </ToolInput>
      </div>

      <Button onClick={handleGenerate} disabled={!isValid || isLoading} className="w-full">
        {isLoading ? 'Generating...' : 'Generate Description'}
      </Button>

      {isLoading && <ToolLoading variant="text-block" />}
      {error && <ToolError message={error} onRetry={reset} />}

      {data && !isLoading && (
        <div className="space-y-4">
          <ToolOutput title="Generated Description">
            <div className="space-y-3">
              <div className="flex items-center justify-end">
                <OutputActions
                  copyText={data.description}
                  copyLabel="Description"
                  downloadContent={data.description}
                  downloadFilename="youtube-description.txt"
                />
              </div>
              <div className="rounded-lg border p-4 bg-muted/30 text-sm whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
                {data.description}
              </div>
            </div>
          </ToolOutput>

          {includeTimestamps && chapters.length > 0 && (
            <ToolOutput title="Chapters">
              <div className="space-y-1">
                {chapters.map((ts, i) => (
                  <div key={i} className="flex gap-2 text-sm">
                    <span className="text-primary font-mono shrink-0">{ts.timestamp}</span>
                    <span>{ts.title}</span>
                  </div>
                ))}
                <div className="mt-2">
                  <OutputActions
                    copyText={chapters.map((t) => `${t.timestamp} ${t.title}`).join('\n')}
                    copyLabel="Chapters"
                  />
                </div>
              </div>
            </ToolOutput>
          )}

          {includeHashtags && hashtags.length > 0 && (
            <ToolOutput title="Hashtags">
              <div className="flex flex-wrap gap-2">
                {hashtags.map((tag) => (
                  <span key={tag} className="text-sm text-primary font-medium">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-2">
                <OutputActions
                  copyText={hashtags.join(' ')}
                  copyLabel="Hashtags"
                />
              </div>
            </ToolOutput>
          )}

          {data.cta && includeCTA && (
            <ToolOutput title="Call to Action">
              <p className="text-sm">{data.cta}</p>
              <div className="mt-2">
                <OutputActions copyText={data.cta} copyLabel="CTA" />
              </div>
            </ToolOutput>
          )}

          <div className="flex justify-center">
            <Button variant="outline" onClick={handleGenerate} disabled={isLoading}>
              🔄 Regenerate
            </Button>
          </div>
        </div>
      )}

      <RelatedTools currentSlug="description-generator" />
    </div>
  );
}
