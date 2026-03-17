'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { H2 } from '@/components/ui/typography';
import {
  IconFlame,
  IconClock,
  IconHeart,
  IconEye,
  IconBookmark,
  IconSparkles,
} from '@tabler/icons-react';
import { Skeleton } from '@/components/ui/skeleton';
import type { PromptItem, PromptsResponse } from '@/app/api/prompts/route';

const SORT_OPTIONS = [
  { label: 'Trending', value: 'trending', icon: IconFlame },
  { label: 'Newest', value: 'newest', icon: IconClock },
  { label: 'Most Liked', value: 'liked', icon: IconHeart },
  { label: 'Most Viewed', value: 'viewed', icon: IconEye },
];

const LIMIT = 20;

// ─── MediaCard ────────────────────────────────────────────────────────────────

function MediaCard({ item }: { item: PromptItem }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (item.mediaType === 'video' && videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (item.mediaType === 'video' && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <Link
      href={`/toolkit/store/${item.id}`}
      className="group flex flex-col rounded-xl overflow-hidden bg-background px-1 pt-1 pb-2 hover:bg-secondary transition-colors"
    >
      {/* Thumbnail */}
      <div
        className="relative w-full aspect-video overflow-hidden rounded-xl"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {item.mediaType === 'video' ? (
          <video
            ref={videoRef}
            src={item.src}
            poster={item.poster}
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={item.src}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

        {item.mediaType === 'video' && (
          <div className="absolute top-2 right-2 rounded-md bg-black/60 backdrop-blur-sm px-2 py-0.5 flex items-center gap-1">
            <span className="text-[10px] text-white/90 font-medium">Video</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col px-3 pt-2 pb-1">
        <div className="flex items-start justify-between gap-2">
          <span className="text-base font-semibold text-foreground leading-snug line-clamp-1">
            {item.title}
          </span>
          <IconBookmark size={18} className="text-muted-foreground shrink-0" />
        </div>

        {/* <div className="flex items-center justify-between mt-1.5">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-xs text-muted-foreground shrink-0">by</span>
                 <img
              src={item.avatar}
              alt={item.username}
              className="w-4 h-4 rounded-full object-cover shrink-0"
            />
            <span className="text-xs text-muted-foreground truncate">
              {item.username}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1 text-muted-foreground">
              <IconEye size={12} />
              <span className="text-xs">{item.views.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <IconHeart size={12} />
              <span className="text-xs">{item.likes.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="mt-2 h-[2px] w-full bg-primary/70 rounded-full" /> */}
      </div>
    </Link>
  );
}

// ─── PromptStoreView ──────────────────────────────────────────────────────────

const PromptStoreView = () => {
  const [sort, setSort] = useState('trending');
  const [items, setItems] = useState<PromptItem[]>([]);
  const [page, setPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);

  const sentinelRef = useRef<HTMLDivElement>(null);
  const isFetching = useRef(false);

  const fetchPage = useCallback(
    async (nextPage: number, currentSort: string) => {
      if (isFetching.current) return;
      isFetching.current = true;
      setLoading(true);

      try {
        const res = await fetch(
          `/api/prompts?page=${nextPage}&limit=${LIMIT}&sort=${currentSort}`,
        );
        const json: PromptsResponse = await res.json();

        setItems((prev) =>
          nextPage === 1 ? json.data : [...prev, ...json.data],
        );
        setPage(nextPage);
        setHasNextPage(json.pagination.hasNextPage);
      } finally {
        setLoading(false);
        isFetching.current = false;
      }
    },
    [],
  );

  // Reset and fetch when sort changes
  useEffect(() => {
    setItems([]);
    setPage(0);
    setHasNextPage(true);
    fetchPage(1, sort);
  }, [sort, fetchPage]);

  // Infinite scroll
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching.current) {
          fetchPage(page + 1, sort);
        }
      },
      { rootMargin: '200px' },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [fetchPage, hasNextPage, page, sort]);

  return (
    <div className="min-h-screen rounded-tl-[32px] rounded-tr-[32px] overflow-hidden">
      {/* Hero */}
      <section className="relative overflow-hidden bg-background py-24 md:py-36 rounded-tl-[32px] rounded-tr-[32px]">
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              'radial-gradient(circle, currentColor 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="aurora-1 absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full bg-primary/40 blur-[70px]" />
          <div className="aurora-2 absolute -bottom-20 -right-10 w-[420px] h-[420px] rounded-full bg-primary/35 blur-[80px]" />
          <div className="aurora-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-primary/25 blur-[50px]" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">
          {/* <div className="flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-border bg-background/60 backdrop-blur-sm">
            <IconSparkles size={13} className="text-primary" />
            <span className="text-xs font-medium text-muted-foreground tracking-widest uppercase">
              Prompt Marketplace
            </span>
          </div> */}

          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6">
            The Art of
            <br />
            <span className="text-primary">AI Prompts</span>
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl max-w-xl leading-relaxed mb-10">
            Curated prompt packages crafted by top AI artists and creators.
            Elevate your generation workflow instantly.
          </p>
        </div>
      </section>

      {/* Submissions */}
      <section className="pb-16 px-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <H2 className="text-2xl">Submissions</H2>
          {/* <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
            {SORT_OPTIONS.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.value}
                  onClick={() => setSort(option.value)}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
                    sort === option.value
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  <Icon size={14} />
                  {option.label}
                </button>
              );
            })}
          </div> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {items.map((item) => (
            <MediaCard key={item.id} item={item} />
          ))}
        </div>

        <div ref={sentinelRef} className="h-1" />

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col rounded-xl overflow-hidden bg-background p-1"
              >
                <Skeleton className="w-full aspect-video rounded-xl" />
                <div className="flex flex-col px-3 pt-2 pb-1 gap-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!hasNextPage && items.length > 0 && (
          <p className="text-center text-sm text-muted-foreground mt-8">
            You&apos;ve reached the end
          </p>
        )}
      </section>
    </div>
  );
};

export default PromptStoreView;
