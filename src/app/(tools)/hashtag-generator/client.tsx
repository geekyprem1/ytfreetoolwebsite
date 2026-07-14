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
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';

interface HashtagResponse {
  hashtags: string[];
  grouped: { broad: string[]; niche: string[]; trending: string[] };
  meta: { model: string };
}

const SECTION_COLORS = {
  broad: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  niche: 'bg-green-500/10 text-green-600 border-green-500/20',
  trending: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
};

export function HashtagGeneratorClient() {
  const [topic, setTopic] = useState('');
  const [count, setCount] = useState(30);
  const { data, isLoading, error, execute, reset } = useToolApi<HashtagResponse>();
  const { copy } = useCopyToClipboard();

  const handleGenerate = () => {
    execute('/api/ai/generate-hashtags', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, count }),
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ToolInput label="Topic" description="What is your video about?" required>
          <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g., iPhone 16 review" disabled={isLoading}
            onKeyDown={(e) => e.key === 'Enter' && topic && handleGenerate()} />
        </ToolInput>
        <ToolInput label="Number of Hashtags">
          <Slider value={count} min={5} max={50} step={5} onChange={setCount} disabled={isLoading} />
        </ToolInput>
      </div>

      <Button onClick={handleGenerate} disabled={!topic || isLoading} className="w-full">
        {isLoading ? 'Generating...' : 'Generate Hashtags'}
      </Button>

      {isLoading && <ToolLoading variant="list" />}
      {error && <ToolError message={error} onRetry={reset} />}

      {data && !isLoading && (
        <ToolOutput>
          <div className="space-y-4">
            <OutputActions copyText={data.hashtags.join(' ')} copyLabel="All hashtags" />
            {(['broad', 'niche', 'trending'] as const).map((cat) => (
              <div key={cat} className="space-y-2">
                <h4 className="text-sm font-semibold capitalize">{cat}</h4>
                <div className="flex flex-wrap gap-1.5">
                  {data.grouped[cat].map((tag) => (
                    <Badge key={tag} variant="secondary" className={`cursor-pointer hover:opacity-80 ${SECTION_COLORS[cat]}`}
                      onClick={() => copy(tag, tag)}>
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
            <Button variant="outline" onClick={handleGenerate} className="w-full">🔄 Regenerate</Button>
          </div>
        </ToolOutput>
      )}

      <RelatedTools currentSlug="hashtag-generator" />
    </div>
  );
}
