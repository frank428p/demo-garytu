'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsPanel } from '@/components/ui/tabs';
import { PaginationControls } from '@/components/ui/pagination-controls';
import { EmptyState } from '@/components/ui/empty-state';
import {
  usePurchasedPrompts,
  useFavoritePrompts,
} from '@/@core/useQuery/usePrompts';
import type { Prompt } from '@/@core/types/prompt';
import {
  IconArrowRight,
  IconExternalLink,
  IconPhoto,
  IconVideo,
} from '@tabler/icons-react';
import { Tag } from '@/components/ui/tag';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

function PromptCard({ prompt }: { prompt: Prompt }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <Link
      href={`/store/${prompt.uuid}`}
      className="media-item group flex flex-row items-center gap-4 px-4 py-3 hover:bg-secondary-hover/50 transition-colors duration-150"
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
        <div className="flex items-center gap-1.5 -ml-[2px]">
          <Tag variant="primary">
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
            <Tag variant="primary">{prompt?.category?.name}</Tag>
          )}
        </div>
        <span className="text-sm md:text-[15px] font-semibold text-foreground leading-snug line-clamp-1">
          {prompt.name}
        </span>
      </div>

      <IconExternalLink className="size-5 shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
    </Link>
  );
}

function PromptGrid({
  fetchFn,
  emptyDescription,
}: {
  fetchFn: typeof usePurchasedPrompts | typeof useFavoritePrompts;
  emptyDescription?: string;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isFetchingNextPage, fetchNextPage } = fetchFn({
    page_size: 5,
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
      <EmptyState
        title="No prompts yet"
        description={emptyDescription}
        action={
          <Button size={'sm'} asChild>
            <Link href="/store">
              Browse Store <IconArrowRight className="!size-3" />
            </Link>
          </Button>
        }
      />
    );
  }

  return (
    <div className="">
      <div className="grid grid-cols-1 sm:grid-cols-1 divide-y divide-border/50">
        {currentItems.map((prompt) => (
          <PromptCard key={prompt.uuid} prompt={prompt} />
        ))}
      </div>

      <div className="border-t border-border/50 p-3">
        <PaginationControls
          page={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          isLoading={loading}
          className="flex justify-end"
        />
      </div>
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
          {"Prompts you've purchased and bookmarked."}
        </p>
      </div>

      <div className="bg-card p-2 rounded-2xl">
        <ToggleGroup
          type="single"
          variant="segmented"
          size="sm"
          value={activeTab}
          onValueChange={(v) => {
            if (v) setActiveTab(v);
          }}
          className="w-fit bg-card gap-2 p-0 mb-2"
        >
          <ToggleGroupItem
            value="tab-1"
            className="px-3 py-1 text-xs font-semibold h-6"
          >
            Purchased
          </ToggleGroupItem>
          <ToggleGroupItem
            value="tab-2"
            className="px-3 py-1 text-xs font-semibold h-6"
          >
            Bookmarked
          </ToggleGroupItem>
        </ToggleGroup>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsPanel
            value="tab-1"
            className="bg-secondary/50 rounded-2xl overflow-hidden"
          >
            {activeTab === 'tab-1' && (
              <PromptGrid
                fetchFn={usePurchasedPrompts}
                emptyDescription="Your purchased prompts will appear here."
              />
            )}
          </TabsPanel>

          <TabsPanel
            value="tab-2"
            className="bg-secondary/50 rounded-2xl overflow-hidden"
          >
            {activeTab === 'tab-2' && (
              <PromptGrid
                fetchFn={useFavoritePrompts}
                emptyDescription="Your bookmarked prompts will appear here."
              />
            )}
          </TabsPanel>
        </Tabs>
      </div>
    </div>
  );
}
