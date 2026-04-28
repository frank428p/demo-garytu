'use client';

import { IconChevronRight } from '@tabler/icons-react';
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
import { IconKling } from '../icons/IconKling';
import { List, ListItem } from '../ui/list';
import { useBreakpoint } from '@/@core/hooks/useBreakpoint';

const modelList = (
  <List>
    <ListItem className="p-2">
      <div className="flex gap-2 items-center">
        <div className="rounded-lg bg-ring/20 p-2">
          <IconKling className="!h-4 !w-4" />
        </div>
        <div className="flex flex-col">
          <Tiny>Kling 3.0mni</Tiny>
          <TinyMuted>Enhanced multimodal references</TinyMuted>
        </div>
      </div>
    </ListItem>

    <ListItem className="p-2">
      <div className="flex gap-2 items-center">
        <div className="rounded-lg bg-ring/20 p-2">
          <IconKling className="!h-4 !w-4" />
        </div>
        <div className="flex flex-col">
          <Tiny>Kling 3.0</Tiny>
          <TinyMuted>Enhanced multimodal references</TinyMuted>
        </div>
      </div>
    </ListItem>
  </List>
);

const trigger = (
  <Button
    variant="secondary"
    className="flex w-full justify-between h-auto rounded-xl p-2"
  >
    <div className="flex gap-2 flex-1">
      <div className="p-3 rounded-xl bg-ring/20">
        <IconKling className="!h-6 !w-6" />
      </div>
      <div className="flex flex-col items-start flex-1">
        <TinyMuted className="py-1">Model</TinyMuted>
        <div className="flex items-center gap-1.5 h-4">
          <Small className="leading-5">Kling</Small>
        </div>
      </div>
    </div>
    <IconChevronRight />
  </Button>
);

export function ModelSelector() {
  const { isDesktop } = useBreakpoint();

  if (isDesktop) {
    return (
      <Popover>
        <PopoverTrigger asChild>{trigger}</PopoverTrigger>
        <PopoverContent
          side="right"
          align="start"
          className="p-3 w-100 flex flex-col gap-2 rounded-xl mb-4 ml-1 top-[10px]"
        >
          <H4 className="text-base px-2">Model</H4>
          {modelList}
          <div className="flex flex-col"></div>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Model</DrawerTitle>
        </DrawerHeader>
        <div className="p-3 pb-8">{modelList}</div>
      </DrawerContent>
    </Drawer>
  );
}
