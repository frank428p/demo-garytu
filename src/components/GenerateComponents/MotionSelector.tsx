'use client';

import { useState } from 'react';
import { IconRun, IconChevronRight } from '@tabler/icons-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer';
import Image from 'next/image';
import { H4, Small, Tiny, TinyMuted } from '../ui/typography';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import { ScrollArea } from '../ui/scroll-area';
import { useBreakpoint } from '@/@core/hooks/useBreakpoint';

type MotionOption = {
  value: string;
  label: string;
  src?: string;
};

const MOTIONS: MotionOption[] = [
  { value: 'subtle', label: 'Subtle' },
  { value: 'smooth', label: 'Smooth' },
  { value: 'slow', label: 'Slow' },
  { value: 'normal', label: 'Normal' },
  { value: 'fast', label: 'Fast' },
  { value: 'dynamic', label: 'Dynamic' },
  { value: 'shake', label: 'Shake' },
  { value: 'bounce', label: 'Bounce' },
  { value: 'float', label: 'Float' },
  { value: 'pulse', label: 'Pulse' },
  { value: 'spin', label: 'Spin' },
  { value: 'wave', label: 'Wave' },
];

function MotionGrid({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={(v) => onChange(v)}
      className="grid grid-cols-3 gap-2 p-0.5 items-start justify-start"
    >
      {MOTIONS.map((item) => (
        <ToggleGroupItem
          key={item.value}
          value={item.value}
          className="group flex flex-col gap-1.5 h-auto w-full p-0 bg-transparent hover:bg-transparent hover:text-foreground border-0 data-[state=on]:bg-transparent"
        >
          <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-muted ring-2 ring-transparent group-hover:ring-white/40 group-data-[state=on]:ring-primary group-data-[state=on]:group-hover:ring-primary transition-all duration-150">
            {item.src && (
              <Image
                src={item.src}
                alt={item.label}
                fill
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-data-[state=on]:opacity-100 transition-opacity duration-150">
              <div className="rounded-full bg-primary p-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="!size-3 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
            </div>
          </div>
          <Tiny className="pb-1 text-center w-full leading-tight">
            {item.label}
          </Tiny>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

export function MotionSelector() {
  const { isDesktop } = useBreakpoint();
  const [selected, setSelected] = useState('');

  const selectedLabel =
    MOTIONS.find((m) => m.value === selected)?.label ?? 'Auto';

  const trigger = (
    <div className="flex w-full justify-between h-auto rounded-xl p-2 bg-secondary items-center hover:bg-secondary/80 transition-colors cursor-pointer">
      <div className="flex gap-2 flex-1">
        <div className="p-3 rounded-xl bg-ring/20">
          <IconRun className="!h-6 !w-6" />
        </div>
        <div className="flex flex-col items-start flex-1">
          <TinyMuted className="py-1">Motion</TinyMuted>
          <div className="flex items-center gap-1 h-4">
            <Small className="leading-5">{selectedLabel}</Small>
          </div>
        </div>
      </div>
      <IconChevronRight size={16} />
    </div>
  );

  if (isDesktop) {
    return (
      <Popover>
        <PopoverTrigger asChild>{trigger}</PopoverTrigger>
        <PopoverContent
          side="right"
          align="start"
          className="w-[420px] rounded-xl mb-4 ml-1 p-0"
        >
          <H4 className="text-base p-4">Motion</H4>
          <ScrollArea className="max-h-[calc(100vh-200px)] h-150 px-4 pb-4 pt-0">
            <MotionGrid value={selected} onChange={setSelected} />
          </ScrollArea>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="outline-none max-h-[50vh] bg-card">
        <DrawerHeader>
          <DrawerTitle>Motion</DrawerTitle>
        </DrawerHeader>
        <ScrollArea className="p-3 pb-8 overflow-y-auto max-h-[50vh]">
          <MotionGrid value={selected} onChange={setSelected} />
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}
