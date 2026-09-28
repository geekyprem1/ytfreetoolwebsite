'use client';

import { useState } from 'react';
import { Link2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ChannelLookupFormProps {
  onSubmit: (value: string) => void;
  isLoading?: boolean;
  buttonLabel: string;
  initialValue?: string;
  inputId?: string;
}

/** Channel URL / @handle / UC… ID input + submit button, shared by channel tools. */
export function ChannelLookupForm({
  onSubmit,
  isLoading,
  buttonLabel,
  initialValue = '',
  inputId = 'channel-input',
}: ChannelLookupFormProps) {
  const [value, setValue] = useState(initialValue);
  const submit = () => {
    const v = value.trim();
    if (v) onSubmit(v);
  };

  return (
    <form
      className="flex flex-col sm:flex-row gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <label htmlFor={inputId} className="sr-only">
        YouTube channel URL, @handle, or channel ID
      </label>
      <div className="relative flex-1">
        <Link2 aria-hidden className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          id={inputId}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Paste channel URL, @handle, or UC… ID"
          className="pl-10 h-12 text-base rounded-xl md:text-base"
          disabled={isLoading}
          autoComplete="off"
          spellCheck={false}
        />
      </div>
      <Button
        type="submit"
        disabled={isLoading || !value.trim()}
        className="h-12 px-5 rounded-xl bg-[#FF3B30] hover:bg-[#E0352B] text-white shrink-0"
      >
        {isLoading ? 'Checking…' : buttonLabel}
      </Button>
    </form>
  );
}
