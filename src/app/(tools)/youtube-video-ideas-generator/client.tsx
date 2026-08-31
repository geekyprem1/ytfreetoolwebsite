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
import { Badge } from '@/components/ui/badge';
import { useToolApi } from '@/hooks/use-tool-api';

interface Idea {
  title: string;
  intent: string;
  difficulty: string;
  angle: string;
}

interface IdeasResponse {
  ideas: Idea[];
}

const difficultyColor: Record<string, string> = {
  easy: 'text-green-600',
  medium: 'text-yellow-600',
  hard: 'text-destructive',
};

export function VideoIdeasGeneratorClient() {
  const [niche, setNiche] = useState('');
  const [audience, setAudience] = useState('general');
  const [format, setFormat] = useState('any');
  const { data, isLoading, error, execute, reset } = useToolApi<IdeasResponse>();

  const generate = () => {
    if (!niche.trim()) return;
    execute('/api/ai/generate-video-ideas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ niche, audience, format, count: 20 }),
    });
  };

  const exportText = data ? data.ideas.map((i) => `${i.title} — ${i.angle}`).join('\n') : '';

  return (
    <div className="space-y-4">
      <ToolInput label="Your niche" required>
        <Input
          value={niche}
          onChange={(e) => setNiche(e.target.value)}
          placeholder="e.g. personal finance for beginners"
          disabled={isLoading}
          onKeyDown={(e) => e.key === 'Enter' && niche && generate()}
        />
      </ToolInput>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <ToolInput label="Target audience">
          <Input value={audience} onChange={(e) => setAudience(e.target.value)} placeholder="general" disabled={isLoading} />
        </ToolInput>
        <ToolInput label="Format">
          <Select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            disabled={isLoading}
            options={[
              { value: 'any', label: 'Any' },
              { value: 'long-form', label: 'Long-form' },
              { value: 'shorts', label: 'Shorts' },
              { value: 'tutorial', label: 'Tutorial' },
              { value: 'listicle', label: 'Listicle' },
            ]}
          />
        </ToolInput>
      </div>

      <Button onClick={generate} disabled={!niche.trim() || isLoading} className="w-full">
        {isLoading ? 'Generating…' : 'Generate ideas'}
      </Button>

      {isLoading && <ToolLoading variant="list" />}
      {error && <ToolError message={error} onRetry={() => reset()} />}

      {data && !isLoading && (
        <ToolOutput title={`${data.ideas.length} video ideas`}>
          <div className="space-y-2">
            <OutputActions
              copyText={exportText}
              copyLabel="All ideas"
              downloadContent={exportText}
              downloadFilename="youtube-video-ideas.txt"
            />
            {data.ideas.map((idea, i) => (
              <div key={i} className="rounded-lg border p-3 space-y-1.5">
                <p className="text-sm font-medium">{idea.title}</p>
                <p className="text-xs text-muted-foreground">{idea.angle}</p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs capitalize">
                    {idea.intent}
                  </Badge>
                  <span className={`text-xs capitalize ${difficultyColor[idea.difficulty?.toLowerCase()] ?? ''}`}>
                    {idea.difficulty} to rank
                  </span>
                </div>
              </div>
            ))}
            <Button variant="outline" onClick={generate} className="w-full">
              Regenerate
            </Button>
          </div>
        </ToolOutput>
      )}

      <RelatedTools currentSlug="youtube-video-ideas-generator" />
    </div>
  );
}
