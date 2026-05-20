'use client';

import { useState, useMemo } from 'react';
import { Slider } from '../ui/slider';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import { Body, H4, Large, Tiny } from '../ui/typography';
import { cn } from '@/lib/utils';
import { Checkbox } from '../ui/checkbox';
import { formatDate } from '@/lib/date';

const MOCK_DATA = [
  {
    uuid: 'mock-1',
    url: '/images/gallery/16-to-9_1.mp4',
    thumbnail_url: '/images/gallery/16-to-9_1.mp4',
    file_type: 'VIDEO',
    created_time: '2026-05-20T14:30:00Z',
  },
  {
    uuid: 'mock-2',
    url: '/images/gallery/1-to-1_1.mp4',
    thumbnail_url: '/images/gallery/1-to-1_1.mp4',
    file_type: 'VIDEO',
    created_time: '2026-05-20T10:00:00Z',
  },
  {
    uuid: 'mock-3',
    url: '/images/gallery/9-to-16_1.mp4',
    thumbnail_url: '/images/gallery/9-to-16_1.mp4',
    file_type: 'VIDEO',
    created_time: '2026-05-20T09:15:00Z',
  },
  {
    uuid: 'mock-4',
    url: '/images/gallery/img-01.jpg',
    thumbnail_url: '/images/gallery/img-01.jpg',
    file_type: 'IMAGE',
    created_time: '2026-05-20T08:00:00Z',
  },
  {
    uuid: 'mock-5',
    url: '/images/gallery/img-02.jpg',
    thumbnail_url: '/images/gallery/img-02.jpg',
    file_type: 'IMAGE',
    created_time: '2026-05-20T07:30:00Z',
  },
  {
    uuid: 'mock-6',
    url: '/images/gallery/16-to-9_2.mp4',
    thumbnail_url: '/images/gallery/16-to-9_2.mp4',
    file_type: 'VIDEO',
    created_time: '2026-05-19T17:00:00Z',
  },
  {
    uuid: 'mock-7',
    url: '/images/gallery/1-to-1_2.mp4',
    thumbnail_url: '/images/gallery/1-to-1_2.mp4',
    file_type: 'VIDEO',
    created_time: '2026-05-19T15:30:00Z',
  },
  {
    uuid: 'mock-8',
    url: '/images/gallery/img-03.jpg',
    thumbnail_url: '/images/gallery/img-03.jpg',
    file_type: 'IMAGE',
    created_time: '2026-05-19T13:00:00Z',
  },
  {
    uuid: 'mock-9',
    url: '/images/gallery/img-04.jpg',
    thumbnail_url: '/images/gallery/img-04.jpg',
    file_type: 'IMAGE',
    created_time: '2026-05-19T11:00:00Z',
  },
  {
    uuid: 'mock-10',
    url: '/images/gallery/img-05.jpg',
    thumbnail_url: '/images/gallery/img-05.jpg',
    file_type: 'IMAGE',
    created_time: '2026-05-19T09:00:00Z',
  },
  {
    uuid: 'mock-11',
    url: '/images/gallery/9-to-16_2.mp4',
    thumbnail_url: '/images/gallery/9-to-16_2.mp4',
    file_type: 'VIDEO',
    created_time: '2026-05-18T18:00:00Z',
  },
  {
    uuid: 'mock-12',
    url: '/images/gallery/img-06.jpg',
    thumbnail_url: '/images/gallery/img-06.jpg',
    file_type: 'IMAGE',
    created_time: '2026-05-18T16:00:00Z',
  },
  {
    uuid: 'mock-13',
    url: '/images/gallery/img-07.jpg',
    thumbnail_url: '/images/gallery/img-07.jpg',
    file_type: 'IMAGE',
    created_time: '2026-05-18T14:00:00Z',
  },
  {
    uuid: 'mock-14',
    url: '/images/gallery/img-08.jpg',
    thumbnail_url: '/images/gallery/img-08.jpg',
    file_type: 'IMAGE',
    created_time: '2026-05-18T12:00:00Z',
  },
  {
    uuid: 'mock-15',
    url: '/images/gallery/img-09.jpg',
    thumbnail_url: '/images/gallery/img-09.jpg',
    file_type: 'IMAGE',
    created_time: '2026-05-18T10:00:00Z',
  },
  {
    uuid: 'mock-16',
    url: '/images/gallery/img-10.jpg',
    thumbnail_url: '/images/gallery/img-10.jpg',
    file_type: 'IMAGE',
    created_time: '2026-05-17T18:00:00Z',
  },
  {
    uuid: 'mock-17',
    url: '/images/gallery/img-11.jpg',
    thumbnail_url: '/images/gallery/img-11.jpg',
    file_type: 'IMAGE',
    created_time: '2026-05-17T16:00:00Z',
  },
  {
    uuid: 'mock-18',
    url: '/images/gallery/img-12.jpg',
    thumbnail_url: '/images/gallery/img-12.jpg',
    file_type: 'IMAGE',
    created_time: '2026-05-17T14:00:00Z',
  },
  {
    uuid: 'mock-19',
    url: '/images/gallery/img-13.jpg',
    thumbnail_url: '/images/gallery/img-13.jpg',
    file_type: 'IMAGE',
    created_time: '2026-05-17T12:00:00Z',
  },
  {
    uuid: 'mock-20',
    url: '/images/gallery/img-14.jpg',
    thumbnail_url: '/images/gallery/img-14.jpg',
    file_type: 'IMAGE',
    created_time: '2026-05-17T10:00:00Z',
  },
  {
    uuid: 'mock-21',
    url: '/images/gallery/img-15.jpg',
    thumbnail_url: '/images/gallery/img-15.jpg',
    file_type: 'IMAGE',
    created_time: '2026-05-16T18:00:00Z',
  },
  {
    uuid: 'mock-22',
    url: '/images/gallery/img-16.jpg',
    thumbnail_url: '/images/gallery/img-16.jpg',
    file_type: 'IMAGE',
    created_time: '2026-05-16T16:00:00Z',
  },
  {
    uuid: 'mock-23',
    url: '/images/gallery/img-17.jpg',
    thumbnail_url: '/images/gallery/img-17.jpg',
    file_type: 'IMAGE',
    created_time: '2026-05-16T14:00:00Z',
  },
  {
    uuid: 'mock-24',
    url: '/images/gallery/img-18.jpg',
    thumbnail_url: '/images/gallery/img-18.jpg',
    file_type: 'IMAGE',
    created_time: '2026-05-16T12:00:00Z',
  },
  {
    uuid: 'mock-25',
    url: '/images/gallery/img-19.jpg',
    thumbnail_url: '/images/gallery/img-19.jpg',
    file_type: 'IMAGE',
    created_time: '2026-05-16T10:00:00Z',
  },
  {
    uuid: 'mock-26',
    url: '/images/gallery/img-20.jpg',
    thumbnail_url: '/images/gallery/img-20.jpg',
    file_type: 'IMAGE',
    created_time: '2026-05-15T18:00:00Z',
  },
  {
    uuid: 'mock-27',
    url: '/images/gallery/img-03.jpg',
    thumbnail_url: '/images/gallery/img-03.jpg',
    file_type: 'IMAGE',
    created_time: '2026-05-15T16:00:00Z',
  },
  {
    uuid: 'mock-28',
    url: '/images/gallery/img-06.jpg',
    thumbnail_url: '/images/gallery/img-06.jpg',
    file_type: 'IMAGE',
    created_time: '2026-05-15T14:00:00Z',
  },
  {
    uuid: 'mock-29',
    url: '/images/gallery/img-09.jpg',
    thumbnail_url: '/images/gallery/img-09.jpg',
    file_type: 'IMAGE',
    created_time: '2026-05-15T12:00:00Z',
  },
  {
    uuid: 'mock-30',
    url: '/images/gallery/img-12.jpg',
    thumbnail_url: '/images/gallery/img-12.jpg',
    file_type: 'IMAGE',
    created_time: '2026-05-15T10:00:00Z',
  },
];

