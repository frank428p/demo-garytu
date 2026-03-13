'use client';

import { Button } from '../ui/button';
import {
  IconSparkles2Filled,
  IconChevronDown,
  IconCamera,
  IconRun,
  IconMinus,
  IconPlus,
} from '@tabler/icons-react';
import { useState } from 'react';
import { Small, TinyMuted } from '../ui/typography';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';

// components
import { StyleSelector } from '../GenerateComponents/StyleSelector';
import { ModelSelector } from '../GenerateComponents/ModelSelector';
import { PromptInput } from '../GenerateComponents/PromptInput';
import { AudioSelector } from '../GenerateComponents/AudioSelector';
import { OutputSettingSelector } from '../GenerateComponents/OutputSettingSelector';

const MAX = 4;

function QuantitySelector() {
  const [count, setCount] = useState(1);
  return (
    <div className="flex items-center gap-2 h-11 px-3 rounded-xl bg-accent shrink-0">
      <button
        onClick={() => setCount((c) => Math.max(1, c - 1))}
        className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
      >
        <IconMinus size={14} />
      </button>
      <span className="text-sm font-medium w-8 text-center">
        {count}/{MAX}
      </span>
      <button
        onClick={() => setCount((c) => Math.min(MAX, c + 1))}
        className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
      >
        <IconPlus size={14} />
      </button>
    </div>
  );
}

const VideoGenerate = () => {
  return (
    <div className="bg-card/60 p-4 rounded-3xl">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <StyleSelector />
          <ModelSelector />
        </div>

        <div className="bg-secondary rounded-lg p-3 flex gap-2">
          <div className="bg-muted-foreground rounded-lg p-4 flex-1 h-15">
            <Small>Start frame</Small>
          </div>
          <div className="bg-muted-foreground rounded-lg p-4 flex-1">
            <Small>End frame</Small>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <PromptInput />

          <div className="flex flex-col md:flex-row lg:flex-row gap-2 p-2 bg-card rounded-xl">
            {/* <div className="w-full md:w-[180px] lg:w-[180px] shrink-0"> */}
            <div className="flex-1 shrink-0">
              <AudioSelector />
            </div>
            <div className="flex-1 shrink-0">
              <OutputSettingSelector />
            </div>
          </div>

          <Collapsible className="rounded-xl data-[state=open]:bg-card">
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="group w-full text-xs rounded-xl hover:bg-transparent data-[state=open]:hover:bg-transparent text-muted-foreground"
              >
                Advanced Setting
                <IconChevronDown className="ml-auto group-data-[state=open]:rotate-180" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="flex items-start gap-2 p-2 pt-0 text-sm">
              <div className="flex-1 flex justify-between h-auto rounded-xl p-2 bg-secondary items-center hover:bg-secondary/80 transition-colors cursor-pointer">
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
              </div>

              <div className="flex-1 flex justify-between h-auto rounded-xl p-2 bg-secondary items-center hover:bg-secondary/80 transition-colors cursor-pointer">
                <div className="flex gap-2 flex-1">
                  <div className="p-3 rounded-xl bg-ring/20">
                    <IconRun className="!h-6 !w-6" />
                  </div>
                  <div className="flex flex-col items-start flex-1">
                    <TinyMuted className="py-1">Motion</TinyMuted>
                    <div className="flex items-center gap-1 h-4">
                      <Small className="leading-5">Off</Small>
                    </div>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        <div className="mt-2 flex items-center gap-2 mb-1">
          <QuantitySelector />
          <Button className="flex-1 flex items-center text-base h-11 shadow-[0_4px_0_0_color-mix(in_oklch,var(--color-primary)_70%,black)] active:translate-y-[3px] transition-all duration-75">
            Generate
            <p className="flex items-center gap-1">
              <IconSparkles2Filled size={16} />
              120
            </p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoGenerate;
