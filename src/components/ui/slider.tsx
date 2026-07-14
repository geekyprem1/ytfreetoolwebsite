import { cn } from '@/lib/utils';

interface SliderProps {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  className?: string;
  disabled?: boolean;
}

function Slider({ value, min, max, step = 1, onChange, className, disabled }: SliderProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary disabled:opacity-50"
      />
      <span className="text-xs font-medium text-muted-foreground w-8 text-right tabular-nums">
        {value}
      </span>
    </div>
  );
}

export { Slider };
