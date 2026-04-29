'use client';

import { IconRun, IconChevronRight } from '@tabler/icons-react';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer';
import { H4, Small, Tiny, TinyMuted } from '../ui/typography';
import { List, ListItem } from '../ui/list';
import { useBreakpoint } from '@/@core/hooks/useBreakpoint';

const MOTION_OPTIONS: { label: string; description: string; value: number | null }[] = [
  { label: 'Auto', description: 'Let AI decide the motion intensity', value: null },
  { label: 'Low', description: 'Subtle motion (1–3)', value: 2 },
  { label: 'Medium', description: 'Moderate motion (4–6)', value: 5 },
  { label: 'High', description: 'Strong motion (7–10)', value: 8 },
];

const motionList = (
  <List>
    {MOTION_OPTIONS.map((option) => (
      <ListItem key={option.label} className="p-2">
        <div className="flex gap-2 items-center">
          <div className="rounded-lg bg-ring/20 p-2">
            <IconRun className="!h-4 !w-4" />
          </div>
          <div className="flex flex-col">
            <Tiny>{option.label}</Tiny>
            <TinyMuted>{option.description}</TinyMuted>
          </div>
        </div>
      </ListItem>
    ))}
  </List>
);

const trigger = (
  <div className="flex w-full justify-between h-auto rounded-xl p-2 bg-secondary items-center hover:bg-secondary/80 transition-colors cursor-pointer">
    <div className="flex gap-2 flex-1">
      <div className="p-3 rounded-xl bg-ring/20">
        <IconRun className="!h-6 !w-6" />
      </div>
      <div className="flex flex-col items-start flex-1">
        <TinyMuted className="py-1">Motion</TinyMuted>
        <div className="flex items-center gap-1 h-4">
          <Small className="leading-5">Auto</Small>
        </div>
      </div>
    </div>
    <IconChevronRight size={16} />
  </div>
);

export function MotionSelector() {
  const { isDesktop } = useBreakpoint();

  if (isDesktop) {
    return (
      <Popover>
        <PopoverTrigger asChild>{trigger}</PopoverTrigger>
        <PopoverContent
          side="right"
          align="start"
          className="p-3 w-72 flex flex-col gap-2 rounded-xl mb-4 ml-1"
        >
          <H4 className="text-base px-2">Motion</H4>
          {motionList}
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="outline-none">
        <DrawerHeader>
          <DrawerTitle>Motion</DrawerTitle>
        </DrawerHeader>
        <div className="p-3 pb-8">{motionList}</div>
      </DrawerContent>
    </Drawer>
  );
}
