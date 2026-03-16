'use client';

import { useRef, useState } from 'react';
import { IconPhoto, IconX } from '@tabler/icons-react';
import { Tiny, TinyMuted } from '../ui/typography';
import { cn } from '@/lib/utils';

type Props = {
  label: string;
  required?: boolean;
};

export function FrameUploader({ label, required }: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const remove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div
      className={cn(
        'relative flex-1 h-28 rounded-xl overflow-hidden cursor-pointer transition-colors flex items-center justify-center',
        'border border-dashed border-border',
        dragging && 'border-[1.5px] border-solid border-primary bg-primary/5',
        !preview && 'bg-secondary hover:bg-secondary/80',
      )}
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />

      {preview ? (
        <>
          <img
            src={preview}
            alt={label}
            className="w-full h-full object-contain aspect-video"
          />
          <button
            onClick={remove}
            className="absolute cursor-pointer top-1.5 right-1.5 rounded-full bg-black/50 p-0.5 hover:bg-black/70 transition-colors"
          >
            <IconX size={12} className="text-white" />
          </button>
          {/* <div className="absolute bottom-0 left-0 right-0 px-2 py-1 bg-gradient-to-t from-black/60 to-transparent">
            <TinyMuted className="text-white/80">{label}</TinyMuted>
          </div> */}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-1.5">
          <div className="rounded-full bg-ring/20 p-2">
            <IconPhoto size={16} className="text-muted-foreground" />
          </div>
          <Tiny className="text-muted-foreground font-medium">{label}</Tiny>
          {/* <Tiny className="text-muted-foreground font-medium">
            Click or drag here
          </Tiny> */}

          {/* {required ? (
            <TinyMuted>Required</TinyMuted>
          ) : (
            <TinyMuted>Optional</TinyMuted>
          )} */}
        </div>
      )}

      {!preview && (
        <div className="p-2 bg-white/10 backdrop-blur-sm absolute top-[4px] right-1 px-2 py-1 h-6 flex items-center rounded-xl">
          <TinyMuted className="!text-[10px]">Optional</TinyMuted>
        </div>
      )}
    </div>
  );
}
