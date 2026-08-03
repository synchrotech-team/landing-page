import * as React from 'react';
import { cn } from '@/lib/utils';

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'border border-border bg-background transition-colors duration-150 hover:border-purple-electric/50',
        className
      )}
      {...props}
    />
  );
}
