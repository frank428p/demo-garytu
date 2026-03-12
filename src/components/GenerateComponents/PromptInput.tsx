'use client';

import { useState } from 'react';
import { Toggle } from '../ui/toggle';
import { TinyMuted, Tiny } from '../ui/typography';
import { cn } from '@/lib/utils';
import { IconPencilOff } from '@tabler/icons-react';

export function PromptInput() {
  const [showNegative, setShowNegative] = useState(false);

  return (
    <div className="bg-background rounded-lg gap-2">
      <div
        contentEditable
        suppressContentEditableWarning
        data-placeholder="Describe scene transitions, camera movement trajectories, or character actions with text to precisely control the entire video from beginning to end."
        className="focus:outline-none text-sm min-h-30 max-h-65 overflow-y-auto p-3"
        onInput={(e) => {
          if (e.currentTarget.innerHTML === '<br>') {
            e.currentTarget.innerHTML = '';
          }
        }}
      ></div>

      {showNegative && (
        <div className="flex flex-col gap-1 px-3 pb-3">
          <TinyMuted className="font-bold">Negative Prompt</TinyMuted>
          <div
            contentEditable
            suppressContentEditableWarning
            data-placeholder='List what to exclude from your video (e.g. "trees", "blur")'
            className="focus:outline-none text-sm min-h-15 max-h-20 overflow-y-auto"
            onInput={(e) => {
              if (e.currentTarget.innerHTML === '<br>') {
                e.currentTarget.innerHTML = '';
              }
            }}
          ></div>
        </div>
      )}

      <div className="px-3 pb-3">
        <Toggle
          pressed={showNegative}
          onPressedChange={setShowNegative}
          variant="outline"
          size="sm"
          className={cn(
            'rounded-full py-1 px-2 h-auto bg-background flex items-center gap-1',
            showNegative ? 'text-foreground' : 'text-muted-foreground',
          )}
        >
          <IconPencilOff className="!size-3" />
          <Tiny className="text-[10px]">Negative Prompt</Tiny>
        </Toggle>
      </div>
    </div>
  );
}
