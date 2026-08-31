'use client';

import { useState } from 'react';
import { ToolInput } from '@/components/tools/tool-input';
import { ToolOutput } from '@/components/tools/tool-output';
import { ToolLoading } from '@/components/tools/tool-loading';
import { ToolError } from '@/components/tools/tool-error';
import { RelatedTools } from '@/components/tools/related-tools';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { useToolApi } from '@/hooks/use-tool-api';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { Check, X, Loader2 } from 'lucide-react';

interface NameIdea {
  name: string;
  handle: string;
  reason: string;
}

interface NamesResponse {
  names: NameIdea[];
}

type HandleState = 'unknown' | 'checking' | 'available' | 'taken';

export function ChannelNameGeneratorClient() {
  const [niche, setNiche] = useState('');
  const [keywords, setKeywords] = useState('');
  const [style, setStyle] = useState('brandable');
  const { data, isLoading, error, execute, reset } = useToolApi<NamesResponse>();
  const { copy } = useCopyToClipboard();
  const [handleStates, setHandleStates] = useState<Record<string, HandleState>>({});

  const generate = () => {
    if (!niche.trim()) return;
    setHandleStates({});
    execute('/api/ai/generate-channel-names', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ niche, keywords, style, count: 12 }),
    });
  };

  const checkHandle = async (handle: string) => {
    const clean = handle.replace(/^@/, '');
    setHandleStates((s) => ({ ...s, [handle]: 'checking' }));
    try {
      // channel-branding resolves via getChannelDetails, which returns 404 when
      // the handle does not exist (unlike /resolve, which swallows not-found).
      const res = await fetch(`/api/youtube/channel-branding?c=${encodeURIComponent('@' + clean)}`);
      if (res.ok) {
        setHandleStates((s) => ({ ...s, [handle]: 'taken' }));
      } else if (res.status === 404) {
        setHandleStates((s) => ({ ...s, [handle]: 'available' }));
      } else {
        setHandleStates((s) => ({ ...s, [handle]: 'unknown' }));
      }
    } catch {
      setHandleStates((s) => ({ ...s, [handle]: 'unknown' }));
    }
  };

  return (
    <div className="space-y-4">
      <ToolInput label="Your niche" required>
        <Input
          value={niche}
          onChange={(e) => setNiche(e.target.value)}
          placeholder="e.g. budget travel, home cooking, indie game dev"
          disabled={isLoading}
          onKeyDown={(e) => e.key === 'Enter' && niche && generate()}
        />
      </ToolInput>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <ToolInput label="Keywords to include" description="Optional, comma-separated">
          <Input value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="optional" disabled={isLoading} />
        </ToolInput>
        <ToolInput label="Style">
          <Select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            disabled={isLoading}
            options={[
              { value: 'brandable', label: 'Brandable' },
              { value: 'descriptive', label: 'Descriptive' },
              { value: 'fun', label: 'Fun / playful' },
              { value: 'personal', label: 'Personal brand' },
              { value: 'one-word', label: 'One word' },
            ]}
          />
        </ToolInput>
      </div>

      <Button onClick={generate} disabled={!niche.trim() || isLoading} className="w-full">
        {isLoading ? 'Generating…' : 'Generate names'}
      </Button>

      {isLoading && <ToolLoading variant="list" />}
      {error && <ToolError message={error} onRetry={() => reset()} />}

      {data && !isLoading && (
        <ToolOutput title={`${data.names.length} name ideas`}>
          <div className="space-y-2">
            {data.names.map((n, i) => {
              const state = handleStates[n.handle] ?? 'unknown';
              return (
                <div key={i} className="rounded-lg border p-3">
                  <div className="flex items-center justify-between gap-3">
                    <button
                      onClick={() => copy(n.name, 'Channel name')}
                      className="text-sm font-semibold hover:text-primary transition-colors"
                      title="Click to copy"
                    >
                      {n.name}
                    </button>
                    <span className="font-mono text-xs text-muted-foreground">@{n.handle}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{n.reason}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => checkHandle(n.handle)}
                      disabled={state === 'checking'}
                    >
                      {state === 'checking' ? <Loader2 className="size-3.5 animate-spin" /> : 'Check @handle'}
                    </Button>
                    {state === 'available' && (
                      <span className="flex items-center gap-1 text-xs text-green-600">
                        <Check className="size-3.5" /> Looks available
                      </span>
                    )}
                    {state === 'taken' && (
                      <span className="flex items-center gap-1 text-xs text-destructive">
                        <X className="size-3.5" /> Taken
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
            <p className="text-xs text-muted-foreground pt-1">
              Availability is a best-effort check against public channels. Always confirm inside YouTube
              before finalizing, since reserved or recently claimed handles can differ.
            </p>
          </div>
        </ToolOutput>
      )}

      <RelatedTools currentSlug="youtube-channel-name-generator" />
    </div>
  );
}
