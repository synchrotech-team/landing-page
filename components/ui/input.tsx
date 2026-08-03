import * as React from 'react';
import { cn } from '@/lib/utils';

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return (
      <input
        ref={ref}
        className={cn(
          'h-12 w-full border border-border bg-surface px-4 text-base text-foreground placeholder:text-muted-foreground transition-colors duration-150 outline-none focus:border-purple-electric disabled:cursor-not-allowed disabled:opacity-50 md:h-14',
          className
        )}
        {...props}
      />
    );
  }
);

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function Textarea({ className, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        className={cn(
          'w-full border border-border bg-surface px-4 py-3 text-base text-foreground placeholder:text-muted-foreground transition-colors duration-150 outline-none focus:border-purple-electric disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
    );
  }
);
