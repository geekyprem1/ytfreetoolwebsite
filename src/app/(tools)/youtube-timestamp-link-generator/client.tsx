'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ToolInput } from '@/components/tools/tool-input';
import { ToolOutput } from '@/components/tools/tool-output';
import { OutputActions } from '@/components/tools/output-actions';
import { RelatedTools } from '@/components/tools/related-tools';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { parseYouTubeUrl } from '@/lib/youtube/url-parser';

/** Parse "1:23:45", "12:30", or "90" into total seconds. Returns null if invalid. */
function parseTimeToken(token: string): number | null {
  const t = token.trim();
  if (!t) return null;
  if (/^\d+$/.test(t)) return parseInt(t, 10);
  const parts = t.split(':').map((p) => p.trim());
  if (parts.some((p) => !/^\d+$/.test(p))) return null;
  const nums = parts.map((p) => parseInt(p, 10));
  if (nums.length === 2) {
    return nums[0]! * 60 + nums[1]!;
  }
  if (nums.length === 3) {
    return nums[0]! * 3600 + nums[1]! * 60 + nums[2]!;
  }
  return null;
}

function buildLink(videoId: string, seconds: number): string {
  return `https://youtu.be/${videoId}?t=${seconds}`;
}

function formatClock(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const mm = String(m).padStart(2, '0');
  const ss = String(s).padStart(2, '0');
  return h > 0 ? `${h}:${mm}:${ss}` : `${m}:${ss}`;
}

export function TimestampLinkGeneratorClient({ initialUrl }: { initialUrl?: string }) {
  const { copy } = useCopyToClipboard();
  const [url, setUrl] = useState(initialUrl ?? '');
  const [mode, setMode] = useState<'single' | 'bulk'>('single');

  const [hours, setHours] = useState('0');
  const [minutes, setMinutes] = useState('0');
  const [seconds, setSeconds] = useState('0');
  const [bulkText, setBulkText] = useState('0:00 Intro\n1:30 First point\n5:45 Summary');

  const videoId = useMemo(() => {
    const parsed = parseYouTubeUrl(url);
    return parsed?.type === 'video' ? parsed.id : null;
  }, [url]);

  const singleSeconds =
    (parseInt(hours) || 0) * 3600 + (parseInt(minutes) || 0) * 60 + (parseInt(seconds) || 0);
  const singleLink = videoId ? buildLink(videoId, singleSeconds) : '';

  const bulkLinks = useMemo(() => {
    if (!videoId) return [];
    return bulkText
      .split('\n')
      .map((line) => {
        const trimmed = line.trim();
        if (!trimmed) return null;
        const match = trimmed.match(/^(\d{1,2}(?::\d{1,2}){0,2})\s*(.*)$/);
        if (!match || !match[1]) return null;
        const secs = parseTimeToken(match[1]);
        if (secs === null) return null;
        return { seconds: secs, label: match[2] || formatClock(secs), link: buildLink(videoId, secs) };
      })
      .filter((x): x is { seconds: number; label: string; link: string } => x !== null);
  }, [videoId, bulkText]);

  const bulkExport = bulkLinks.map((b) => `${formatClock(b.seconds)} ${b.label} — ${b.link}`).join('\n');

  return (
    <div className="space-y-4">
      <ToolInput label="YouTube video URL" required>
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://youtube.com/watch?v=..."
          className="h-11"
        />
      </ToolInput>

      {url && !videoId && (
        <p className="text-sm text-destructive">
          That does not look like a YouTube video URL. Paste a watch, youtu.be, or shorts link.
        </p>
      )}

      <div className="flex gap-2">
        <Button variant={mode === 'single' ? 'default' : 'outline'} size="sm" onClick={() => setMode('single')}>
          Single timestamp
        </Button>
        <Button variant={mode === 'bulk' ? 'default' : 'outline'} size="sm" onClick={() => setMode('bulk')}>
          Bulk / chapters
        </Button>
      </div>

      {mode === 'single' ? (
        <>
          <div className="grid grid-cols-3 gap-3">
            <ToolInput label="Hours">
              <Input type="number" min="0" value={hours} onChange={(e) => setHours(e.target.value)} />
            </ToolInput>
            <ToolInput label="Minutes">
              <Input type="number" min="0" max="59" value={minutes} onChange={(e) => setMinutes(e.target.value)} />
            </ToolInput>
            <ToolInput label="Seconds">
              <Input type="number" min="0" max="59" value={seconds} onChange={(e) => setSeconds(e.target.value)} />
            </ToolInput>
          </div>

          {singleLink && (
            <ToolOutput title={`Link starts at ${formatClock(singleSeconds)}`}>
              <div className="space-y-3">
                <button
                  onClick={() => copy(singleLink, 'Timestamp link')}
                  className="block w-full rounded-xl border bg-muted/20 p-4 font-mono text-sm break-all text-left hover:text-primary transition-colors"
                  title="Click to copy"
                >
                  {singleLink}
                </button>
                <OutputActions copyText={singleLink} copyLabel="Timestamp link" />
              </div>
            </ToolOutput>
          )}
        </>
      ) : (
        <>
          <ToolInput
            label="Chapter list"
            description="One per line: timestamp then optional label, e.g. 1:30 First point"
          >
            <Textarea rows={6} value={bulkText} onChange={(e) => setBulkText(e.target.value)} className="font-mono text-sm" />
          </ToolInput>

          {bulkLinks.length > 0 && (
            <ToolOutput title={`${bulkLinks.length} timestamp link${bulkLinks.length !== 1 ? 's' : ''}`}>
              <div className="space-y-2">
                {bulkLinks.map((b, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-lg border p-2.5">
                    <span className="font-mono text-xs text-muted-foreground w-16 shrink-0">
                      {formatClock(b.seconds)}
                    </span>
                    <span className="text-sm flex-1 truncate">{b.label}</span>
                    <button
                      onClick={() => copy(b.link, 'Link')}
                      className="text-xs text-primary hover:underline shrink-0"
                    >
                      Copy
                    </button>
                  </div>
                ))}
                <div className="pt-2">
                  <OutputActions
                    copyText={bulkExport}
                    copyLabel="All links"
                    downloadContent={bulkExport}
                    downloadFilename={`${videoId}-timestamps.txt`}
                  />
                </div>
              </div>
            </ToolOutput>
          )}
        </>
      )}

      <RelatedTools currentSlug="youtube-timestamp-link-generator" />
    </div>
  );
}
