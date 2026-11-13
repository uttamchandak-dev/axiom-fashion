'use client';

import { cn } from '@/lib/utils';

interface QuantitySelectorProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  className?: string;
}

export default function QuantitySelector({
  value,
  min = 1,
  max = 99,
  onChange,
  className,
}: QuantitySelectorProps) {
  return (
    <div className={cn('flex items-center border border-border', className)}>
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="w-10 h-10 flex items-center justify-center text-sm hover:bg-neutral-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="w-12 text-center text-sm tabular-nums" aria-live="polite">
        {value}
      </span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="w-10 h-10 flex items-center justify-center text-sm hover:bg-neutral-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
