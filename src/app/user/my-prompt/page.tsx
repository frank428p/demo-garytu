'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsPanel, TabsTab } from '@/components/ui/tabs';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  usePurchasedPrompts,
  useFavoritePrompts,
} from '@/@core/useQuery/usePrompts';
import type { Prompt } from '@/@core/types/prompt';
import { IconExternalLink, IconPhoto, IconVideo } from '@tabler/icons-react';
import { Tag } from '@/components/ui/tag';
import { cn } from '@/lib/utils';

function getPageItems(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const items: (number | 'ellipsis')[] = [1];
  if (current > 3) items.push('ellipsis');
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) items.push(i);
  if (current < total - 2) items.push('ellipsis');
  items.push(total);
  return items;
}

function PromptCard({ prompt }: { prompt: Prompt }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <Link
      href={`/toolkit/store/${prompt.uuid}`}
      className="media-item group flex flex-row items-center gap-4 rounded-2xl bg-card px-3 py-3 hover:border-border hover:bg-secondary/50 transition-all duration-200"
    >
      <div className="media-thumb relative shrink-0 w-20 md:w-24 aspect-video overflow-hidden rounded-xl">
        {!imgLoaded && <Skeleton className="absolute inset-0 rounded-none" />}
        <Image
          src={prompt?.cover?.thumbnail_url}
          alt={prompt.name}
          fill
          sizes="(min-width: 768px) 96px, 80px"
          className={cn(
            'object-cover transition-opacity duration-300',
            imgLoaded ? 'opacity-100' : 'opacity-0',
          )}
          onLoad={() => setImgLoaded(true)}
        />
      </div>

      <div className="flex flex-col gap-1 min-w-0 flex-1">
        <span className="text-sm md:text-[15px] font-semibold text-foreground leading-snug line-clamp-1 group-hover:text-primary transition-colors duration-200">
          {prompt.name}
        </span>
        <div className="flex items-center gap-1.5">
          <Tag>
            <div className="flex items-center gap-1">
              {prompt?.media_type === 'VIDEO' ? (
                <>
                  <IconVideo size={14} />
                  Video
                </>
              ) : (
                <>
                  <IconPhoto size={14} />
                  Image
                </>
              )}
            </div>
          </Tag>
          {prompt?.category && (
            <Tag variant="default">{prompt?.category?.name}</Tag>
          )}
        </div>
      </div>

      <IconExternalLink className="size-4 shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
    </Link>
  );
}

function PromptGrid({
  fetchFn,
}: {
  fetchFn: typeof usePurchasedPrompts | typeof useFavoritePrompts;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isFetchingNextPage, fetchNextPage } = fetchFn({
    page_size: 10,
  });

  const currentItems = data?.pages[currentPage - 1]?.data ?? [];
  const totalPages = data?.pages[0]?.meta?.total_pages ?? 1;
  const loading = isLoading || isFetchingNextPage;

  const goToPage = async (page: number) => {
    const fetchedCount = data?.pages.length ?? 0;
    const fetches = Array.from(
      { length: Math.max(0, page - fetchedCount) },
      () => fetchNextPage(),
    );
    await Promise.all(fetches);
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className="pt-4 flex flex-col gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-row items-center gap-4 rounded-2xl bg-card px-3 py-3"
          >
            <Skeleton className="shrink-0 w-20 md:w-24 aspect-video rounded-xl" />
            <div className="flex flex-col gap-2 flex-1 min-w-0">
              <Skeleton className="h-4 w-2/3" />
              <div className="flex gap-1.5">
                <Skeleton className="h-4 w-10 rounded-md" />
                <Skeleton className="h-4 w-14 rounded-md" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!loading && currentItems.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-muted-foreground">
        Nothing here yet.
      </p>
    );
  }

  return (
    <div className="pt-4">
      <div className="grid grid-cols-1 sm:grid-cols-1 gap-3">
        {currentItems.map((prompt) => (
          <PromptCard key={prompt.uuid} prompt={prompt} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination className="mt-6 flex justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) goToPage(currentPage - 1);
                }}
                className={
                  currentPage === 1 || loading
                    ? 'pointer-events-none opacity-50'
                    : ''
                }
              />
            </PaginationItem>

            {getPageItems(currentPage, totalPages).map((item, i) =>
              item === 'ellipsis' ? (
                <PaginationItem key={`ellipsis-${i}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={item}>
                  <PaginationLink
                    href="#"
                    isActive={item === currentPage}
                    onClick={(e) => {
                      e.preventDefault();
                      if (item !== currentPage) goToPage(item);
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
                  if (currentPage < totalPages) goToPage(currentPage + 1);
                }}
                className={
                  currentPage === totalPages || loading
                    ? 'pointer-events-none opacity-50'
                    : ''
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}

export default function MyPromptPage() {
  const [activeTab, setActiveTab] = useState('tab-1');

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">My Prompt</h1>
        <p className="text-muted-foreground mt-1">
          {"Prompts you've purchased and saved."}
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="border-b border-border">
          <TabsList variant="underline">
            <TabsTab value="tab-1">Purchased</TabsTab>
            <TabsTab value="tab-2">Favorite</TabsTab>
          </TabsList>
        </div>

        <TabsPanel value="tab-1">
          {activeTab === 'tab-1' && (
            <PromptGrid fetchFn={usePurchasedPrompts} />
          )}
        </TabsPanel>

        <TabsPanel value="tab-2">
          {activeTab === 'tab-2' && <PromptGrid fetchFn={useFavoritePrompts} />}
        </TabsPanel>
      </Tabs>
    </div>
  );
}
