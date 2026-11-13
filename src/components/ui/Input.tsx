'use client';

import { forwardRef, useState, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const [focused, setFocused] = useState(false);
    const hasValue = props.value !== undefined && props.value !== '';

    return (
      <div className="relative">
        {label && (
          <label
            htmlFor={id}
            className={cn(
              'absolute left-0 transition-all duration-300 pointer-events-none',
              focused || hasValue
                ? 'text-[10px] tracking-[0.15em] uppercase text-muted -top-5'
                : 'text-sm text-neutral-400 top-3'
            )}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            'w-full bg-transparent border-b py-3 text-sm text-primary transition-colors duration-300',
            'placeholder:text-neutral-300',
            'focus:outline-none',
            error
              ? 'border-red-500 focus:border-red-500'
              : 'border-border focus:border-primary',
            className
          )}
          onFocus={(e) => {
            setFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-xs text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
