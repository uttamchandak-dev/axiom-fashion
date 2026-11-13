'use client';

import { cn } from '@/lib/utils';
import { ProductColor } from '@/types';

interface ColorSelectorProps {
  colors: ProductColor[];
  selectedColor: string;
  onSelect: (color: ProductColor) => void;
  size?: 'sm' | 'md';
  className?: string;
}

export default function ColorSelector({
  colors,
  selectedColor,
  onSelect,
  size = 'md',
  className,
}: ColorSelectorProps) {
  return (
    <div className={cn('flex items-center gap-2.5', className)} role="radiogroup" aria-label="Color">
      {colors.map((color) => {
        const isSelected = color.name === selectedColor;
        return (
          <button
            key={color.name}
            role="radio"
            aria-checked={isSelected}
            aria-label={color.name}
            onClick={() => onSelect(color)}
            className={cn(
              'rounded-full transition-all duration-200 relative group',
              size === 'sm' ? 'w-5 h-5' : 'w-7 h-7',
              isSelected && 'ring-1 ring-offset-2 ring-neutral-400'
            )}
            style={{ backgroundColor: color.hex }}
            title={color.name}
          >
            {/* White border for very light colors */}
            {isLightColor(color.hex) && (
              <span className="absolute inset-0 rounded-full border border-neutral-200" />
            )}

            {/* Tooltip */}
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-primary text-white text-[10px] tracking-wider uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {color.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function isLightColor(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.85;
}
