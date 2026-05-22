'use client';

import { useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import { FrameUploader } from './FrameUploader';

type MediaUploadMode = 'element' | 'frames' | 'both';

export function MediaUploadSelector({ mode = 'both' }: { mode?: MediaUploadMode }) {
  const [tab, setTab] = useState<'Elements' | 'Frames'>('Elements');

  const elementUploader = (
    <FrameUploader
      label="Add consistent element"
      description="Character, person or object"
      required
      multiple
    />
  );

  const framesUploader = (
    <div className="flex gap-2">
      <FrameUploader label="Add a start frame" required />
      <FrameUploader label="Add an end frame" />
    </div>
  );

  return (
    <div className="flex flex-col gap-2 p-2 bg-card rounded-xl">
      {mode === 'element' && elementUploader}

      {mode === 'frames' && framesUploader}

      {mode === 'both' && (
        <>
          <ToggleGroup
            type="single"
            variant="segmented"
            value={tab}
            onValueChange={(v) => v && setTab(v as typeof tab)}
          >
            {(['Elements', 'Frames'] as const).map((t) => (
              <ToggleGroupItem key={t} value={t}>
                {t}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          {tab === 'Elements' ? elementUploader : framesUploader}
        </>
      )}
    </div>
  );
}
