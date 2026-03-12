'use client';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface DurationToggleProps {
  options: number[];
  value: number;
  onChange: (value: number) => void;
}

export function DurationToggle({ options, value, onChange }: DurationToggleProps) {
  return (
    <ToggleGroup
      type="single"
      variant="segmented"
      value={String(value)}
      onValueChange={(v) => { if (v) onChange(Number(v)); }}
    >
      {options.map((opt) => (
        <ToggleGroupItem key={opt} value={String(opt)}>
          {opt}s
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
