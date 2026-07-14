'use client';

import { Button } from '@/components/ui/button';
import { Copy, Download, Share2 } from 'lucide-react';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { downloadFile } from '@/lib/utils/download';

interface OutputActionsProps {
  copyText?: string;
  copyLabel?: string;
  downloadContent?: string;
  downloadFilename?: string;
  downloadMimeType?: string;
  shareData?: { title: string; text: string; url: string };
  disabled?: boolean;
}

export function OutputActions({
  copyText,
  copyLabel,
  downloadContent,
  downloadFilename,
  downloadMimeType,
  shareData,
  disabled,
}: OutputActionsProps) {
  const { copy } = useCopyToClipboard();

  const handleShare = async () => {
    if (!shareData) return;
    if (navigator.share) {
      await navigator.share(shareData);
    } else if (copyText) {
      await copy(copyText, copyLabel);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {copyText && (
        <Button
          variant="outline"
          size="sm"
          disabled={disabled}
          onClick={() => copy(copyText, copyLabel)}
        >
          <Copy className="size-3.5 mr-1.5" />
          Copy
        </Button>
      )}
      {downloadContent && (
        <Button
          variant="outline"
          size="sm"
          disabled={disabled}
          onClick={() => downloadFile(downloadContent, downloadFilename || 'download.txt', downloadMimeType)}
        >
          <Download className="size-3.5 mr-1.5" />
          Download
        </Button>
      )}
      {shareData && (
        <Button
          variant="outline"
          size="sm"
          disabled={disabled}
          onClick={handleShare}
        >
          <Share2 className="size-3.5 mr-1.5" />
          Share
        </Button>
      )}
    </div>
  );
}
