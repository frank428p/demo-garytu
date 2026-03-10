'use client';

import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { IconSparkles2Filled } from '@tabler/icons-react';
import { H4, Small, Tiny } from '../ui/typography';
import { DurationSelector } from '../GenerateComponents/DurationSelector';
import { AspectRatioSelector } from '../GenerateComponents/AspectRatioSelector';
import { OutputSettingSelector } from '../GenerateComponents/OutputSettingSelector';
import { AudioSelector } from '../GenerateComponents/AudioSelector';

const VideoGenerate = () => {
  return (
    <div className="bg-card/70 p-4 rounded-3xl">
      <div className="flex flex-col gap-4">
        <div className="h-40 w-full aspect-[2.3] w-full relative group select-none overflow-hidden rounded-xl">
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
            <H4 className="text-primary font-extrabold">
              {'Aerial Pullback'.toUpperCase()}
            </H4>
            <Small>Kling 2.6</Small>
          </div>
        </div>

        {/* <div className="h-40 w-full aspect-[2.3] w-full relative group select-none overflow-hidden rounded-xl">
          <video
            src={'/video/style_general-2.mp4'}
            loop
            autoPlay
            muted
            playsInline
            preload="metadata"
            className="w-full"
          />
          <div className="absolute w-full bottom-[0px] p-3">
            <H4 className="text-primary font-extrabold">
              {'Aerial Pullback'.toUpperCase()}
            </H4>
            <Small>Kling 2.6</Small>
          </div>
        </div> */}

        {/* <div className="bg-secondary rounded-lg p-3 h-20">
          <H4>Angle</H4>
        </div>

        <div className="bg-secondary rounded-lg p-3 h-20">
          <H4>Motion</H4>
        </div> */}

        <div className="bg-secondary rounded-lg p-3 flex gap-2">
          <div className="bg-muted-foreground rounded-lg p-4 flex-1 h-15">
            <Small>Start frame</Small>
          </div>
          <div className="bg-muted-foreground rounded-lg p-4 flex-1">
            <Small>End frame</Small>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div
            contentEditable
            className="focus:outline-none px-3 py-3 bg-secondary rounded-lg h-[120px] text-sm"
          ></div>

          <div className="flex gap-2">
            <AudioSelector />
            <OutputSettingSelector />
          </div>
        </div>

        <Button className="mt-4 w-full flex items-center text-base h-11 mb-1 shadow-[0_4px_0_0_color-mix(in_oklch,var(--color-primary)_70%,black)] active:translate-y-[3px] transition-all duration-75">
          Generate
          <p className="flex items-center gap-1">
            <IconSparkles2Filled size={16} />
            120
          </p>
        </Button>
      </div>
    </div>
  );
};

export default VideoGenerate;
