'use client';

import { useRef, useState } from 'react';
import { IconPhoto, IconPlus, IconX } from '@tabler/icons-react';
import { Tiny, TinyMuted } from '../ui/typography';
import { cn } from '@/lib/utils';

type Props = {
  label: string;
  description?: string;
  required?: boolean;
  multiple?: boolean;
  maxFiles?: number;
};

function MultiFrameUploader({
  label,
  description,
  maxFiles = 6,
}: {
  label: string;
  description?: string;
  maxFiles?: number;
}) {
  const [previews, setPreviews] = useState<string[]>([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = (files: FileList | null) => {
    if (!files) return;
    const remaining = maxFiles - previews.length;
    const urls = Array.from(files)
      .filter((f) => f.type.startsWith('image/'))
      .slice(0, remaining)
      .map((f) => URL.createObjectURL(f));
    setPreviews((prev) => [...prev, ...urls]);
  };

  const remove = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const isEmpty = previews.length === 0;
  const canAddMore = previews.length < maxFiles;

  return (
    <div
      className={cn(
        'rounded-2xl overflow-hidden transition-colors',
        isEmpty
          ? cn(
              'flex flex-col items-center justify-center gap-3 py-6 cursor-pointer',
              'border border-dashed border-border bg-secondary hover:bg-secondary/80',
              dragging && 'border-primary bg-primary/5',
            )
          : 'bg-secondary/40 p-5',
      )}
      onClick={isEmpty ? () => inputRef.current?.click() : undefined}
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
        multiple
        className="hidden"
        onChange={(e) => addFiles(e.target.files)}
      />

      {isEmpty ? (
        <>
          <div className="flex flex-col items-center justify-center gap-1.5">
            <div className="rounded-full bg-ring/20 p-2">
              <IconPhoto size={16} className="text-muted-foreground" />
            </div>
            <Tiny className="text-foreground font-medium">{label}</Tiny>
            <Tiny className="text-muted-foreground font-medium">
              {description}
            </Tiny>
          </div>
        </>
      ) : (
        <div className="flex flex-wrap gap-2 relative justify-center *:size-12 max-w-[160px] mx-auto">
          {previews.map((src, i) => (
            <div key={i} className="relative rounded-lg overflow-hidden">
              <img
                src={src}
                alt={`${label} ${i + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                onClick={(e) => remove(e, i)}
                className="absolute top-1 right-1 rounded-full bg-black/50 p-0.5 hover:bg-black/70 transition-colors cursor-pointer"
              >
                <IconX size={12} className="text-white" />
              </button>
            </div>
          ))}

          {canAddMore && (
            <div
              onClick={() => inputRef.current?.click()}
              className="rounded-lg bg-secondary hover:bg-secondary/80 flex items-center justify-center cursor-pointer transition-colors"
            >
              <IconPlus size={16} className="text-muted-foreground" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function SingleFrameUploader({ label }: { label: string }) {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setPreview(URL.createObjectURL(file));
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
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
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
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-1.5">
          <div className="rounded-full bg-ring/20 p-2">
            <IconPhoto size={16} className="text-muted-foreground" />
          </div>
          <Tiny className="text-muted-foreground font-medium">{label}</Tiny>
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

export function FrameUploader({
  label,
  description,
  multiple = false,
  maxFiles = 6,
}: Props) {
  if (multiple) {
    return (
      <MultiFrameUploader
        label={label}
        description={description}
        maxFiles={maxFiles}
      />
    );
  }
  return <SingleFrameUploader label={label} />;
}