type AssetData = (typeof MOCK_DATA)[0];
type FileTypeFilter = 'All' | 'Images' | 'Videos';

function AssetCard({
  item,
  selected,
  onToggle,
}: {
  item: AssetData;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={cn(
        'relative group aspect-square rounded-lg overflow-hidden cursor-pointer bg-muted ring-2 ring-transparent transition-[box-shadow] duration-150',
        selected && 'ring-foreground',
      )}
      onClick={onToggle}
    >
      {item.file_type === 'VIDEO' ? (
        <video
          src={item.url}
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.url} alt="" className="w-full h-full object-cover" />
      )}

      <div
        className={cn(
          'absolute inset-0 bg-black/25 transition-opacity duration-150',
          selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
        )}
      />

      <div
        className={cn(
          'absolute top-1.5 left-1.5 transition-opacity duration-150 pointer-events-none',
          selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
        )}
      >
        <Checkbox
          checked={selected}
          className="bg-black/30 border-white/80 backdrop-blur-sm size-5"
        />
      </div>
    </div>
  );
}

export function AssetsPanel() {
  const [filter, setFilter] = useState<FileTypeFilter>('All');
  const [gridSize, setGridSize] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const cols = 14 - gridSize * 2; // gridSize 1→12, 2→9, 3→6, 4→3

  const filtered = useMemo(() => {
    if (filter === 'Images')
      return MOCK_DATA.filter((d) => d.file_type === 'IMAGE');
    if (filter === 'Videos')
      return MOCK_DATA.filter((d) => d.file_type === 'VIDEO');
    return MOCK_DATA;
  }, [filter]);

  const grouped = useMemo(() => {
    const map = new Map<string, AssetData[]>();
    filtered.forEach((item) => {
      const key = item.created_time.split('T')[0];
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(item);
    });
    return Array.from(map.entries()).sort(([a], [b]) => b.localeCompare(a));
  }, [filtered]);

  const toggleSelect = (uuid: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(uuid)) next.delete(uuid);
      else next.add(uuid);
      return next;
    });
  };

  return (
    <div className="bg-card/60 rounded-xl max-h-[calc(100vh-56px-12px)] h-full flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 shrink-0">
        <div className="flex">
          <ToggleGroup
            type="single"
            size="sm"
            variant="segmented"
            value={filter}
            onValueChange={(v) => v && setFilter(v as FileTypeFilter)}
          >
            {(['All', 'Images', 'Videos'] as const).map((f) => (
              <ToggleGroupItem key={f} value={f} className="px-5 h-7">
                {f}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <div className="flex flex-1 items-center justify-end">
          <Slider
            value={[gridSize]}
            onValueChange={([v]) => setGridSize(v)}
            max={4}
            min={1}
            step={1}
            className="w-full max-w-[150px]"
          />
        </div>
      </div>

      <div className="overflow-y-auto flex-1 px-4 pb-4 space-y-6">
        {grouped.map(([dateKey, items]) => (
          <div key={dateKey}>
            <Body className="text-foreground font-bold mb-2 block">
              {formatDate(dateKey)}
            </Body>
            <div
              className="grid gap-3"
              style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
            >
              {items.map((item) => (
                <AssetCard
                  key={item.uuid}
                  item={item}
                  selected={selected.has(item.uuid)}
                  onToggle={() => toggleSelect(item.uuid)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
