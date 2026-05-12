'use client';

import { useState, useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { IconInfoCircle, IconPencil } from '@tabler/icons-react';
import { Button } from '../ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from '../ui/drawer';
import { H4, Tiny } from '../ui/typography';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import { ScrollArea } from '../ui/scroll-area';
import { useBreakpoint } from '@/@core/hooks/useBreakpoint';
import { Alert, AlertTitle } from '../ui/alert';
import { webConfigAtom } from '@/@core/store/configAtoms';
import type { CustomEffectSelector } from '@/@core/types/common';

function StyleItem({ item }: { item: CustomEffectSelector }) {
  return (
    <ToggleGroupItem
      value={item.uuid}
      className="group relative cursor-pointer rounded-xl overflow-hidden aspect-[3/4] ring-2 ring-transparent hover:ring-ring data-[state=on]:ring-primary transition-all duration-200 h-auto p-0 border-0 bg-transparent hover:bg-transparent"
    >
      {item.cover?.url && (
        <video
          src={item.cover.url}
          loop
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-2 text-left">
        <span className="text-white text-[14px] font-extrabold tracking-wide leading-tight">
          {item.name}
        </span>
      </div>
    </ToggleGroupItem>
  );
}

function StyleGrid({
  items,
  value,
  onChange,
}: {
  items: CustomEffectSelector[];
  value: string;
  onChange: (v: string) => void;
}) {
  const { isDesktop, isTablet } = useBreakpoint();
  const cols = isDesktop ? 4 : isTablet ? 3 : 3;

  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={(v) => onChange(v)}
      className="grid gap-2 p-0.5 items-start justify-start"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {items.map((item) => (
        <StyleItem key={item.uuid} item={item} />
      ))}
    </ToggleGroup>
  );
}

export function StyleSelector() {
  const { isDesktop } = useBreakpoint();
  const webConfig = useAtomValue(webConfigAtom);
  const [selected, setSelected] = useState('');

  const styles = useMemo(
    () =>
      (webConfig?.video_selectors ?? [])
        .filter((s) => s.selector_type === 'STYLE')
        .sort((a, b) => a.position - b.position),
    [webConfig],
  );

  const selectedItem = styles.find((s) => s.uuid === selected) ?? styles[0];

  const trigger = (
    <div className="h-25 w-full aspect-auto lg:aspect-[2.3] cursor-pointer relative group select-none overflow-hidden rounded-xl">
      {selectedItem?.cover?.url && (
        <video
          src={selectedItem.cover.url}
          loop
          autoPlay
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
        />
      )}
      <div className="absolute w-full bottom-0 px-3 py-2">
        <H4 className="text-foreground font-extrabold">
          {(selectedItem?.name ?? '').toUpperCase()}
        </H4>
      </div>
      <Button className="absolute top-2 right-2 border-none py-1 px-2 h-auto flex items-center gap-1 rounded-full bg-white/10 backdrop-blur-sm hover:bg-primary">
        <IconPencil className="!size-4" />
        <Tiny className="text-[12px] leading-normal">Change</Tiny>
      </Button>
    </div>
  );

  if (isDesktop) {
    return (
      <Popover>
        <PopoverTrigger asChild>{trigger}</PopoverTrigger>
        <PopoverContent
          side="right"
          align="start"
          className="min-w-[580px] w-[40vw] rounded-xl mb-4 ml-1 p-0 focus:outline-none"
        >
          <div className="p-4">
            <Alert className="w-full bg-secondary">
              <IconInfoCircle size={24} />
              <AlertTitle>
                Selecting General will generate results based on your prompt and
                the AI model.
              </AlertTitle>
            </Alert>
          </div>
          <ScrollArea className="max-h-[calc(100vh-200px)] h-150 px-4 pb-4 pt-0">
            <StyleGrid items={styles} value={selected} onChange={setSelected} />
          </ScrollArea>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="max-h-[50vh] bg-card">
        <DrawerHeader>
          <Alert className="w-full bg-accent">
            <IconInfoCircle size={24} />
            <AlertTitle>
              Selecting General will generate results based on your prompt and
              the AI model.
            </AlertTitle>
          </Alert>
        </DrawerHeader>
        <ScrollArea className="max-h-[50vh] h-150 p-3 pt-0 pb-8">
          <StyleGrid items={styles} value={selected} onChange={setSelected} />
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}
