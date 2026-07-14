'use client';

import { useState, useCallback } from 'react';
import { copyToClipboard } from '@/lib/utils/clipboard';
import { toast } from 'sonner';

export function useCopyToClipboard() {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async (text: string, label?: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      toast.success(label ? `${label} copied!` : 'Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error('Failed to copy');
    }
    return success;
  }, []);

  return { copied, copy };
}
