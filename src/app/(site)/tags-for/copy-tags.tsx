'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { Copy } from 'lucide-react';

export function CopyTags({ tags }: { tags: string[] }) {
  const { copy } = useCopyToClipboard();
  const joined = tags.join(', ');

  return (
    <div className="not-prose space-y-3">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="cursor-pointer hover:opacity-90"
            onClick={() => copy(tag, tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>
      <Button variant="outline" size="sm" onClick={() => copy(joined, 'All tags')}>
        <Copy className="size-3.5 mr-1.5" />
        Copy all tags
      </Button>
    </div>
  );
}
