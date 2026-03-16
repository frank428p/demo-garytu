'use client';

import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTab, TabsPanel } from '@/components/ui/tabs';
import {
  H1,
  H2,
  H3,
  Muted,
  Small,
  TinyMuted,
} from '@/components/ui/typography';
import {
  IconFlame,
  IconClock,
  IconHeart,
  IconEye,
  IconTrophy,
  IconUsers,
  IconBookmark,
  IconSearch,
  IconArrowRight,
  IconSparkles,
} from '@tabler/icons-react';

const mediaLikes: Record<string, number> = {
  '1': 843,
  '2': 512,
  '3': 291,
  '4': 674,
  '5': 1024,
  '6': 388,
  '7': 756,
  '8': 443,
  '9': 317,
  '10': 892,
  '11': 601,
  '12': 229,
  '13': 478,
  '14': 334,
  '15': 987,
  '16': 723,
  '17': 456,
  '18': 561,
  '19': 812,
  '20': 345,
};

const medias = [
  {
    src: '/images/gallery/1-to-1_1.jpg',
    width: 1024,
    height: 1024,
    id: '1',
    aspectRatio: '1:1',
    mediaType: 'image',
  },
  {
    src: '/images/gallery/1-to-1_2.jpg',
    width: 1024,
    height: 1024,
    id: '2',
    aspectRatio: '1:1',
    mediaType: 'image',
  },
  {
    src: '/images/gallery/1-to-1_3.jpg',
    width: 1024,
    height: 1024,
    id: '3',
    aspectRatio: '1:1',
    mediaType: 'image',
  },
  {
    src: '/images/gallery/9-to-16_1.jpg',
    width: 1040,
    height: 1572,
    id: '4',
    aspectRatio: '9:16',
    mediaType: 'image',
  },
  {
    src: '/images/gallery/16-to-9_1.jpg',
    width: 5440,
    height: 3072,
    id: '5',
    aspectRatio: '16:9',
    mediaType: 'image',
  },
  {
    src: '/images/gallery/16-to-9_2.jpg',
    width: 1376,
    height: 768,
    id: '6',
    aspectRatio: '16:9',
    mediaType: 'image',
  },
  {
    src: '/images/gallery/1-to-1_1.mp4',
    poster: '/images/gallery/1-to-1-cover_1.avif',
    width: 1440,
    height: 1440,
    id: '7',
    aspectRatio: '1:1',
    mediaType: 'video',
  },
  {
    src: '/images/gallery/9-to-16_1.jpg',
    width: 1040,
    height: 1572,
    id: '8',
    aspectRatio: '9:16',
    mediaType: 'image',
  },
  {
    src: '/images/gallery/1-to-1_2.jpg',
    width: 1024,
    height: 1024,
    id: '9',
    aspectRatio: '1:1',
    mediaType: 'image',
  },
  {
    src: '/images/gallery/16-to-9_1.mp4',
    poster: '/images/gallery/16-to-9-cover_1.avif',
    width: 1344,
    height: 768,
    id: '10',
    aspectRatio: '16:9',
    mediaType: 'video',
  },
  {
    src: '/images/gallery/16-to-9_1.jpg',
    width: 5440,
    height: 3072,
    id: '11',
    aspectRatio: '16:9',
    mediaType: 'image',
  },
  {
    src: '/images/gallery/1-to-1_3.jpg',
    width: 1024,
    height: 1024,
    id: '12',
    aspectRatio: '1:1',
    mediaType: 'image',
  },
  {
    src: '/images/gallery/9-to-16_2.mp4',
    poster: '/images/gallery/9-to-16-cover_2.avif',
    width: 1080,
    height: 1920,
    id: '13',
    aspectRatio: '9:16',
    mediaType: 'video',
  },
  {
    src: '/images/gallery/9-to-16_1.jpg',
    width: 1040,
    height: 1572,
    id: '14',
    aspectRatio: '9:16',
    mediaType: 'image',
  },
  {
    src: '/images/gallery/1-to-1_1.mp4',
    poster: '/images/gallery/1-to-1-cover_1.avif',
    width: 1440,
    height: 1440,
    id: '15',
    aspectRatio: '1:1',
    mediaType: 'video',
  },
  {
    src: '/images/gallery/1-to-1_2.mp4',
    poster: '/images/gallery/1-to-1-cover_2.avif',
    width: 1440,
    height: 1440,
    id: '16',
    aspectRatio: '1:1',
    mediaType: 'video',
  },
  {
    src: '/images/gallery/16-to-9_1.mp4',
    poster: '/images/gallery/16-to-9-cover_1.avif',
    width: 1344,
    height: 768,
    id: '17',
    aspectRatio: '16:9',
    mediaType: 'video',
  },
  {
    src: '/images/gallery/16-to-9_2.mp4',
    poster: '/images/gallery/16-to-9-cover_2.avif',
    width: 1344,
    height: 768,
    id: '18',
    aspectRatio: '16:9',
    mediaType: 'video',
  },
  {
    src: '/images/gallery/9-to-16_1.mp4',
    poster: '/images/gallery/9-to-16-cover_1.avif',
    width: 1080,
    height: 1920,
    id: '19',
    aspectRatio: '9:16',
    mediaType: 'video',
  },
  {
    src: '/images/gallery/9-to-16_2.mp4',
    poster: '/images/gallery/9-to-16-cover_2.avif',
    width: 1080,
    height: 1920,
    id: '20',
    aspectRatio: '9:16',
    mediaType: 'video',
  },
];

