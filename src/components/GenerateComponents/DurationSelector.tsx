'use client';

import { useState } from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { IconClockHour4 } from '@tabler/icons-react';
import { Button } from '../ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';
import { TinyMuted } from '../ui/typography';
import { cn } from '@/lib/utils';

const MIN = 3;
const MAX = 10;

export function DurationSelector() {
  const [duration, setDuration] = useState(10);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" className="flex-1">
          <div className="flex items-center gap-1">
            <IconClockHour4 />
            <span className="text-sm">{duration}s</span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="start"
        className="p-3 w-64 flex flex-col gap-1 rounded-xl"
      >
        <TinyMuted>Duration</TinyMuted>
        <div className="w-full overflow-hidden rounded-sm">
          <SliderPrimitive.Root
            min={MIN}
            max={MAX}
            step={1}
            value={[duration]}
            onValueChange={([v]) => setDuration(v)}
            className="relative flex w-full touch-none select-none items-center"
          >
            <SliderPrimitive.Track className="relative h-8 w-full grow bg-secondary/40 cursor-pointer">
              <SliderPrimitive.Range className="absolute h-full bg-secondary" />
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-foreground/70 pointer-events-none select-none">
                {duration}s
              </span>
            </SliderPrimitive.Track>
            <SliderPrimitive.Thumb
              className={cn(
                'block h-8 w-[3px] rounded-none bg-foreground/50 focus-visible:outline-none disabled:pointer-events-none',
                duration === MAX ? '!mr-[3px]' : '',
                duration === MIN ? '!ml-[3px]' : '',
              )}
            />
          </SliderPrimitive.Root>
        </div>
      </PopoverContent>
    </Popover>
  );
}
