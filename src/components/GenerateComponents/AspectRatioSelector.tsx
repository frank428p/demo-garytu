'use client';

import { useState } from 'react';

import { IconClockHour4 } from '@tabler/icons-react';
import { Button } from '../ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';
import { TinyMuted } from '../ui/typography';
import { cn } from '@/lib/utils';
import AspectRatioBox from '../AspectRatioBox';
import { List, ListItem } from '../ui/list';

export function AspectRatioSelector() {
  const [duration, setDuration] = useState(10);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" className="flex-1">
          <div className="flex items-center gap-2">
            <AspectRatioBox ratio="1:1" />

            <span className="text-sm">{'9:16'}</span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="start"
        className="p-2 w-40 flex flex-col gap-1 rounded-xl"
      >
        <List>
          <ListItem className="cursor-pointer">
            <div className="w-[15px] flex items-center justify-center">
              <AspectRatioBox ratio="16:9" />
            </div>
            16:9
          </ListItem>
          <ListItem className="cursor-pointer">
            <div className="w-[15px] flex items-center justify-center">
              <AspectRatioBox ratio="9:16" />
            </div>
            9:16
          </ListItem>
          <ListItem className="cursor-pointer">
            <div className="w-[15px] flex items-center justify-center">
              <AspectRatioBox ratio="1:1" />
            </div>
            1:1
          </ListItem>
        </List>
      </PopoverContent>
    </Popover>
  );
}
