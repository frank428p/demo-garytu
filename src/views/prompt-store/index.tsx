'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { H2 } from '@/components/ui/typography';
import { IconBookmarkFilled } from '@tabler/icons-react';
import { Skeleton } from '@/components/ui/skeleton';
import { usePromptsList } from '@/@core/useQuery/usePrompts';
import type { Prompt } from '@/@core/types/prompt';

// ─── MediaCard ────────────────────────────────────────────────────────────────

function MediaCard({ prompt }: { prompt: Prompt }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const sortedFiles = [...prompt.files].sort((a, b) => a.position - b.position);
  const mainFile = sortedFiles[0];
  const posterFile =
    mainFile?.file_type === 'VIDEO'
      ? sortedFiles.find((f) => f.file_type === 'IMAGE')
      : undefined;

  const handleMouseEnter = () => {
    if (mainFile?.file_type === 'VIDEO' && videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (mainFile?.file_type === 'VIDEO' && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <Link
      href={`/toolkit/store/${prompt.uuid}`}
      className="group flex flex-col rounded-xl overflow-hidden bg-background px-1 pt-1 pb-2 hover:bg-secondary transition-colors"
    >
      {/* Thumbnail */}
      <div
        className="relative w-full aspect-video overflow-hidden rounded-xl"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {mainFile?.file_type === 'VIDEO' ? (
          <video
            ref={videoRef}
            src={mainFile.url}
            poster={posterFile?.url}
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={mainFile?.url}
            alt={prompt.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

        {mainFile?.file_type === 'VIDEO' && (
          <div className="absolute top-2 right-2 rounded-md bg-black/60 backdrop-blur-sm px-2 py-0.5 flex items-center gap-1">
            <span className="text-[10px] text-white/90 font-medium">Video</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col px-3 pt-2 pb-1">
        <div className="flex items-start justify-between gap-2">
          <span className="text-base font-semibold text-foreground leading-snug line-clamp-1">
            {prompt.name}
          </span>
          <IconBookmarkFilled
            size={18}
            color="var(--primary)"
            className="shrink-0"
          />
        </div>
      </div>
    </Link>
  );
}

// ─── PromptStoreView ──────────────────────────────────────────────────────────

const PromptStoreView = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    usePromptsList();

  const items = data?.pages.flatMap((p) => p.data) ?? [];
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Infinite scroll
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: '200px' },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const loading = isLoading || isFetchingNextPage;

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
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6">
            The Art of
            <br />
            <span className="text-primary">AI Prompts</span>
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl max-w-xl leading-relaxed">
            Curated prompt packages crafted by top AI artists and creators.
            Elevate your generation workflow instantly.
          </p>
        </div>
      </section>

      {/* Submissions */}
      <section className="pb-16 px-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <H2 className="text-2xl">Submissions</H2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {items.map((prompt) => (
            <MediaCard key={prompt.uuid} prompt={prompt} />
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
