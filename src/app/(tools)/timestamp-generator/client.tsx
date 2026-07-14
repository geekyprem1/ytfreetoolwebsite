'use client';

import { useState } from 'react';
import { ToolInput } from '@/components/tools/tool-input';
import { ToolOutput } from '@/components/tools/tool-output';
import { ToolLoading } from '@/components/tools/tool-loading';
import { ToolError } from '@/components/tools/tool-error';
import { OutputActions } from '@/components/tools/output-actions';
import { RelatedTools } from '@/components/tools/related-tools';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToolApi } from '@/hooks/use-tool-api';
import Link from 'next/link';

interface TimestampResponse {
  chapters: { timestamp: string; title: string }[];
}

export function TimestampGeneratorClient() {
  const [transcript, setTranscript] = useState('');
  const { data, isLoading, error, execute, reset } = useToolApi<TimestampResponse>();

  const handleGenerate = () => {
    execute('/api/ai/generate-timestamps', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ transcript }),
    });
  };

  const chapterText = data ? data.chapters.map((c) => `${c.timestamp} ${c.title}`).join('\n') : '';

  return (
    <div className="space-y-4">
      <ToolInput label="Transcript" description="Paste the video transcript">
        <Textarea value={transcript} onChange={(e) => setTranscript(e.target.value)}
          placeholder="Paste your transcript here... Or try our Transcript Extractor first." rows={10} disabled={isLoading} />
      </ToolInput>

      <div className="flex items-center gap-2">
        <Link href="/transcript-extractor" className="text-xs text-primary hover:underline">
          Need a transcript? Use Transcript Extractor →
        </Link>
      </div>

      <Button onClick={handleGenerate} disabled={transcript.length < 20 || isLoading} className="w-full">
        {isLoading ? 'Generating...' : 'Generate Chapters'}
      </Button>

      {isLoading && <ToolLoading variant="list" />}
      {error && <ToolError message={error} onRetry={reset} />}

      {data && !isLoading && (
        <ToolOutput title={`${data.chapters.length} Chapters`}>
          <div className="space-y-2">
            <OutputActions copyText={chapterText} copyLabel="All chapters" />
            {data.chapters.map((ch, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 group">
                <span className="text-sm font-mono text-primary font-medium w-16 shrink-0">{ch.timestamp}</span>
                <span className="text-sm flex-1">{ch.title}</span>
                <OutputActions copyText={`${ch.timestamp} ${ch.title}`} copyLabel="Chapter" />
              </div>
            ))}
            <Button variant="outline" onClick={handleGenerate} className="w-full">🔄 Regenerate</Button>
          </div>
        </ToolOutput>
      )}

      <RelatedTools currentSlug="timestamp-generator" />
    </div>
  );
}
