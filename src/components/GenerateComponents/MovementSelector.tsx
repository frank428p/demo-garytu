'use client';

import { IconCamera, IconChevronRight } from '@tabler/icons-react';
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
import type { CameraPreset, CameraMovementType } from '@/@core/types/config';

type MovementOption =
  | { type: 'auto' }
  | { type: 'preset'; value: CameraPreset }
  | { type: 'advanced'; value: CameraMovementType };

const PRESETS: { value: CameraPreset; label: string }[] = [
  { value: 'down_back', label: 'Down Back' },
  { value: 'forward_up', label: 'Forward Up' },
  { value: 'right_turn_forward', label: 'Right Turn Forward' },
  { value: 'left_turn_forward', label: 'Left Turn Forward' },
];

const ADVANCED: { value: CameraMovementType; label: string }[] = [
  { value: 'horizontal', label: 'Horizontal' },
  { value: 'vertical', label: 'Vertical' },
  { value: 'pan', label: 'Pan' },
  { value: 'tilt', label: 'Tilt' },
  { value: 'roll', label: 'Roll' },
  { value: 'zoom', label: 'Zoom' },
];

const movementList = (
  <List>
    <ListItem className="p-2">
      <div className="flex gap-2 items-center">
        <div className="rounded-lg bg-ring/20 p-2">
          <IconCamera className="!h-4 !w-4" />
        </div>
        <div className="flex flex-col">
          <Tiny>Auto</Tiny>
          <TinyMuted>No camera control</TinyMuted>
        </div>
      </div>
    </ListItem>

    {PRESETS.map((preset) => (
      <ListItem key={preset.value} className="p-2">
        <div className="flex gap-2 items-center">
          <div className="rounded-lg bg-ring/20 p-2">
            <IconCamera className="!h-4 !w-4" />
          </div>
          <div className="flex flex-col">
            <Tiny>{preset.label}</Tiny>
            <TinyMuted>Preset</TinyMuted>
          </div>
        </div>
      </ListItem>
    ))}

    {ADVANCED.map((adv) => (
      <ListItem key={adv.value} className="p-2">
        <div className="flex gap-2 items-center">
          <div className="rounded-lg bg-ring/20 p-2">
            <IconCamera className="!h-4 !w-4" />
          </div>
          <div className="flex flex-col">
            <Tiny>{adv.label}</Tiny>
            <TinyMuted>Advanced</TinyMuted>
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
        <IconCamera className="!h-6 !w-6" />
      </div>
      <div className="flex flex-col items-start flex-1">
        <TinyMuted className="py-1">Movement</TinyMuted>
        <div className="flex items-center gap-1 h-4">
          <Small className="leading-5">Auto</Small>
        </div>
      </div>
    </div>
    <IconChevronRight size={16} />
  </div>
);

export function MovementSelector() {
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
          <H4 className="text-base px-2">Movement</H4>
          {movementList}
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="outline-none">
        <DrawerHeader>
          <DrawerTitle>Movement</DrawerTitle>
        </DrawerHeader>
        <div className="p-3 pb-8">{movementList}</div>
      </DrawerContent>
    </Drawer>
  );
}
