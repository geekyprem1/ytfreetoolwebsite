'use client';

import { Button } from '@/components/ui/button';
import { downloadFile } from '@/lib/utils/download';
import { Download } from 'lucide-react';

export function DownloadCsvButton({ csv, filename }: { csv: string; filename: string }) {
  return (
    <Button variant="outline" size="sm" onClick={() => downloadFile(csv, filename, 'text/csv')}>
      <Download className="size-3.5 mr-1.5" />
      Download CSV
    </Button>
  );
}
