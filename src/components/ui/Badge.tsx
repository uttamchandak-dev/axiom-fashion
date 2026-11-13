import { cn } from '@/lib/utils';

interface BadgeProps {
  variant: 'new' | 'sale' | 'soldout' | 'limited';
  className?: string;
}

const BADGE_STYLES = {
  new: 'bg-primary text-white',
  sale: 'bg-red-600 text-white',
  soldout: 'bg-neutral-300 text-neutral-600',
  limited: 'bg-accent text-white',
} as const;

const BADGE_LABELS = {
  new: 'New',
  sale: 'Sale',
  soldout: 'Sold Out',
  limited: 'Limited',
} as const;

export default function Badge({ variant, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-block text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 font-medium',
        BADGE_STYLES[variant],
        className
      )}
    >
      {BADGE_LABELS[variant]}
    </span>
  );
}
