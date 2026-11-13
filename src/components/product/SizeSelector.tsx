'use client';

import { cn } from '@/lib/utils';
import { ProductSize } from '@/types';

interface SizeSelectorProps {
  sizes: ProductSize[];
  selectedSize: string;
  onSelect: (size: ProductSize) => void;
  className?: string;
}

export default function SizeSelector({
  sizes,
  selectedSize,
  onSelect,
  className,
}: SizeSelectorProps) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)} role="radiogroup" aria-label="Size">
      {sizes.map((size) => {
        const isSelected = size.name === selectedSize;
        return (
          <button
            key={size.name}
            role="radio"
            aria-checked={isSelected}
            aria-label={`Size ${size.name}`}
            disabled={!size.available}
            onClick={() => onSelect(size)}
            className={cn(
              'min-w-[3rem] h-10 px-3 text-xs tracking-[0.1em] uppercase border transition-all duration-200',
              isSelected
                ? 'bg-primary text-white border-primary'
                : size.available
                ? 'bg-white text-primary border-border hover:border-primary'
                : 'bg-neutral-50 text-neutral-300 border-neutral-100 cursor-not-allowed line-through'
            )}
          >
            {size.name}
          </button>
        );
      })}
    </div>
  );
}
