'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import { useBreakpoint } from '@/@core/hooks/useBreakpoint';

export type CollectionItem = {
  id?: string;
  badge: 'STORY' | 'COLLECTION';
  title?: string;
  image?: string;
  video?: string;
};

const BADGE_STYLE: Record<CollectionItem['badge'], string> = {
  STORY: 'bg-white/20 text-white',
  COLLECTION: 'bg-white/20 text-white',
};

const GAP = 16;

export function CollectionSlider({ items }: { items: CollectionItem[] }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null); // relative to startIndex
  const [containerHovered, setContainerHovered] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);
  const [itemHeight, setItemHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number | null>(null);
  const dragStartY = useRef<number | null>(null);
  const isDragging = useRef(false);
  const [dragOffset, setDragOffset] = useState(0);
  const isTouching = useRef(false);
  const DRAG_THRESHOLD = 50;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
      // measure item height from first child of track
      const firstItem = el.querySelector<HTMLElement>('[data-slider-item]');
      if (firstItem) setItemHeight(firstItem.offsetHeight);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { isTablet, isDesktop, isXlDesktop, is2XlDesktop } = useBreakpoint();

  const VISIBLE = useMemo(() => {
    if (is2XlDesktop) return 5;
    if (isXlDesktop) return 4;
    if (isDesktop) return 3;
    if (isTablet) return 2;
    return 2;
  }, [isTablet, isDesktop, isXlDesktop, is2XlDesktop]);

  const maxStart = items.length - VISIBLE;

  // base item width (no hover)
  const baseItemWidth = containerWidth
    ? (containerWidth - GAP * (VISIBLE - 1)) / VISIBLE
    : 0;

  // expanded width = full 16:9 of item height, capped at available width
  const expandedWidth = useMemo(() => {
    const available = containerWidth - GAP * (VISIBLE - 1);
    return itemHeight > 0 ? itemHeight * (16 / 9) : available / VISIBLE;
  }, [itemHeight, containerWidth, VISIBLE]);

  // per-item widths accounting for hover expand
  const itemWidths = useMemo(() => {
    if (!baseItemWidth) return items.map(() => 0);
    return items.map((_, i) => {
      const relIdx = i - startIndex;
      if (hoveredIdx === null || relIdx < 0 || relIdx >= VISIBLE)
        return baseItemWidth;
      const available = containerWidth - GAP * (VISIBLE - 1);
      const n = (available - expandedWidth) / (VISIBLE - 1);
      return relIdx === hoveredIdx ? expandedWidth : n;
    });
  }, [
    baseItemWidth,
    hoveredIdx,
    startIndex,
    VISIBLE,
    containerWidth,
    items,
    expandedWidth,
  ]);

  // track offset = sum of widths + gaps for items before startIndex
  const trackOffset = useMemo(() => {
    if (!baseItemWidth) return 0;
    let offset = 0;
    for (let i = 0; i < startIndex; i++) {
      offset += baseItemWidth + GAP;
    }
    return offset;
  }, [startIndex, baseItemWidth]);

  const navigate = (dir: 'prev' | 'next') => {
    if (isNavigating) return;
    setIsNavigating(true);
    setHoveredIdx(null);
    setStartIndex((i) =>
      dir === 'next' ? Math.min(maxStart, i + 1) : Math.max(0, i - 1),
    );
    setTimeout(() => setIsNavigating(false), 450);
  };

  return (
    <div
      ref={containerRef}
      className="relative select-none w-full"
      onMouseEnter={() => setContainerHovered(true)}
      onMouseLeave={() => {
        setContainerHovered(false);
        setHoveredIdx(null);
      }}
    >
      {/* Track */}
      <div
        className="overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y"
        onMouseDown={(e) => {
          dragStartX.current = e.clientX;
          isDragging.current = false;
        }}
        onMouseMove={(e) => {
          if (
            dragStartX.current !== null &&
            Math.abs(e.clientX - dragStartX.current) > 5
          )
            isDragging.current = true;
        }}
        onMouseUp={(e) => {
          if (dragStartX.current === null) return;
          const dx = e.clientX - dragStartX.current;
          if (Math.abs(dx) >= DRAG_THRESHOLD)
            navigate(dx < 0 ? 'next' : 'prev');
          dragStartX.current = null;
          isDragging.current = false;
        }}
        onMouseLeave={() => {
          dragStartX.current = null;
          isDragging.current = false;
        }}
        onTouchStart={(e) => {
          dragStartX.current = e.touches[0].clientX;
          dragStartY.current = e.touches[0].clientY;
          isTouching.current = true;
          setDragOffset(0);
        }}
        onTouchMove={(e) => {
          if (dragStartX.current === null) return;
          const dx = e.touches[0].clientX - dragStartX.current;
          setDragOffset(dx);
        }}
        onTouchEnd={(e) => {
          if (dragStartX.current === null) return;
          const dx = e.changedTouches[0].clientX - dragStartX.current;
          setDragOffset(0);
          isTouching.current = false;
          if (Math.abs(dx) >= DRAG_THRESHOLD)
            navigate(dx < 0 ? 'next' : 'prev');
          dragStartX.current = null;
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: `${GAP}px`,
            transform: `translateX(${-trackOffset + dragOffset}px)`,
            transition:
              dragOffset !== 0
                ? 'none'
                : 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
            willChange: 'transform',
          }}
        >
          {items.map((item, i) => {
            const relIdx = i - startIndex;
            const isVisible = relIdx >= 0 && relIdx < VISIBLE;
            const isHovered = isVisible && hoveredIdx === relIdx;

            return (
              <div
                key={item.id}
                style={{
                  width: `${itemWidths[i] || baseItemWidth}px`,
                  height: `${Math.max(180, Math.min(containerWidth * 0.22, 420))}px`,
                  flexShrink: 0,
                  transition: 'width 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                data-slider-item
                className="relative overflow-hidden rounded-xl cursor-pointer"
                onMouseEnter={() => isVisible && setHoveredIdx(relIdx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Poster image */}
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    opacity: isHovered ? 0 : 1,
                  }}
                />
                {/* Video */}
                {item.video && (
                  <video
                    src={item.video}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                    style={{ opacity: isHovered ? 1 : 0 }}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="none"
                    ref={(el) => {
                      if (!el) return;
                      if (isHovered) {
                        el.play().catch(() => {});
                      } else {
                        el.pause();
                        el.currentTime = 0;
                      }
                    }}
                  />
                )}
                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                {/* Info */}
                <div className="absolute bottom-0 left-0 p-5 flex flex-col gap-1.5">
                  <span
                    className={cn(
                      'inline-flex w-fit items-center rounded px-1.5 py-0.5 text-[10px] font-semibold tracking-widest uppercase backdrop-blur-sm',
                      BADGE_STYLE[item.badge],
                    )}
                  >
                    {item.badge}
                    {item.id}
                  </span>
                  <p className="text-white text-sm xl:text-lg font-semibold leading-snug drop-shadow">
                    {item.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Prev arrow */}
      <button
        aria-label="Previous"
        className={cn(
          'absolute cursor-pointer left-[-20px] top-1/2 -translate-y-1/2 z-100 flex items-center justify-center size-10 rounded-full bg-accent/30 backdrop-blur-sm text-white hover:bg-secondary/20',
          'transition-[opacity,transform] duration-300 ease-in-out',
          containerHovered && startIndex > 0
            ? 'opacity-100'
            : 'opacity-0 pointer-events-none',
        )}
        onClick={() => navigate('prev')}
      >
        <IconChevronLeft size={20} />
      </button>

      {/* Next arrow */}
      <button
        aria-label="Next"
        className={cn(
          'absolute cursor-pointer right-[-20px] top-1/2 -translate-y-1/2 z-100 flex items-center justify-center size-10 rounded-full bg-accent/30 backdrop-blur-sm text-white hover:bg-secondary/20',
          'transition-[opacity,transform] duration-300 ease-in-out',
          containerHovered && startIndex < maxStart
            ? 'opacity-100'
            : 'opacity-0 pointer-events-none',
        )}
        onClick={() => navigate('next')}
      >
        <IconChevronRight size={20} />
      </button>
    </div>
  );
}
