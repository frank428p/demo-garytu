'use client';

import { useState } from 'react';
import {
  IconArchive,
  IconSearch,
  IconCurrencyEthereum,
  IconStar,
  IconStarFilled,
  IconDots,
  IconPhoto,
  IconVideo,
} from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsList, TabsPanel, TabsTab } from '@/components/ui/tabs';

type Photo = {
  src: string;
  poster?: string;
  width: number;
  height: number;
  id: string;
  aspectRatio: string;
  mediaType: 'image' | 'video';
};

const photos: Photo[] = [
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
    width: 3072,
    height: 5440,
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
    width: 3072,
    height: 5440,
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
    width: 3072,
    height: 5440,
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

const prompts = [
  {
    id: 1,
    title: 'SEO Article Writer',
    description:
      'Generate SEO-optimized long-form articles with proper keyword density and structure.',
    category: 'Writing',
    credits: 10,
    starred: true,
    usedAt: 'Feb 27, 2026',
  },
  {
    id: 2,
    title: 'Email Marketing Copy',
    description:
      'Write compelling email marketing campaigns with high open and click-through rates.',
    category: 'Marketing',
    credits: 20,
    starred: false,
    usedAt: 'Feb 18, 2026',
  },
  {
    id: 3,
    title: 'Product Description Generator',
    description:
      'Create detailed, persuasive product descriptions for e-commerce platforms.',
    category: 'E-commerce',
    credits: 15,
    starred: true,
    usedAt: 'Feb 10, 2026',
  },
  {
    id: 4,
    title: 'Social Media Caption Pack',
    description:
      'Generate engaging captions for Instagram, Twitter, and LinkedIn posts.',
    category: 'Social Media',
    credits: 8,
    starred: false,
    usedAt: 'Jan 30, 2026',
  },
  {
    id: 5,
    title: 'Code Review Assistant',
    description:
      'Analyze and provide constructive feedback on code quality, performance, and security.',
    category: 'Development',
    credits: 25,
    starred: false,
    usedAt: 'Jan 22, 2026',
  },
  {
    id: 6,
    title: 'Business Plan Template',
    description:
      'Create comprehensive business plans with market analysis, financials, and strategy.',
    category: 'Business',
    credits: 30,
    starred: true,
    usedAt: 'Jan 15, 2026',
  },
];

const categoryColors: Record<string, string> = {
  Writing: 'bg-blue-500/10 text-blue-500',
  Marketing: 'bg-purple-500/10 text-purple-500',
  'E-commerce': 'bg-orange-500/10 text-orange-500',
  'Social Media': 'bg-pink-500/10 text-pink-500',
  Development: 'bg-green-500/10 text-green-500',
  Business: 'bg-yellow-500/10 text-yellow-600',
};

const PAGE_SIZE = 12;

function getPageItems(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const items: (number | 'ellipsis')[] = [1];
  if (current > 3) items.push('ellipsis');
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) items.push(i);
  if (current < total - 2) items.push('ellipsis');
  items.push(total);
  return items;
}

export default function MyPromptPage() {
  const [search, setSearch] = useState('');
  const [starred, setStarred] = useState<Record<number, boolean>>(
    Object.fromEntries(prompts.map((p) => [p.id, p.starred])),
  );
  const [page, setPage] = useState(1);

  const filtered = prompts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(photos.length / PAGE_SIZE);
  const pagedPhotos = photos.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">My Prompt</h1>
        <p className="text-muted-foreground mt-1">
          {`Prompts you've purchased and saved.`}
        </p>
      </div>

      <Tabs defaultValue="tab-1">
        <div className="border-b border-border">
          <TabsList variant="underline">
            <TabsTab value="tab-1">Purchased</TabsTab>
            <TabsTab value="tab-2">Favorite(?)</TabsTab>
          </TabsList>
        </div>

        <TabsPanel value="tab-1">
          <div className="pt-4">
            {/* Card grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {pagedPhotos.map((p) => {
                const thumb = p.poster ?? p.src;
                const MediaIcon =
                  p.mediaType === 'video' ? IconVideo : IconPhoto;
                return (
                  <div
                    key={p.id}
                    className="rounded-xl overflow-hidden border border-border bg-card hover:border-primary/80 hover:border-[2px] transition-colors cursor-pointer group"
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-square overflow-hidden bg-muted">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={thumb}
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {/* Video badge */}
                      {p.mediaType === 'video' && (
                        <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 text-white text-xs font-medium px-1.5 py-0.5 rounded">
                          <IconVideo size={11} />
                          Video
                        </div>
                      )}
                    </div>
                    {/* Info */}
                    <div className="p-3 flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">
                          Cinematic Lighting Pack
                        </p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <MediaIcon
                            size={11}
                            className="text-muted-foreground shrink-0"
                          />
                          <span className="text-xs text-muted-foreground">
                            {p.aspectRatio}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination className="mt-6 flex justify-end">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setPage((p) => Math.max(1, p - 1));
                      }}
                      className={
                        page === 1 ? 'pointer-events-none opacity-50' : ''
                      }
                    />
                  </PaginationItem>

                  {getPageItems(page, totalPages).map((item, i) =>
                    item === 'ellipsis' ? (
                      <PaginationItem key={`ellipsis-${i}`}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    ) : (
                      <PaginationItem key={item}>
                        <PaginationLink
                          href="#"
                          isActive={item === page}
                          onClick={(e) => {
                            e.preventDefault();
                            setPage(item);
                          }}
                        >
                          {item}
                        </PaginationLink>
                      </PaginationItem>
                    ),
                  )}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setPage((p) => Math.min(totalPages, p + 1));
                      }}
                      className={
                        page === totalPages
                          ? 'pointer-events-none opacity-50'
                          : ''
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </TabsPanel>

        <TabsPanel value="tab-2">
          <p className="p-4 text-center text-muted-foreground text-xs">
            Tab 2 content
          </p>
        </TabsPanel>
      </Tabs>
    </div>
  );
}
