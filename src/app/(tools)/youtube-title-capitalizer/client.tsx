'use client';

import { useState } from 'react';
import Link from 'next/link';
import { RelatedTools } from '@/components/tools/related-tools';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { applyCase, analyzeTitleLength, TITLE_MAX, type CaseStyle } from '@/lib/youtube/title-text';
import { cn } from '@/lib/utils';

const STYLES: { id: CaseStyle; label: string; hint: string }[] = [
  { id: 'title', label: 'Title Case', hint: 'Capitalize each major word' },
  { id: 'sentence', label: 'Sentence case', hint: 'Capitalize the first word only' },
  { id: 'upper', label: 'UPPERCASE', hint: 'All capitals' },
  { id: 'lower', label: 'lowercase', hint: 'No capitals' },
];

export function TitleCapitalizerClient() {
  const [input, setInput] = useState('');
  const { copy } = useCopyToClipboard();

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="cap-input" className="block text-sm font-medium mb-1.5">
          Your title
        </label>
        <Textarea
          id="cap-input"
          value={input}
          onChange={(e) => setInput(e.target.value.replace(/\n/g, ' '))}
          placeholder="Type or paste your title…"
          rows={2}
          className="text-base"
        />
      </div>

      {input.trim() ? (
        <div className="space-y-2">
          {STYLES.map(({ id, label, hint }) => {
            const output = applyCase(input, id);
            const len = analyzeTitleLength(output);
            return (
              <div key={id} className="rounded-xl border p-3">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-sm font-medium">
                    {label} <span className="font-normal text-muted-foreground">· {hint}</span>
                  </span>
                  <Button variant="outline" size="sm" onClick={() => copy(output, label)}>
                    Copy
                  </Button>
                </div>
                <p className="text-base leading-snug break-words">{output}</p>
                <p className={cn('mt-1 text-xs tabular-nums', len.overLimit ? 'text-destructive' : 'text-muted-foreground')}>
                  {len.characters}/{TITLE_MAX} characters
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">Enter a title to see it in every capitalization style.</p>
      )}

      <div className="tool-prose">
        <p className="text-sm text-muted-foreground">
          Title Case keeps small words like “a”, “the” and “of” lowercase unless they start or end the title, and it
          leaves brand spellings such as “iPhone” intact. Check the length with the{' '}
          <Link href="/youtube-title-length-checker">Title Length Checker</Link> and the wording with the{' '}
          <Link href="/title-analyzer">AI Title Analyzer</Link>.
        </p>
      </div>

      <RelatedTools currentSlug="youtube-title-capitalizer" />
    </div>
  );
}
