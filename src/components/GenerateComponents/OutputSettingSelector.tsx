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
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';

const MIN = 3;
const MAX = 10;

export function OutputSettingSelector() {
  const [duration, setDuration] = useState(10);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          className="flex w-full justify-between h-auto rounded-xl p-2"
        >
          <div className="flex gap-2 flex-1">
            <div className="p-3 rounded-xl bg-background/20">
              <IconAdjustmentsHorizontal className="!size-6" />
            </div>
            <div className="flex flex-col items-start flex-1">
              <TinyMuted className="py-1">Output</TinyMuted>
              <div className="flex items-center gap-1.5 h-4">
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
                <Separator
                  orientation="vertical"
                  className="border-[1px] border-border"
                />
                <Small className="leading-5">4</Small>
              </div>
            </div>
          </div>

          <IconChevronRight />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="right"
        align="start"
        className="p-3 w-85 flex flex-col gap-4 rounded-xl mb-4 ml-1"
      >
        <div className="flex flex-col gap-2">
          <Muted>Aspect ratio</Muted>
          <ToggleGroup type="single" variant="segmented" defaultValue="16:9">
            {(['16:9', '9:16', '1:1'] as const).map((ratio) => (
              <ToggleGroupItem key={ratio} value={ratio} className="h-auto">
                <div className="flex flex-col items-center gap-2 p-2">
                  <div className="h-[15px] flex items-center">
                    <AspectRatioBox
                      ratio={ratio}
                      className="border-muted-foreground"
                    ></AspectRatioBox>
                  </div>
                  {ratio}
                </div>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

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

        <div className="flex flex-col gap-2">
          <Muted>Resolution</Muted>
          <ToggleGroup type="single" variant="segmented" defaultValue="16:9">
            {(['720p', '1080p'] as const).map((resolution) => (
              <ToggleGroupItem key={resolution} value={resolution}>
                {resolution}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <div className="flex flex-col gap-2">
          <Muted>Number of Outputs</Muted>
          <ToggleGroup type="single" variant="segmented" defaultValue="16:9">
            {(['1', '2', '3', '4'] as const).map((count) => (
              <ToggleGroupItem key={`number-of-outputs-${count}`} value={count}>
                {count}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </PopoverContent>
    </Popover>
  );
}
