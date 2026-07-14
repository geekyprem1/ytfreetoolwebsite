'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ToolOutputProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function ToolOutput({ title, children, className }: ToolOutputProps) {
  return (
    <Card className={cn('mt-6', className)}>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}
