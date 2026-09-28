'use client';

import { useMemo, useState } from 'react';
import { ToolInput } from '@/components/tools/tool-input';
import { ToolOutput } from '@/components/tools/tool-output';
import { ToolLoading } from '@/components/tools/tool-loading';
import { ToolError } from '@/components/tools/tool-error';
import { OutputActions } from '@/components/tools/output-actions';
import { RelatedTools } from '@/components/tools/related-tools';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { useToolApi } from '@/hooks/use-tool-api';
import { cn } from '@/lib/utils';
import {
  YOUTUBE_TAG_CHAR_LIMIT,
  fitTagsToLimit,
  formatTagsForStudio,
  tagListLength,
  type GeneratedTag,
  type TagType,
} from '@/lib/youtube/tag-budget';

interface TagResponse {
  tags: GeneratedTag[];
}

const GROUPS: { type: TagType; label: string; hint: string }[] = [
  { type: 'primary', label: 'Primary', hint: 'Your exact topic and close variations' },
  { type: 'related', label: 'Related', hint: 'Broader and adjacent searches' },
  { type: 'long-tail', label: 'Long-tail', hint: 'Specific 3–6 word search phrases' },
];

export function TagGeneratorClient() {
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [count, setCount] = useState(30);
  /** Tags the user has switched off (lower-cased). Everything else is selected. */
  const [excluded, setExcluded] = useState<Set<string>>(new Set());

  const { data, isLoading, error, execute, reset } = useToolApi<TagResponse>({
    onSuccess: () => setExcluded(new Set()),
  });

  const handleGenerate = () => {
    if (topic.trim().length < 2) return;
    execute('/api/ai/generate-tags', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic: topic.trim(), keywords: keywords.trim(), count }),
    });
  };

  const allTags = useMemo(() => data?.tags ?? [], [data]);
  const selected = useMemo(
    () => allTags.filter((t) => !excluded.has(t.tag.toLowerCase())).map((t) => t.tag),
    [allTags, excluded],
  );
  const used = tagListLength(selected);
  const over = used > YOUTUBE_TAG_CHAR_LIMIT;
  const pct = Math.min(100, (used / YOUTUBE_TAG_CHAR_LIMIT) * 100);
  const studioText = formatTagsForStudio(selected);

  const toggle = (tag: string) => {
    setExcluded((prev) => {
      const next = new Set(prev);
      const key = tag.toLowerCase();
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const fitToLimit = () => {
    const keep = new Set(fitTagsToLimit(selected).map((t) => t.toLowerCase()));
    setExcluded(new Set(allTags.map((t) => t.tag.toLowerCase()).filter((k) => !keep.has(k))));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ToolInput label="Video topic or title" description="What is the video about?" required>
          <Input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., budget travel tips for Japan"
            maxLength={200}
            disabled={isLoading}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
          />
        </ToolInput>
        <ToolInput label="Focus keywords" description="Optional — words you want covered">
          <Input
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="e.g., tokyo, cheap hotels, rail pass"
            maxLength={200}
            disabled={isLoading}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
          />
        </ToolInput>
      </div>

      <ToolInput label={`Number of tags: ${count}`}>
        <Slider value={count} min={10} max={40} step={5} onChange={setCount} disabled={isLoading} />
      </ToolInput>

      <Button onClick={handleGenerate} disabled={topic.trim().length < 2 || isLoading} className="w-full">
        {isLoading ? 'Generating tags…' : 'Generate YouTube Tags'}
      </Button>

      {isLoading && <ToolLoading variant="list" />}
      {error && <ToolError message={error} onRetry={reset} />}

      {data && !isLoading && (
        <ToolOutput title={`${selected.length} of ${allTags.length} tags selected`}>
          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="font-medium">Tags field usage</span>
                <span className={cn('tabular-nums', over ? 'text-destructive font-semibold' : 'text-muted-foreground')}>
                  {used} / {YOUTUBE_TAG_CHAR_LIMIT} characters
                </span>
              </div>
              <div
                className="h-2 rounded-full bg-muted overflow-hidden"
                role="progressbar"
                aria-label="Tag characters used"
                aria-valuemin={0}
                aria-valuemax={YOUTUBE_TAG_CHAR_LIMIT}
                aria-valuenow={used}
              >
                <div
                  className={cn('h-full transition-all', over ? 'bg-destructive' : pct > 85 ? 'bg-amber-500' : 'bg-emerald-500')}
                  style={{ width: `${pct}%` }}
                />
              </div>
              {over ? (
                <p className="mt-2 text-sm text-destructive" role="alert">
                  Over YouTube&apos;s 500-character limit — Studio will not save this list.{' '}
                  <button type="button" onClick={fitToLimit} className="underline font-medium">
                    Trim to fit
                  </button>
                </p>
              ) : (
                <p className="mt-2 text-xs text-muted-foreground">
                  Estimate: commas count, and tags with spaces count 2 extra characters, like YouTube Studio.
                </p>
              )}
            </div>

            <p className="text-xs text-muted-foreground">Click a tag to include or exclude it.</p>

            {GROUPS.map(({ type, label, hint }) => {
              const group = allTags.filter((t) => t.type === type);
              if (group.length === 0) return null;
              return (
                <section key={type} className="space-y-2" aria-label={`${label} tags`}>
                  <h3 className="text-sm font-semibold">
                    {label} <span className="font-normal text-muted-foreground">· {hint}</span>
                  </h3>
                  <ul className="flex flex-wrap gap-1.5">
                    {group.map(({ tag }) => {
                      const on = !excluded.has(tag.toLowerCase());
                      return (
                        <li key={tag}>
                          <button
                            type="button"
                            aria-pressed={on}
                            onClick={() => toggle(tag)}
                            className={cn(
                              'rounded-full border px-3 py-1 text-sm transition-colors',
                              on
                                ? 'bg-primary/10 border-primary/30 text-foreground'
                                : 'bg-transparent text-muted-foreground line-through opacity-70',
                            )}
                          >
                            {tag}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              );
            })}

            <div className="rounded-xl border bg-muted/20 p-3">
              <p className="text-xs text-muted-foreground mb-1.5">Paste into YouTube Studio → Details → Tags</p>
              <p className="text-sm break-words">{studioText || '—'}</p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2">
              <OutputActions
                copyText={studioText}
                copyLabel="Tags"
                downloadContent={studioText}
                downloadFilename="youtube-tags.txt"
                disabled={selected.length === 0}
              />
              <Button variant="outline" size="sm" onClick={handleGenerate}>
                Regenerate
              </Button>
            </div>
          </div>
        </ToolOutput>
      )}

      <RelatedTools currentSlug="youtube-tag-generator" />
    </div>
  );
}
