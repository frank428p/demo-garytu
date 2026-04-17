'use client';

import { IconPencil } from '@tabler/icons-react';
import { Button } from '../ui/button';
import { H4, Small, Tiny } from '../ui/typography';

export function StyleSelector() {
  return (
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
        {/* <Small>Kling 2.6</Small> */}
      </div>
      <Button className="absolute top-2 right-2 border-none py-1 px-2 h-auto flex items-center gap-1 rounded-full bg-white/10 backdrop-blur-sm hover:bg-primary">
        <IconPencil className="!size-4" />
        <Tiny className="text-[12px] leading-normal">Change</Tiny>
      </Button>
    </div>
  );
}
