'use client';

import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ToolOutput } from '@/components/tools/tool-output';
import { RelatedTools } from '@/components/tools/related-tools';
import { inspectYouTubeInput } from '@/lib/youtube/url-parser';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';

export function UrlInspectorClient() {
  const [input, setInput] = useState('');
  const result = useMemo(() => inspectYouTubeInput(input), [input]);
  const { copy } = useCopyToClipboard();

  return (
    <div className="space-y-4">
      <label htmlFor="youtube-url-input" className="block text-sm font-medium">YouTube URL or identifier</label>
      <Input id="youtube-url-input" value={input} onChange={(event) => setInput(event.target.value)} placeholder="https://www.youtube.com/watch?v=..." className="h-12" />
      {input.trim() && !result && <p role="alert" className="text-sm text-destructive">Enter a supported YouTube video, channel or playlist URL or ID.</p>}
      {result && (
        <ToolOutput title={`${result.type.slice(0, 1).toUpperCase()}${result.type.slice(1)} link`}>
          <div className="space-y-3 rounded-xl border bg-muted/20 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div><p className="text-xs text-muted-foreground">{result.identifierKind}</p><p className="font-mono break-all">{result.id}</p></div>
              <Button size="sm" variant="outline" onClick={() => void copy(result.id, result.identifierKind)}>Copy ID</Button>
            </div>
            {result.playlistId && <p className="text-sm">Also in playlist: <span className="font-mono break-all">{result.playlistId}</span></p>}
            <div className="flex flex-wrap items-center justify-between gap-2 border-t pt-3">
              <a href={result.normalizedUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary break-all underline">{result.normalizedUrl}</a>
              <Button size="sm" variant="outline" onClick={() => void copy(result.normalizedUrl, 'Clean URL')}>Copy clean URL</Button>
            </div>
            {result.identifierKind === 'custom name' || result.identifierKind === 'username' ? <p className="text-xs text-muted-foreground">This legacy URL segment is not a UC channel ID.</p> : null}
          </div>
        </ToolOutput>
      )}
      <RelatedTools currentSlug="youtube-url-inspector" />
    </div>
  );
}