const SORT_OPTIONS = [
  { label: 'Trending', value: 'trending', icon: IconFlame },
  { label: 'Newest', value: 'newest', icon: IconClock },
  { label: 'Most Liked', value: 'liked', icon: IconHeart },
  { label: 'Most Viewed', value: 'viewed', icon: IconEye },
];

const prizes = [
  { rank: '1st Place', amount: 'NT$150,000', highlight: true },
  { rank: '2nd Place', amount: 'NT$100,000', highlight: false },
  { rank: '3rd Place', amount: 'NT$50,000', highlight: false },
  { rank: '5 Honorable Mentions', amount: 'NT$10,000 each', highlight: false },
];

const judges = [
  {
    name: 'Gary Tu',
    title: 'AI Art Director',
    avatar: '/images/gallery/img-01.jpg',
  },
  {
    name: 'Sarah Lin',
    title: 'VFX Studio Lead',
    avatar: '/images/gallery/img-02.jpg',
  },
  {
    name: 'Kevin Wu',
    title: 'Concept Artist',
    avatar: '/images/gallery/img-03.jpg',
  },
  {
    name: 'Mia Chen',
    title: 'AI Creator',
    avatar: '/images/gallery/img-04.jpg',
  },
  {
    name: 'Jason Park',
    title: 'Production Director',
    avatar: '/images/gallery/img-05.jpg',
  },
  {
    name: 'Lily Huang',
    title: 'Digital Artist',
    avatar: '/images/gallery/img-06.jpg',
  },
];

type Media = (typeof medias)[number];

const titles = [
  'The Conspiracy Theory',
  'Scrap',
  'Have Fun!',
  'The Bind',
  'In Despair',
  'Blade.',
  'Sorry, Mom',
  'Down to Earth',
  "360's Night",
  'Neon Shadows',
  'Final Protocol',
  'Iron Drift',
  'Phantom Signal',
  'Last Stand',
  'Heist',
  'Zero Hour',
  'The Fall',
  'Rogue Circuit',
  'Eclipse',
  'Aftermath',
];

const usernames = [
  'baroque_tea',
  'colormestadic',
  'craneofilms',
  'adriansuarez',
  'jaemin_yoo',
  'paperwolf',
  'myrzakhan',
  'sethadvit',
  'sceneerr',
  'voidframe',
  'lenscraft',
  'neonreel',
  'ghostcut',
  'arcvision',
  'pixelwave',
  'silkmotion',
  'duskframe',
  'luminos',
  'staticbloom',
  'motionhex',
];

const mediaViews: Record<string, number> = {
  '1': 71739,
  '2': 39805,
  '3': 67727,
  '4': 12581,
  '5': 118822,
  '6': 43350,
  '7': 17137,
  '8': 40065,
  '9': 33103,
  '10': 55420,
  '11': 28900,
  '12': 61200,
  '13': 47300,
  '14': 22100,
  '15': 88500,
  '16': 34700,
  '17': 51200,
  '18': 29800,
  '19': 76400,
  '20': 43100,
};

function MediaCard({ item, index }: { item: Media; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const title = titles[index % titles.length];
  const username = usernames[index % usernames.length];
  const avatarNum = String((index % 9) + 1).padStart(2, '0');

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
    <div className="group flex flex-col rounded-xl overflow-hidden bg-background p-1 cursor-pointer hover:bg-secondary transition-colors">
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
            poster={'poster' in item ? item.poster : undefined}
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={item.src}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

        {/* Has Assets badge */}
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
            Cinematic Portrait Lighting Pack
          </span>
          <IconBookmark size={16} className="text-muted-foreground shrink-0" />
        </div>

        <div className="flex items-center justify-between mt-1.5">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-xs text-muted-foreground shrink-0">by</span>
            <img
              src={`/images/gallery/img-${avatarNum}.jpg`}
              alt={username}
              className="w-4 h-4 rounded-full object-cover shrink-0"
            />
            <span className="text-xs text-muted-foreground truncate">
              {username}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1 text-muted-foreground">
              <IconEye size={12} />
              <span className="text-xs">
                {(mediaViews[item.id] ?? 0).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <IconHeart size={12} />
              <span className="text-xs">{mediaLikes[item.id] ?? 0}</span>
            </div>
          </div>
        </div>

        {/* Green accent line */}
        <div className="mt-2 h-[2px] w-full bg-primary/70 rounded-full" />
      </div>
    </div>
  );
}

const PromptStoreView = () => {
  const [sort, setSort] = useState('trending');

  return (
    <div className="min-h-screen rounded-tl-[32px] rounded-tr-[32px] overflow-hidden">
      {/* Hero */}
      <section className="relative overflow-hidden bg-background py-24 md:py-36 rounded-tl-[32px] rounded-tr-[32px]">
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              'radial-gradient(circle, currentColor 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Aurora blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="aurora-1 absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full bg-primary/40 blur-[70px]" />
          <div className="aurora-2 absolute -bottom-20 -right-10 w-[420px] h-[420px] rounded-full bg-primary/35 blur-[80px]" />
          <div className="aurora-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-primary/25 blur-[50px]" />
        </div>

        {/* Fade bottom only */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-border bg-background/60 backdrop-blur-sm">
            <IconSparkles size={13} className="text-primary" />
            <span className="text-xs font-medium text-muted-foreground tracking-widest uppercase">
              Prompt Marketplace
            </span>
          </div>

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
          <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
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
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {medias.map((item, index) => (
            <MediaCard key={item.id} item={item} index={index} />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Button variant="outline" size="lg">
            Load More
          </Button>
        </div>
      </section>
    </div>
  );
};

export default PromptStoreView;
