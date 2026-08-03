import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'group relative inline-flex items-center whitespace-nowrap font-display font-semibold uppercase tracking-wider transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-electric focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:translate-y-px cursor-pointer',
  {
    variants: {
      variant: {
        primary: 'px-0 text-purple-electric',
        secondary: 'border border-foreground px-6 text-foreground hover:bg-foreground hover:text-background',
        ghost: 'px-4 text-muted-foreground hover:text-foreground',
      },
      size: {
        sm: 'gap-2 py-2 text-xs',
        md: 'gap-2.5 py-3 text-sm',
        lg: 'gap-3 py-4 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant = 'primary', size, children, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props}>
      {children}
      {variant === 'primary' && (
        <span
          aria-hidden
          className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-100 bg-current transition-transform duration-150 group-hover:scale-x-110"
        />
      )}
      {variant === 'ghost' && (
        <span
          aria-hidden
          className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-150 group-hover:scale-x-100"
        />
      )}
    </button>
  );
}

export { buttonVariants };
