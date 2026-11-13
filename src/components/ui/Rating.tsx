import { cn } from '@/lib/utils';

interface RatingProps {
  value: number;
  maxValue?: number;
  reviewCount?: number;
  size?: 'sm' | 'md';
  className?: string;
}

export default function Rating({ value, maxValue = 5, reviewCount, size = 'sm', className }: RatingProps) {
  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxValue }, (_, i) => {
          const filled = i < Math.floor(value);
          const halfFilled = !filled && i < value;

          return (
            <svg
              key={i}
              width={size === 'sm' ? 14 : 18}
              height={size === 'sm' ? 14 : 18}
              viewBox="0 0 24 24"
              fill={filled ? 'currentColor' : halfFilled ? 'url(#half)' : 'none'}
              stroke="currentColor"
              strokeWidth="1.5"
              className={cn(
                filled || halfFilled ? 'text-neutral-800' : 'text-neutral-300'
              )}
            >
              {halfFilled && (
                <defs>
                  <linearGradient id="half" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="50%" stopColor="currentColor" />
                    <stop offset="50%" stopColor="transparent" />
                  </linearGradient>
                </defs>
              )}
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          );
        })}
      </div>
      {reviewCount !== undefined && (
        <span className={cn('text-muted', size === 'sm' ? 'text-xs' : 'text-sm')}>
          ({reviewCount})
        </span>
      )}
    </div>
  );
}
