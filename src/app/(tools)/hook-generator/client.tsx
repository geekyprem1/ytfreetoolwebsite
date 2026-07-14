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
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToolApi } from '@/hooks/use-tool-api';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';

const TONES = [
  { value: 'bold', label: '🔥 Bold' },
  { value: 'humorous', label: '😄 Humorous' },
  { value: 'professional', label: '🏢 Professional' },
  { value: 'dramatic', label: '🎭 Dramatic' },
];

interface HookResponse {
  hooks: { question: string[]; story: string[]; curiosity: string[]; shock: string[] };
  meta: { model: string };
}

const CATEGORIES = [
  { key: 'question' as const, label: '❓ Question Hooks', color: 'text-blue-500' },
  { key: 'story' as const, label: '📖 Story Hooks', color: 'text-green-500' },
  { key: 'curiosity' as const, label: '🤔 Curiosity Hooks', color: 'text-purple-500' },
  { key: 'shock' as const, label: '😲 Shock Hooks', color: 'text-orange-500' },
];

export function HookGeneratorClient() {
  const [topic, setTopic] = useState('');
  const [audience, setAudience] = useState('general');
  const [tone, setTone] = useState('bold');
  const [count, setCount] = useState(10);
  const { data, isLoading, error, execute, reset } = useToolApi<HookResponse>();
  const { copy } = useCopyToClipboard();

  const handleGenerate = () => {
    execute('/api/ai/generate-hooks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, audience, tone, count }),
    });
  };

  const allHooks = data ? [...data.hooks.question, ...data.hooks.story, ...data.hooks.curiosity, ...data.hooks.shock] : [];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ToolInput label="Topic" required>
          <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g., How to save money" disabled={isLoading} />
        </ToolInput>
        <ToolInput label="Target Audience">
          <Input value={audience} onChange={(e) => setAudience(e.target.value)} placeholder="e.g., young professionals" disabled={isLoading} />
        </ToolInput>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <ToolInput label="Tone">
          <Select value={tone} onChange={(e) => setTone(e.target.value)} options={TONES} disabled={isLoading} />
        </ToolInput>
        <ToolInput label="Count">
          <Slider value={count} min={4} max={20} step={4} onChange={setCount} disabled={isLoading} />
        </ToolInput>
      </div>

      <Button onClick={handleGenerate} disabled={!topic || isLoading} className="w-full">
        {isLoading ? 'Generating...' : 'Generate Hooks'}
      </Button>

      {isLoading && <ToolLoading variant="list" />}
      {error && <ToolError message={error} onRetry={reset} />}

      {data && !isLoading && (
        <ToolOutput title="Generated Hooks">
          <div className="space-y-3">
            <OutputActions copyText={allHooks.join('\n\n')} copyLabel="All hooks" />
            <Tabs defaultValue="question">
              <TabsList>
                {CATEGORIES.map((cat) => (
                  <TabsTrigger key={cat.key} value={cat.key} className={cat.color}>{cat.key}</TabsTrigger>
                ))}
              </TabsList>
              {CATEGORIES.map((cat) => (
                <TabsContent key={cat.key} value={cat.key} className="space-y-2 mt-3">
                  {data.hooks[cat.key].map((hook, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 group">
                      <span className="text-xs text-muted-foreground pt-0.5 w-5">{i + 1}</span>
                      <p className="text-sm flex-1">{hook}</p>
                      <OutputActions copyText={hook} copyLabel={`Hook #${i + 1}`} />
                    </div>
                  ))}
                </TabsContent>
              ))}
            </Tabs>
            <Button variant="outline" onClick={handleGenerate} className="w-full">🔄 Regenerate</Button>
          </div>
        </ToolOutput>
      )}

      <RelatedTools currentSlug="hook-generator" />
    </div>
  );
}
