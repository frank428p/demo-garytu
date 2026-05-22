'use client';

import * as React from 'react';
import { Checkbox as CheckboxPrimitive } from 'radix-ui';

import { cn } from '@/lib/utils';
import { IconCheck, IconMinus } from '@tabler/icons-react';

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        'group peer flex items-center justify-center size-4 shrink-0 rounded-[4px] border-[2px] border-input shadow-xs transition-shadow outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[state=checked]:border-foreground data-[state=checked]:bg-foreground data-[state=checked]:text-secondary data-[state=indeterminate]:text-foreground dark:bg-input/30 dark:aria-invalid:ring-destructive/40 dark:data-[state=checked]:bg-foreground dark:data-[state=indeterminate]:bg-input dark:data-[state=indeterminate]:border-none',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none"
      >
        <IconCheck
          className="size-3.5 group-data-[state=indeterminate]:hidden"
          stroke="3"
        />
        <IconMinus
          className="size-3.5 hidden group-data-[state=indeterminate]:block"
          stroke="3"
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
