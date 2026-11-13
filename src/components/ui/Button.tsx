'use client';

import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', fullWidth = false, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base
          'inline-flex items-center justify-center font-normal tracking-[0.08em] uppercase transition-all duration-300 relative overflow-hidden group',
          'disabled:opacity-40 disabled:pointer-events-none',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',

          // Variants
          variant === 'primary' &&
            'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-white active:scale-[0.98]',
          variant === 'secondary' &&
            'bg-transparent border border-neutral-900 dark:border-neutral-100 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-900 hover:text-white dark:hover:bg-neutral-100 dark:hover:text-neutral-900 active:scale-[0.98]',
          variant === 'ghost' &&
            'bg-transparent text-neutral-900 dark:text-neutral-100 hover:opacity-60',
          variant === 'accent' &&
            'bg-accent text-white hover:bg-accent-light active:scale-[0.98]',

          // Sizes
          size === 'sm' && 'text-[11px] px-5 py-2.5',
          size === 'md' && 'text-xs px-7 py-3.5',
          size === 'lg' && 'text-[13px] px-10 py-4',

          // Full width
          fullWidth && 'w-full',

          className
        )}
        {...props}
      >
        {/* Hover fill animation for primary/secondary */}
        {(variant === 'primary' || variant === 'secondary') && (
          <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
        )}
        <span className="relative z-10">{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
