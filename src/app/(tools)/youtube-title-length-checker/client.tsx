'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ToolOutput } from '@/components/tools/tool-output';
import { RelatedTools } from '@/components/tools/related-tools';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import {
  analyzeTitleLength,
  truncateTitle,
  TITLE_MAX,
  TITLE_DESKTOP_TRUNCATE,
  TITLE_MOBILE_TRUNCATE,
} from '@/lib/youtube/title-text';

export function TitleLengthCheckerClient() {
  const [title, setTitle] = useState('');
  const info = analyzeTitleLength(title);
  const pct = Math.min(100, (info.characters / TITLE_MAX) * 100);
  const barColor = info.overLimit
    ? 'bg-destructive'
    : info.characters > TITLE_DESKTOP_TRUNCATE
      ? 'bg-amber-500'
      : 'bg-emerald-500';

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1.5">
          Video title
        </label>
        <Textarea
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value.replace(/\n/g, ' '))}
          placeholder="Type or paste your YouTube video title…"
          rows={2}
          className="text-base"
          aria-describedby="title-count"
        />
        <div id="title-count" className="mt-2 flex items-center justify-between text-sm">
          <span className={cn('tabular-nums font-medium', info.overLimit ? 'text-destructive' : 'text-muted-foreground')}>
            {info.characters} / {TITLE_MAX} characters
          </span>
          <span className="text-muted-foreground tabular-nums">{info.words} words</span>
        </div>
        <div
          className="mt-1.5 h-2 rounded-full bg-muted overflow-hidden"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={TITLE_MAX}
          aria-valuenow={info.characters}
        >
          <div className={cn('h-full transition-all', barColor)} style={{ width: `${pct}%` }} />
        </div>
        {info.overLimit ? (
          <p className="mt-2 text-sm text-destructive" role="alert">
            {Math.abs(info.remaining)} character{Math.abs(info.remaining) === 1 ? '' : 's'} over YouTube&apos;s{' '}
            {TITLE_MAX}-character limit — the title will be cut off.
          </p>
        ) : null}
      </div>

      {title.trim() && (
        <ToolOutput title="How your title may appear">
          <div className="space-y-4">
            <SearchPreview label={`Desktop search & suggested (~${TITLE_DESKTOP_TRUNCATE} chars)`} text={truncateTitle(title, TITLE_DESKTOP_TRUNCATE)} truncated={info.truncatedDesktop} />
            <SearchPreview label={`Mobile app (~${TITLE_MOBILE_TRUNCATE} chars)`} text={truncateTitle(title, TITLE_MOBILE_TRUNCATE)} truncated={info.truncatedMobile} />
            <p className="text-xs text-muted-foreground">
              Truncation points are approximate — YouTube uses pixel width, not an exact character count, and it
              varies by device and layout. Front-load the important words so they survive any cut-off.
            </p>
          </div>
        </ToolOutput>
      )}

      <div className="tool-prose">
        <p className="text-sm text-muted-foreground">
          Once the length looks right, deepen the title with the{' '}
          <Link href="/title-analyzer">AI Title Analyzer</Link>, fix casing with the{' '}
          <Link href="/youtube-title-capitalizer">Title Capitalizer</Link>, or generate fresh ideas in the{' '}
          <Link href="/title-generator">AI Title Generator</Link>.
        </p>
      </div>

      <RelatedTools currentSlug="youtube-title-length-checker" />
    </div>
  );
}

function SearchPreview({ label, text, truncated }: { label: string; text: string; truncated: boolean }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <div className="rounded-lg border bg-muted/20 p-3">
        <p className="font-medium leading-snug">{text || <span className="text-muted-foreground">Your title…</span>}</p>
      </div>
      {truncated ? <p className="mt-1 text-xs text-amber-600 dark:text-amber-500">Likely truncated here</p> : null}
    </div>
  );
}
