'use client';

import { useState, useMemo } from 'react';
import { Slider } from '../ui/slider';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import { Body, H4, Large, Tiny } from '../ui/typography';
import { cn } from '@/lib/utils';
import { Checkbox } from '../ui/checkbox';
import {
  IconArrowsDiagonal,
  IconArrowsDiagonalMinimize2,
  IconCheck,
  IconFilterDown,
  IconHeart,
  IconHeartFilled,
  IconPlayerPlayFilled,
  IconStar,
} from '@tabler/icons-react';
import { formatDate } from '@/lib/date';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

const MOCK_DATA = [
  {
    uuid: 'mock-1',
    url: '/images/gallery/16-to-9_1.mp4',
    thumbnail_url: '/images/gallery/16-to-9-cover_1.avif',
    file_type: 'VIDEO',
    created_time: '2026-05-20T14:30:00Z',
    is_favorite: false,
  },
  {
    uuid: 'mock-2',
    url: '/images/gallery/1-to-1_1.mp4',
    thumbnail_url: '/images/gallery/1-to-1-cover_1.avif',
    file_type: 'VIDEO',
    created_time: '2026-05-20T10:00:00Z',
    is_favorite: false,
  },
  {
    uuid: 'mock-3',
    url: '/images/gallery/9-to-16_1.mp4',
    thumbnail_url: '/images/gallery/9-to-16-cover_1.avif',
    file_type: 'VIDEO',
    created_time: '2026-05-20T09:15:00Z',
    is_favorite: false,
  },
  {
    uuid: 'mock-4',
    url: '/images/gallery/img-01.jpg',
    thumbnail_url: '/images/gallery/img-01.jpg',
    file_type: 'IMAGE',
    created_time: '2026-05-20T08:00:00Z',
    is_favorite: false,
  },
  {
    uuid: 'mock-5',
    url: '/images/gallery/img-02.jpg',
    thumbnail_url: '/images/gallery/img-02.jpg',
    file_type: 'IMAGE',
    created_time: '2026-05-20T07:30:00Z',
    is_favorite: false,
  },
  {
    uuid: 'mock-6',
    url: '/images/gallery/16-to-9_2.mp4',
    thumbnail_url: '/images/gallery/16-to-9-cover_2.avif',
    file_type: 'VIDEO',
    created_time: '2026-05-19T17:00:00Z',
    is_favorite: false,
  },
  {
    uuid: 'mock-7',
    url: '/images/gallery/1-to-1_2.mp4',
    thumbnail_url: '/images/gallery/1-to-1-cover_2.avif',
    file_type: 'VIDEO',
    created_time: '2026-05-19T15:30:00Z',
    is_favorite: false,
  },
  {
    uuid: 'mock-8',
    url: '/images/gallery/img-03.jpg',
    thumbnail_url: '/images/gallery/img-03.jpg',
    file_type: 'IMAGE',
    created_time: '2026-05-19T13:00:00Z',
    is_favorite: false,
  },
  {
    uuid: 'mock-9',
    url: '/images/gallery/img-04.jpg',
    thumbnail_url: '/images/gallery/img-04.jpg',
    file_type: 'IMAGE',
    created_time: '2026-05-19T11:00:00Z',
    is_favorite: false,
  },
  {
    uuid: 'mock-10',
    url: '/images/gallery/img-05.jpg',
    thumbnail_url: '/images/gallery/img-05.jpg',
    file_type: 'IMAGE',
    created_time: '2026-05-19T09:00:00Z',
    is_favorite: false,
  },
  {
    uuid: 'mock-11',
    url: '/images/gallery/9-to-16_2.mp4',
    thumbnail_url: '/images/gallery/9-to-16-cover_2.avif',
    file_type: 'VIDEO',
    created_time: '2026-05-18T18:00:00Z',
    is_favorite: false,
  },
  {
    uuid: 'mock-12',
    url: '/images/gallery/img-06.jpg',
    thumbnail_url: '/images/gallery/img-06.jpg',
    file_type: 'IMAGE',
    created_time: '2026-05-18T16:00:00Z',
    is_favorite: false,
  },
  {
    uuid: 'mock-13',
    url: '/images/gallery/img-07.jpg',
    thumbnail_url: '/images/gallery/img-07.jpg',
    file_type: 'IMAGE',
    created_time: '2026-05-18T14:00:00Z',
    is_favorite: false,
  },
  {
    uuid: 'mock-14',
    url: '/images/gallery/img-08.jpg',
    thumbnail_url: '/images/gallery/img-08.jpg',
    file_type: 'IMAGE',
    created_time: '2026-05-18T12:00:00Z',
    is_favorite: false,
  },
  {
    uuid: 'mock-15',
    url: '/images/gallery/img-09.jpg',
    thumbnail_url: '/images/gallery/img-09.jpg',
    file_type: 'IMAGE',
    created_time: '2026-05-18T10:00:00Z',
    is_favorite: false,
  },
  {
    uuid: 'mock-16',
    url: '/images/gallery/img-10.jpg',
    thumbnail_url: '/images/gallery/img-10.jpg',
    file_type: 'IMAGE',
    created_time: '2026-05-17T18:00:00Z',
    is_favorite: false,
  },
  {
    uuid: 'mock-17',
    url: '/images/gallery/img-11.jpg',
    thumbnail_url: '/images/gallery/img-11.jpg',
    file_type: 'IMAGE',
    created_time: '2026-05-17T16:00:00Z',
    is_favorite: false,
  },
  {
    uuid: 'mock-18',
    url: '/images/gallery/img-12.jpg',
    thumbnail_url: '/images/gallery/img-12.jpg',
    file_type: 'IMAGE',
    created_time: '2026-05-17T14:00:00Z',
    is_favorite: false,
  },
  {
    uuid: 'mock-19',
    url: '/images/gallery/img-13.jpg',
    thumbnail_url: '/images/gallery/img-13.jpg',
    file_type: 'IMAGE',
    created_time: '2026-05-17T12:00:00Z',
    is_favorite: false,
  },
  {
    uuid: 'mock-20',
    url: '/images/gallery/img-14.jpg',
    thumbnail_url: '/images/gallery/img-14.jpg',
    file_type: 'IMAGE',
    created_time: '2026-05-17T10:00:00Z',
    is_favorite: false,
  },
  {
    uuid: 'mock-21',
    url: '/images/gallery/img-15.jpg',
    thumbnail_url: '/images/gallery/img-15.jpg',
    file_type: 'IMAGE',
    created_time: '2026-05-16T18:00:00Z',
    is_favorite: false,
  },
  {
    uuid: 'mock-22',
    url: '/images/gallery/img-16.jpg',
    thumbnail_url: '/images/gallery/img-16.jpg',
    file_type: 'IMAGE',
    created_time: '2026-05-16T16:00:00Z',
    is_favorite: false,
  },
  {
    uuid: 'mock-23',
    url: '/images/gallery/img-17.jpg',
    thumbnail_url: '/images/gallery/img-17.jpg',
    file_type: 'IMAGE',
    created_time: '2026-05-16T14:00:00Z',
    is_favorite: false,
  },
  {
    uuid: 'mock-24',
    url: '/images/gallery/img-18.jpg',
    thumbnail_url: '/images/gallery/img-18.jpg',
    file_type: 'IMAGE',
    created_time: '2026-05-16T12:00:00Z',
    is_favorite: false,
  },
  {
    uuid: 'mock-25',
    url: '/images/gallery/img-19.jpg',
    thumbnail_url: '/images/gallery/img-19.jpg',
    file_type: 'IMAGE',
    created_time: '2026-05-16T10:00:00Z',
    is_favorite: false,
  },
  {
    uuid: 'mock-26',
    url: '/images/gallery/img-20.jpg',
    thumbnail_url: '/images/gallery/img-20.jpg',
    file_type: 'IMAGE',
    created_time: '2026-05-15T18:00:00Z',
    is_favorite: false,
  },
  {
    uuid: 'mock-27',
    url: '/images/gallery/img-03.jpg',
    thumbnail_url: '/images/gallery/img-03.jpg',
    file_type: 'IMAGE',
    created_time: '2026-05-15T16:00:00Z',
    is_favorite: false,
  },
  {
    uuid: 'mock-28',
    url: '/images/gallery/img-06.jpg',
    thumbnail_url: '/images/gallery/img-06.jpg',
    file_type: 'IMAGE',
    created_time: '2026-05-15T14:00:00Z',
    is_favorite: false,
  },
  {
    uuid: 'mock-29',
    url: '/images/gallery/img-09.jpg',
    thumbnail_url: '/images/gallery/img-09.jpg',
    file_type: 'IMAGE',
    created_time: '2026-05-15T12:00:00Z',
    is_favorite: false,
  },
  {
    uuid: 'mock-30',
    url: '/images/gallery/img-12.jpg',
    thumbnail_url: '/images/gallery/img-12.jpg',
    file_type: 'IMAGE',
    created_time: '2026-05-15T10:00:00Z',
    is_favorite: false,
  },
];

