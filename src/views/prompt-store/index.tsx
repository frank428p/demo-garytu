'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { H2, Muted, Small } from '@/components/ui/typography';
import {
  IconBookmarkFilled,
  IconChevronDown,
  IconPhoto,
  IconVideo,
} from '@tabler/icons-react';
import { Skeleton } from '@/components/ui/skeleton';
import { usePromptsList } from '@/@core/useQuery/usePrompts';
import type { Prompt } from '@/@core/types/prompt';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { CollectionSlider } from '@/components/CollectionSlider';

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

  const handleTouchStart = () => {
    if (mainFile?.file_type === 'VIDEO' && videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleTouchEnd = () => {
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
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
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

        {prompt?.user_state.purchased && (
          <div className="absolute bottom-2 right-2 rounded-md bg-primary/70 backdrop-blur-sm px-2 py-0.5 flex items-center gap-1">
            <span className="text-[10px] text-white/90 font-medium">
              Purchased
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1 px-3 pt-2 pb-1">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-semibold text-foreground leading-snug line-clamp-1">
            {prompt.name}
          </span>
          <Small className="font-bold text-foreground/60">
            NT${prompt.price.toLocaleString()}
          </Small>
        </div>
      </div>
    </Link>
  );
}

// ─── PromptStoreView ──────────────────────────────────────────────────────────

const PromptStoreView = () => {
  const [mediaTypeOpen, setMediaTypeOpen] = useState(false);
  const [styleOpen, setStyleOpen] = useState(false);
  const [selectedMediaType, setSelectedMediaType] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
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
    <div className="min-h-screen lg:rounded-tl-[32px] lg:rounded-tr-[32px] overflow-hidden lg:px-4">
      {/* Hero */}
      <section className="relative overflow-hidden bg-background py-18 md:py-12 lg:rounded-tl-[32px] lg:rounded-tr-[32px]">
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              'radial-gradient(circle, currentColor 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="aurora-1 absolute -top-20 -left-20 w-[250px] h-[250px] md:w-[300px] md:h-[300px] lg:w-[500px] lg:h-[500px] rounded-full bg-primary/40 blur-[70px]" />
          <div className="aurora-2 absolute -bottom-20 -right-10 w-[210px] h-[210px] md:w-[260px] md:h-[260px] lg:w-[420px] lg:h-[420px] rounded-full bg-primary/35 blur-[80px]" />
          <div className="aurora-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] md:w-[200px] md:h-[200px] lg:w-[300px] lg:h-[300px] rounded-full bg-primary/25 blur-[50px]" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-[32px] md:text-[42px] font-black tracking-tight leading-[1.05] mb-6">
            The Art of
            <br />
            <span className="text-primary">AI Prompts</span>
          </h1>

          <p className="text-muted-foreground text-md md:text-lg max-w-xl leading-relaxed">
            Curated prompt packages crafted by top AI artists and creators.
            Elevate your generation workflow instantly.
          </p>
        </div>
      </section>

      {/* Collection */}
      <section className="pb-4 pt-4 flex flex-col items-stretch gap-6 pt-5 md:flex-row ">
        <div className="hidden md:flex flex-col justify-center gap-4 bg-card rounded-2xl w-full max-w-[450px] shrink-0 h-40 md:h-auto px-8 py-10">
          <h2 className="text-2xl font-bold leading-snug">
            Curated Collections
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Handpicked prompt collections crafted by top AI artists. Each set is
            designed to elevate your creative workflow instantly.
          </p>
        </div>
        <div className="w-full min-w-0">
          <CollectionSlider
            items={[
              {
                id: '1',
                badge: 'STORY',
                title: 'Between lights',
                image: '/images/gallery/16-to-9_1.jpg',
                video: '/images/gallery/16-to-9_1.mp4',
              },
              {
                id: '2',
                badge: 'COLLECTION',
                title: 'POV',
                image: '/images/gallery/16-to-9_2.jpg',
                video: '/images/gallery/16-to-9_1.mp4',
              },
              {
                id: '3',
                badge: 'STORY',
                title: 'Unbound',
                image: '/images/gallery/16-to-9_1.jpg',
                video: '/images/gallery/16-to-9_1.mp4',
              },
              {
                id: '4',
                badge: 'COLLECTION',
                title: 'Golden Hour',
                image: '/images/gallery/16-to-9_2.jpg',
                video: '/images/gallery/16-to-9_1.mp4',
              },
              {
                id: '5',
                badge: 'STORY',
                title: 'Solitude',
                image: '/images/gallery/16-to-9_1.jpg',
                video: '/images/gallery/16-to-9_1.mp4',
              },
              {
                id: '6',
                badge: 'COLLECTION',
                title: 'Neon Dreams',
                image: '/images/gallery/16-to-9_2.jpg',
                video: '/images/gallery/16-to-9_1.mp4',
              },
            ]}
          />
        </div>
      </section>

      {/* Submissions */}
      <section className="pb-16 px-4 lg:px-0">
        {/* Filter bar */}
        <div className="">
          <div className="flex items-center gap-2 pb-3">
            {/* Media Type trigger */}
            <Button
              variant="ghost"
              className={cn(
                'text-xs !px-3.5 !py-1.5 h-auto text-muted-foreground hover:text-foreground relative',
                mediaTypeOpen &&
                  'bg-accent text-foreground hover:text-foreground',
                selectedMediaType &&
                  'bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary',
              )}
              onClick={() => {
                setMediaTypeOpen((v) => !v);
                setStyleOpen(false);
              }}
            >
              Media Type
            </Button>

            {/* Style trigger */}
            <Button
              variant="ghost"
              className={cn(
                'text-xs !px-3.5 !py-1.5 h-auto text-muted-foreground hover:text-foreground relative',
                styleOpen && 'bg-accent text-foreground hover:text-foreground',
                selectedStyle &&
                  'bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary',
              )}
              onClick={() => {
                setStyleOpen((v) => !v);
                setMediaTypeOpen(false);
              }}
            >
              Style
            </Button>
          </div>

          {/* Media Type panel */}
          <div
            className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${mediaTypeOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
          >
            <div className="overflow-hidden">
              <ToggleGroup
                type="single"
                variant="outline"
                size="sm"
                value={selectedMediaType}
                onValueChange={setSelectedMediaType}
                className="flex-wrap justify-start gap-1.5 pt-1 pb-4"
              >
                {(['Image', 'Video'] as const).map((style) => (
                  <ToggleGroupItem
                    className="rounded-full py-1.5 px-3 h-auto text-xs bg-card border-none data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary"
                    key={style}
                    value={style}
                  >
                    {style}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          </div>

          {/* Style panel */}
          <div
            className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${styleOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
          >
            <div className="overflow-hidden">
              <ToggleGroup
                type="single"
                variant="outline"
                size="sm"
                value={selectedStyle}
                onValueChange={setSelectedStyle}
                className="flex-wrap justify-start gap-1.5 pt-1 pb-4"
              >
                {(
                  [
                    'Photorealistic',
                    'Cinematic',
                    'Anime',
                    'Manga',
                    '3D Render',
                    'Digital Painting',
                    'Oil Painting',
                    'Watercolor',
                    'Sketch',
                    'Minimalist',
                    'Flat Illustration',
                    'Isometric',
                    'Cyberpunk',
                    'Fantasy Art',
                    'Pixel Art',
                  ] as const
                ).map((style) => (
                  <ToggleGroupItem
                    className="rounded-full py-1.5 px-3 h-auto text-xs bg-card border-none data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary"
                    key={style}
                    value={style}
                  >
                    {style}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3">
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
