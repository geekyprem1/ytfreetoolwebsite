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
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { useToolApi } from '@/hooks/use-tool-api';

interface ShortsResponse {
  ideas: { idea: string; trendScore: number; viralityScore: number; category: string }[];
}

function ScoreBar({ score, label }: { score: number; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground w-12">{label}</span>
      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${score >= 70 ? 'bg-green-500' : score >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
          style={{ width: `${score}%` }} />
      </div>
      <span className="text-xs font-medium w-8 text-right">{score}</span>
    </div>
  );
}

export function ShortsIdeasClient() {
  const [topic, setTopic] = useState('');
  const [count, setCount] = useState(50);
  const { data, isLoading, error, execute, reset } = useToolApi<ShortsResponse>();

  const handleGenerate = () => {
    execute('/api/ai/generate-shorts-ideas', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, count }),
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ToolInput label="Topic" required>
          <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g., cooking tips" disabled={isLoading}
            onKeyDown={(e) => e.key === 'Enter' && topic && handleGenerate()} />
        </ToolInput>
        <ToolInput label="Number of Ideas">
          <Slider value={count} min={5} max={50} step={5} onChange={setCount} disabled={isLoading} />
        </ToolInput>
      </div>

      <Button onClick={handleGenerate} disabled={!topic || isLoading} className="w-full">
        {isLoading ? 'Generating...' : `Generate ${count} Ideas`}
      </Button>

      {isLoading && <ToolLoading variant="list" />}
      {error && <ToolError message={error} onRetry={reset} />}

      {data && !isLoading && (
        <ToolOutput title={`${data.ideas.length} Shorts Ideas`}>
          <div className="space-y-2">
            <OutputActions copyText={data.ideas.map((i) => i.idea).join('\n')} copyLabel="All ideas" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {data.ideas.map((item, i) => (
                <div key={i} className="rounded-lg border p-3 space-y-2 hover:bg-muted/50">
                  <p className="text-sm">{item.idea}</p>
                  <div className="space-y-1">
                    <ScoreBar score={item.trendScore} label="Trend" />
                    <ScoreBar score={item.viralityScore} label="Viral" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">{item.category}</Badge>
                    <OutputActions copyText={item.idea} copyLabel={`Idea #${i + 1}`} />
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" onClick={handleGenerate} className="w-full">🔄 Regenerate</Button>
          </div>
        </ToolOutput>
      )}

      <RelatedTools currentSlug="shorts-ideas" />
    </div>
  );
}