type AssetData = (typeof MOCK_DATA)[0];
type FileTypeFilter = 'All' | 'Images' | 'Videos';

const PLAY_ICON_SIZE: Record<number, { icon: string; pad: string }> = {
  1: { icon: 'size-3', pad: 'p-1' },
  2: { icon: 'size-4', pad: 'p-1.5' },
  3: { icon: 'size-5', pad: 'p-2' },
  4: { icon: 'size-6', pad: 'p-2.5' },
};

function AssetCard({
  item,
  selected,
  onToggle,
  gridSize,
  objectFit,
  isFavorite,
  onToggleFavorite,
}: {
  item: AssetData;
  selected: boolean;
  onToggle: () => void;
  gridSize: number;
  objectFit: 'contain' | 'cover';
  isFavorite: boolean;
  onToggleFavorite: () => void;
}) {
  const { icon, pad } = PLAY_ICON_SIZE[gridSize] ?? PLAY_ICON_SIZE[2];

  return (
    <div
      className={cn(
        'relative group aspect-square rounded-2xl overflow-hidden bg-secondary ring-3 ring-transparent transition-[box-shadow] duration-150',
        selected && 'ring-foreground',
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.thumbnail_url}
        alt=""
        className={cn(
          'w-full h-full',
          objectFit === 'cover' ? 'object-cover' : 'object-contain',
        )}
      />

      {item.file_type === 'VIDEO' && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className={cn(
              'rounded-full bg-background/20 backdrop-blur-[1px]',
              pad,
            )}
          >
            <IconPlayerPlayFilled className={cn(icon, 'text-white')} />
          </div>
        </div>
      )}

      <div
        className={cn(
          'absolute inset-0 bg-black/25 transition-opacity duration-150',
          selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
        )}
      />

      <div
        className={cn(
          'absolute top-2.5 left-2.5 transition-opacity duration-150 cursor-pointer',
          selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
        )}
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
      >
        <Checkbox
          checked={selected}
          className="bg-transparent border-foreground/60 size-5 pointer-events-none"
        />
      </div>

      <div
        className={cn(
          'absolute bottom-2.5 left-2.5 cursor-pointer transition-opacity duration-150',
          isFavorite ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
        )}
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite();
        }}
      >
        {isFavorite ? (
          <IconHeartFilled className="size-6 text-primary drop-shadow" />
        ) : (
          <IconHeart className="size-6 text-foreground/60 drop-shadow" />
        )}
      </div>
    </div>
  );
}

