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
import { Select } from '@/components/ui/select';
import { useToolApi } from '@/hooks/use-tool-api';

interface ScriptResponse {
  title: string;
  estimatedDuration: string;
  sections: { heading: string; content: string }[];
}

export function ScriptGeneratorClient() {
  const [topic, setTopic] = useState('');
  const [targetLength, setTargetLength] = useState('8min');
  const [tone, setTone] = useState('casual');
  const [audience, setAudience] = useState('general');
  const { data, isLoading, error, execute, reset } = useToolApi<ScriptResponse>();

  const generate = () => {
    if (!topic.trim()) return;
    execute('/api/ai/generate-script', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, targetLength, tone, audience }),
    });
  };

  const fullText = data
    ? `${data.title}\n(${data.estimatedDuration})\n\n${data.sections
        .map((s) => `## ${s.heading}\n${s.content}`)
        .join('\n\n')}`
    : '';

  return (
    <div className="space-y-4">
      <ToolInput label="Video topic" required>
        <Input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. how to start a podcast in 2026"
          disabled={isLoading}
          onKeyDown={(e) => e.key === 'Enter' && topic && generate()}
        />
      </ToolInput>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <ToolInput label="Target length">
          <Select
            value={targetLength}
            onChange={(e) => setTargetLength(e.target.value)}
            disabled={isLoading}
            options={[
              { value: 'short', label: 'Short (30-60s)' },
              { value: '5min', label: '~5 minutes' },
              { value: '8min', label: '~8 minutes' },
              { value: '15min', label: '~15 minutes' },
              { value: 'long', label: '20+ minutes' },
            ]}
          />
        </ToolInput>
        <ToolInput label="Tone">
          <Select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            disabled={isLoading}
            options={[
              { value: 'casual', label: 'Casual' },
              { value: 'professional', label: 'Professional' },
              { value: 'energetic', label: 'Energetic' },
              { value: 'educational', label: 'Educational' },
              { value: 'storytelling', label: 'Storytelling' },
            ]}
          />
        </ToolInput>
        <ToolInput label="Audience">
          <Input value={audience} onChange={(e) => setAudience(e.target.value)} placeholder="general" disabled={isLoading} />
        </ToolInput>
      </div>

      <Button onClick={generate} disabled={!topic.trim() || isLoading} className="w-full">
        {isLoading ? 'Writing script…' : 'Generate script'}
      </Button>

      {isLoading && <ToolLoading variant="text-block" />}
      {error && <ToolError message={error} onRetry={() => reset()} />}

      {data && !isLoading && (
        <ToolOutput title={data.title}>
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm text-muted-foreground">Est. {data.estimatedDuration}</span>
              <OutputActions
                copyText={fullText}
                copyLabel="Script"
                downloadContent={fullText}
                downloadFilename="youtube-script.txt"
              />
            </div>
            <div className="space-y-4">
              {data.sections.map((s, i) => (
                <div key={i} className="rounded-lg border p-4">
                  <h4 className="text-sm font-semibold text-primary mb-1.5">{s.heading}</h4>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{s.content}</p>
                </div>
              ))}
            </div>
            <Button variant="outline" onClick={generate} className="w-full">
              Regenerate
            </Button>
          </div>
        </ToolOutput>
      )}

      <RelatedTools currentSlug="youtube-script-generator" />
    </div>
  );
}
