'use client';

import { IconBrackets, IconInfoCircle, IconPencil } from '@tabler/icons-react';
import { Button } from '../ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer';
import { Body, H4, Muted, Tiny } from '../ui/typography';
import { ScrollArea } from '../ui/scroll-area';
import { useBreakpoint } from '@/@core/hooks/useBreakpoint';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

type Style = {
  id: string;
  name: string;
  src: string;
  requiresStartEnd: boolean;
};

const STYLES: Style[] = [
  {
    id: 'general',
    name: 'GENERAL',
    src: '/video/style_general.mp4',
    requiresStartEnd: false,
  },
  {
    id: 'raven_transition',
    name: 'RAVEN TRANSITION',
    src: '/video/style_raven_transition.mp4',
    requiresStartEnd: true,
  },
  {
    id: 'morph',
    name: 'MORPH',
    src: '/video/style_morph.mp4',
    requiresStartEnd: true,
  },
  {
    id: 'animalization',
    name: 'ANIMALIZATION',
    src: '/video/style_animalization.mp4',
    requiresStartEnd: false,
  },
  {
    id: 'giant_grab',
    name: 'GIANT GRAB',
    src: '/video/style_giant_grab.mp4',
    requiresStartEnd: false,
  },
  {
    id: 'air_bending',
    name: 'AIR BENDING',
    src: '/video/style_air_bending.mp4',
    requiresStartEnd: false,
  },
  {
    id: 'shadow_smoke',
    name: 'SHADOW SMOKE',
    src: '/video/style_shadow_smoke.mp4',
    requiresStartEnd: true,
  },
  {
    id: 'water_bending',
    name: 'WATER BENDING',
    src: '/video/style_water_bending.mp4',
    requiresStartEnd: true,
  },
  {
    id: 'firelava',
    name: 'FIRELAVA',
    src: '/video/style_firelava.mp4',
    requiresStartEnd: true,
  },
  {
    id: 'flying_cam_transition',
    name: 'FLYING CAM TRANSITION',
    src: '/video/style_flying_cam_transition.mp4',
    requiresStartEnd: true,
  },
  {
    id: 'giant_grab',
    name: 'GIANT GRAB',
    src: '/video/style_giant_grab.mp4',
    requiresStartEnd: false,
  },
  {
    id: 'air_bending',
    name: 'AIR BENDING',
    src: '/video/style_air_bending.mp4',
    requiresStartEnd: false,
  },
  {
    id: 'shadow_smoke',
    name: 'SHADOW SMOKE',
    src: '/video/style_shadow_smoke.mp4',
    requiresStartEnd: true,
  },
  {
    id: 'water_bending',
    name: 'WATER BENDING',
    src: '/video/style_water_bending.mp4',
    requiresStartEnd: true,
  },
  {
    id: 'firelava',
    name: 'FIRELAVA',
    src: '/video/style_firelava.mp4',
    requiresStartEnd: true,
  },
  {
    id: 'flying_cam_transition',
    name: 'FLYING CAM TRANSITION',
    src: '/video/style_flying_cam_transition.mp4',
    requiresStartEnd: true,
  },
  {
    id: 'giant_grab',
    name: 'GIANT GRAB',
    src: '/video/style_giant_grab.mp4',
    requiresStartEnd: false,
  },
  {
    id: 'air_bending',
    name: 'AIR BENDING',
    src: '/video/style_air_bending.mp4',
    requiresStartEnd: false,
  },
  {
    id: 'shadow_smoke',
    name: 'SHADOW SMOKE',
    src: '/video/style_shadow_smoke.mp4',
    requiresStartEnd: true,
  },
  {
    id: 'water_bending',
    name: 'WATER BENDING',
    src: '/video/style_water_bending.mp4',
    requiresStartEnd: true,
  },
  {
    id: 'firelava',
    name: 'FIRELAVA',
    src: '/video/style_firelava.mp4',
    requiresStartEnd: true,
  },
  {
    id: 'flying_cam_transition',
    name: 'FLYING CAM TRANSITION',
    src: '/video/style_flying_cam_transition.mp4',
    requiresStartEnd: true,
  },
  {
    id: 'giant_grab',
    name: 'GIANT GRAB',
    src: '/video/style_giant_grab.mp4',
    requiresStartEnd: false,
  },
  {
    id: 'air_bending',
    name: 'AIR BENDING',
    src: '/video/style_air_bending.mp4',
    requiresStartEnd: false,
  },
  {
    id: 'shadow_smoke',
    name: 'SHADOW SMOKE',
    src: '/video/style_shadow_smoke.mp4',
    requiresStartEnd: true,
  },
  {
    id: 'water_bending',
    name: 'WATER BENDING',
    src: '/video/style_water_bending.mp4',
    requiresStartEnd: true,
  },
  {
    id: 'firelava',
    name: 'FIRELAVA',
    src: '/video/style_firelava.mp4',
    requiresStartEnd: true,
  },
  {
    id: 'flying_cam_transition',
    name: 'FLYING CAM TRANSITION',
    src: '/video/style_flying_cam_transition.mp4',
    requiresStartEnd: true,
  },
];

function StyleCard({ style }: { style: Style }) {
  return (
    <div className="relative cursor-pointer rounded-xl overflow-hidden aspect-[3/4] group ring-2 ring-transparent hover:ring-white/40 transition-all duration-200">
      <video
        src={style.src}
        loop
        autoPlay
        muted
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

      {style.requiresStartEnd && (
        <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-black/50 backdrop-blur-sm px-2 py-1">
          <IconBrackets className="size-3 text-white" />
          <span className="text-[10px] text-white font-medium leading-none">
            Start &amp; End
          </span>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-2">
        <span className="text-white text-[11px] font-extrabold tracking-wide leading-tight">
          {style.name}
        </span>
      </div>
    </div>
  );
}

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

function StyleGrid() {
  const { isDesktop, isTablet } = useBreakpoint();
  const cols = isDesktop ? 4 : isTablet ? 3 : 3;

  return (
    <div>
      <div className="flex flex-col px-1"></div>
      <div
        className="grid gap-2 p-0.5"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {STYLES.map((style) => (
          <StyleCard key={style.id} style={style} />
        ))}
      </div>
    </div>
  );
}

export function StyleSelector() {
  const { isDesktop } = useBreakpoint();

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
            <Alert className="w-full bg-accent">
              <IconInfoCircle size={24} />
              <AlertTitle>
                Selecting General will generate results based on your prompt and
                the AI model.
              </AlertTitle>
            </Alert>
          </div>
          <ScrollArea className="max-h-[calc(100vh-200px)] h-150 px-4 pb-4 pt-0 focus:outline-none">
            <StyleGrid />
          </ScrollArea>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="max-h-[50vh]">
        <DrawerHeader>
          <Alert className="w-full bg-accent">
            <IconInfoCircle size={24} />
            <AlertTitle>
              Selecting General will generate results based on your prompt and
              the AI model.
            </AlertTitle>
          </Alert>
        </DrawerHeader>
        <ScrollArea className="max-h-[50vh] h-150 p-3">
          <StyleGrid />
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}
