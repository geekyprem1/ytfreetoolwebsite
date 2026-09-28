'use client';

import { useState } from 'react';
import { ExternalLink, Link2 } from 'lucide-react';
import { ToolOutput } from '@/components/tools/tool-output';
import { RelatedTools } from '@/components/tools/related-tools';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import {
  buildSubscribeLink,
  parseChannelRef,
  subscribeHtmlSnippet,
  subscribeMarkdownSnippet,
} from '@/lib/youtube/subscribe-link';

function CopyRow({ label, value, mono = true }: { label: string; value: string; mono?: boolean }) {
  const { copy } = useCopyToClipboard();
  return (
    <div className="rounded-xl border p-3">
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <p className="text-xs text-muted-foreground">{label}</p>
        <Button variant="outline" size="sm" onClick={() => copy(value, label)}>
          Copy
        </Button>
      </div>
      <p className={mono ? 'font-mono text-xs sm:text-sm break-all' : 'text-sm break-all'}>{value}</p>
    </div>
  );
}

export function SubscribeLinkGeneratorClient() {
  const [input, setInput] = useState('');
  const [label, setLabel] = useState('Subscribe on YouTube');
  const trimmed = input.trim();
  const ref = trimmed ? parseChannelRef(trimmed) : null;
  const link = ref ? buildSubscribeLink(ref) : '';

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="sub-channel" className="block text-sm font-medium mb-1.5">
          Channel URL, @handle, or channel ID
        </label>
        <div className="relative">
          <Link2 aria-hidden className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            id="sub-channel"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. https://www.youtube.com/@mkbhd or @mkbhd"
            className="pl-10 h-12 text-base rounded-xl md:text-base"
            autoComplete="off"
            spellCheck={false}
            aria-invalid={Boolean(trimmed) && !ref}
            aria-describedby="sub-channel-help"
          />
        </div>
        <p id="sub-channel-help" className="mt-1.5 text-xs text-muted-foreground" aria-live="polite">
          {trimmed && !ref
            ? 'That does not look like a YouTube channel link, @handle or UC… ID.'
            : 'Works with @handles, /channel/UC… links, and older /c/ and /user/ URLs. Nothing is sent to a server.'}
        </p>
      </div>

      {link && ref && (
        <ToolOutput title="Your subscribe link">
          <div className="space-y-3">
            <CopyRow label="Subscribe link" value={link} />

            <div className="flex flex-wrap gap-2">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium hover:bg-muted/60"
              >
                Test link <ExternalLink aria-hidden className="size-3.5" />
                <span className="sr-only">(opens YouTube in a new tab)</span>
              </a>
            </div>

            <div>
              <label htmlFor="sub-label" className="block text-sm font-medium mb-1.5">
                Button text for snippets
              </label>
              <Input id="sub-label" value={label} onChange={(e) => setLabel(e.target.value)} maxLength={60} />
            </div>
            <CopyRow label="HTML (website, email signature)" value={subscribeHtmlSnippet(link, label || 'Subscribe')} />
            <CopyRow label="Markdown (GitHub, Notion, Discord)" value={subscribeMarkdownSnippet(link, label || 'Subscribe')} />

            {ref.kind === 'custom' || ref.kind === 'user' ? (
              <p className="text-xs text-muted-foreground">
                Older /c/ and /user/ URLs still work, but an @handle link is shorter and future-proof. Find the
                handle on the channel page.
              </p>
            ) : null}
          </div>
        </ToolOutput>
      )}

      <RelatedTools currentSlug="youtube-subscribe-link-generator" />
    </div>
  );
}
