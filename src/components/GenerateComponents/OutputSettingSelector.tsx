'use client';

import { useState } from 'react';

import {
  IconAdjustmentsHorizontal,
  IconChevronRight,
} from '@tabler/icons-react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { Button } from '../ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';
import { Muted, Small, TinyMuted } from '../ui/typography';
import { cn } from '@/lib/utils';
import AspectRatioBox from '../AspectRatioBox';
import { List, ListItem } from '../ui/list';
import { Separator } from '../ui/separator';

const MIN = 3;
const MAX = 10;

export function OutputSettingSelector() {
  const [duration, setDuration] = useState(10);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          className="flex-1 flex justify-between h-auto rounded-xl p-2"
        >
          <div className="flex gap-2 flex-1">
            <div className="p-3 rounded-xl bg-background/20">
              <IconAdjustmentsHorizontal className="!size-6" />
            </div>
            <div className="flex flex-col items-start flex-1">
              <TinyMuted className="py-1">Output</TinyMuted>
              <div className="flex items-center gap-1 h-4">
                <Small className="leading-5">9:16</Small>
                <Separator
                  orientation="vertical"
                  className="border-[1px] border-border"
                />
                <Small className="leading-5">{duration}s</Small>
                <Separator
                  orientation="vertical"
                  className="border-[1px] border-border"
                />
                <Small className="leading-5">1080p</Small>
              </div>
            </div>
          </div>

          <IconChevronRight />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="right"
        align="start"
        className="p-3 w-85 flex flex-col gap-1 rounded-xl"
      >
        <div className="flex flex-col gap-2">
          <Muted>Duration</Muted>
          <div className="w-full overflow-hidden rounded-sm">
            <SliderPrimitive.Root
              min={MIN}
              max={MAX}
              step={1}
              value={[duration]}
              onValueChange={([v]) => setDuration(v)}
              className="relative flex w-full touch-none select-none items-center"
            >
              <SliderPrimitive.Track className="relative h-10 w-full grow bg-secondary/40 cursor-pointer">
                <SliderPrimitive.Range className="absolute h-full bg-secondary" />
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-foreground/70 pointer-events-none select-none">
                  {duration}s
                </span>
              </SliderPrimitive.Track>
              <SliderPrimitive.Thumb
                className={cn(
                  'block h-10 w-[3px] rounded-none bg-foreground/50 focus-visible:outline-none disabled:pointer-events-none',
                  duration === MAX ? '!mr-[3px]' : '',
                  duration === MIN ? '!ml-[3px]' : '',
                )}
              />
            </SliderPrimitive.Root>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
