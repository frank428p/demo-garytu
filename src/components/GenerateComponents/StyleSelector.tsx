'use client';

import { IconPencil } from '@tabler/icons-react';
import { Button } from '../ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer';
import { H4, Tiny } from '../ui/typography';
import { useBreakpoint } from '@/@core/hooks/useBreakpoint';

const trigger = (
  <div className="h-25 w-full aspect-auto lg:aspect-[2.3] cursor-pointer relative group select-none overflow-hidden rounded-xl">
    <video
      src={'/video/style_general.mp4'}
      loop
      autoPlay
      muted
      playsInline
      preload="metadata"
      className="w-full h-full object-cover"
    />
    <div className="absolute w-full bottom-[0px] p-3">
      <H4 className="text-foreground font-extrabold">
        {'Aerial Pullback'.toUpperCase()}
      </H4>
    </div>
    <Button className="absolute top-2 right-2 border-none py-1 px-2 h-auto flex items-center gap-1 rounded-full bg-white/10 backdrop-blur-sm hover:bg-primary">
      <IconPencil className="!size-4" />
      <Tiny className="text-[12px] leading-normal">Change</Tiny>
    </Button>
  </div>
);

const content = (
  <div className="flex flex-col gap-2">
    {/* Style options go here */}
  </div>
);

export function StyleSelector() {
  const { isDesktop } = useBreakpoint();

  if (isDesktop) {
    return (
      <Popover>
        <PopoverTrigger asChild>{trigger}</PopoverTrigger>
        <PopoverContent
          side="right"
          align="start"
          className="p-3 w-85 flex flex-col gap-4 rounded-xl mb-4 ml-1"
        >
          {content}
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Style</DrawerTitle>
        </DrawerHeader>
        <div className="p-3 pb-8">{content}</div>
      </DrawerContent>
    </Drawer>
  );
}
