'use client';

import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

interface ToolInputProps {
  label: string;
  description?: string;
  error?: string | null;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function ToolInput({ label, description, error, required, children, className }: ToolInputProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <div>
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      {children}
      {error && (
        <p className="text-xs text-destructive flex items-center gap-1 mt-1">
          <AlertCircle className="size-3" />
          {error}
        </p>
      )}
    </div>
  );
}
