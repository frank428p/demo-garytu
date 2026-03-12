'use client';

import { IconVoiceBars } from '../icons/IconVoiceBars';
import { Switch } from '../ui/switch';
import { Small, TinyMuted } from '../ui/typography';

export function AudioSelector() {
  return (
    <div className="flex-1 flex justify-between h-auto rounded-xl p-2 bg-secondary items-center hover:bg-secondary/80 transition-colors cursor-pointer">
      <div className="flex gap-2 flex-1">
        <div className="p-3 rounded-xl bg-background/20">
          <IconVoiceBars className="!h-6 !w-6" />
        </div>
        <div className="flex flex-col items-start flex-1">
          <TinyMuted className="py-1">Audio</TinyMuted>
          <div className="flex items-center gap-1 h-4">
            <Small className="leading-5">Off</Small>
          </div>
        </div>
      </div>

      <Switch id="audio" />
    </div>
  );
}