export function AssetsPanel() {
  const [filter, setFilter] = useState<FileTypeFilter>('All');
  const [gridSize, setGridSize] = useState(2);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [objectFit, setObjectFit] = useState<'contain' | 'cover'>('contain');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const cols = 14 - gridSize * 2; // gridSize 1??2, 2??, 3??, 4??

  const filtered = useMemo(() => {
    let data = MOCK_DATA;
    if (filter === 'Images') data = data.filter((d) => d.file_type === 'IMAGE');
    else if (filter === 'Videos')
      data = data.filter((d) => d.file_type === 'VIDEO');
    if (showFavoritesOnly) data = data.filter((d) => favorites.has(d.uuid));
    return data;
  }, [filter, showFavoritesOnly, favorites]);

  const grouped = useMemo(() => {
    const map = new Map<string, AssetData[]>();
    filtered.forEach((item) => {
      const key = item.created_time.split('T')[0];
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(item);
    });
    return Array.from(map.entries()).sort(([a], [b]) =>
      sortOrder === 'desc' ? b.localeCompare(a) : a.localeCompare(b),
    );
  }, [filtered, sortOrder]);

  const toggleSelect = (uuid: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(uuid)) next.delete(uuid);
      else next.add(uuid);
      return next;
    });
  };

  const toggleFavorite = (uuid: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(uuid)) next.delete(uuid);
      else next.add(uuid);
      return next;
    });
  };

  const toggleSelectGroup = (uuids: string[]) => {
    const allSelected = uuids.every((uuid) => selected.has(uuid));
    setSelected((prev) => {
      const next = new Set(prev);
      if (allSelected) {
        uuids.forEach((uuid) => next.delete(uuid));
      } else {
        uuids.forEach((uuid) => next.add(uuid));
      }
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

        <div className="flex flex-1 gap-3 items-center justify-end">
          <div className="flex flex-row gap-2 flex-1 justify-end">
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8"
              onClick={() =>
                setObjectFit((v) => (v === 'contain' ? 'cover' : 'contain'))
              }
            >
              {objectFit === 'contain' ? (
                <IconArrowsDiagonalMinimize2 />
              ) : (
                <IconArrowsDiagonal />
              )}
            </Button>
            <Slider
              value={[gridSize]}
              onValueChange={([v]) => setGridSize(v)}
              max={4}
              min={1}
              step={1}
              className="w-full max-w-[150px]"
              size="sm"
            />
          </div>

          <div className="flex flex-row gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-8 h-8 bg-transparent rounded-sm"
                >
                  <IconFilterDown />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-44 p-1">
                {(
                  [
                    { value: 'desc', label: 'Newest first' },
                    { value: 'asc', label: 'Oldest first' },
                  ] as const
                ).map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => setSortOrder(value)}
                    className="flex w-full items-center cursor-pointer justify-between rounded-sm px-3 py-1.5 text-sm hover:bg-accent transition-colors"
                  >
                    {label}
                    {sortOrder === value && <IconCheck className="size-3.5" />}
                  </button>
                ))}
              </PopoverContent>
            </Popover>

            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8 rounded-sm bg-transparent"
              onClick={() => setShowFavoritesOnly((v) => !v)}
            >
              {showFavoritesOnly ? (
                <IconHeartFilled className="text-primary" />
              ) : (
                <IconHeart />
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="overflow-y-auto flex-1 px-4 pb-4 space-y-6">
        {grouped.map(([dateKey, items]) => (
          <div key={dateKey}>
            <div
              className="flex w-fit items-center gap-2 mb-3 cursor-pointer select-none"
              onClick={() => toggleSelectGroup(items.map((i) => i.uuid))}
            >
              <Checkbox
                className="size-5 pointer-events-none"
                checked={
                  items.every((i) => selected.has(i.uuid))
                    ? true
                    : items.some((i) => selected.has(i.uuid))
                      ? 'indeterminate'
                      : false
                }
              />
              <Body className="text-foreground font-bold">
                {formatDate(dateKey)}
              </Body>
            </div>
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
                  gridSize={gridSize}
                  objectFit={objectFit}
                  isFavorite={favorites.has(item.uuid)}
                  onToggleFavorite={() => toggleFavorite(item.uuid)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
