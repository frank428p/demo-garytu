'use client';

import { Button } from '@/components/ui/button';
import {
  IconBookmarkFilled,
  IconBookmark,
  IconShieldCheck,
  IconDownload,
} from '@tabler/icons-react';
import { ThumbnailSlider } from '@/components/ThumbnailSlider';
import { MediaType, AspectRatioType } from '@/@core/types';
import { useMemo } from 'react';
import { useCart } from '@/@core/provider/cartContext';
import { useRouter } from 'next/navigation';
import { RouterUrl } from '@/@core/constants/routerUrl';
import { usePrompt } from '@/@core/useQuery/usePrompts';
import { Skeleton } from '@/components/ui/skeleton';
import { useRequireAuth } from '@/@core/provider/authContext';

type PromptDetailViewProps = {
  id: string;
};

const PromptStoreDetailView = ({ id }: PromptDetailViewProps) => {
  const { data } = usePrompt(id);
  const prompt = data?.data;

  const requireAuth = useRequireAuth();
  const { addItem, items } = useCart();
  const router = useRouter();
  const inCart = items.some((item) => item.item.uuid === id);

  return (
    <div className="flex flex-col gap-4 lg:gap-12 lg:flex-row lg:items-start">
      {/* Image slider */}
      <div className="min-w-0 lg:flex-[5] lg:sticky lg:top-[3.5rem]">
        {prompt ? (
          <ThumbnailSlider
            mediaType={prompt.files[0]?.file_type ?? 'IMAGE'}
            files={prompt.files}
          />
        ) : (
          // <div className="aspect-square w-full animate-pulse rounded-xl bg-muted" />
          <Skeleton className="aspect-square w-full rounded-3xl" />
        )}
      </div>

      {/* Info panel */}
      <div className="flex w-full flex-col gap-5 lg:flex-[5] lg:shrink-0">
        {/* Title */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2 items-center justify-between">
            <h2 className="text-xl lg:text-3xl font-bold leading-snug">
              {prompt?.name ? (
                prompt.name
              ) : (
                <Skeleton className="h-8 w-2/3 rounded-lg" />
              )}
            </h2>
            <IconBookmark
              size={18}
              className="cursor-pointer"
              color="var(--muted-foreground)"
            />
          </div>

          {/* Category badges */}
          <div className="flex flex-wrap gap-2">
            {prompt?.name ? (
              <span className="inline-flex items-center rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-medium text-primary">
                AI Prompt
              </span>
            ) : (
              <Skeleton className="h-4 w-1/3" />
            )}
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2.5">
          {prompt ? (
            <span className="text-2xl font-bold tracking-tight">
              NT$&nbsp;{prompt?.price?.toLocaleString()}
            </span>
          ) : (
            <Skeleton className="h-5 w-1/3" />
          )}
          {/* <span className="text-sm text-muted-foreground line-through">
            NT$&nbsp;2,000
          </span> */}
          <span className="rounded bg-chart-1/10 px-1.5 py-0.5 text-xs font-bold text-chart-1">
            Bonus Credit: {prompt?.bonus_credit}
          </span>
        </div>

        {/* Description */}

        {prompt ? (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {prompt.description}
          </p>
        ) : (
          <Skeleton className="h-8 w-full" />
        )}

        <div className="h-px bg-border" />

        {/* Compatible with */}
        <div className="space-y-2.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Compatible with
          </p>
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              width={22}
              height={22}
              src="/images/fake/adobe-ai.png"
              alt="Adobe Illustrator"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              width={22}
              height={22}
              src="/images/fake/adobe-ps.png"
              alt="Adobe Photoshop"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              width={22}
              height={22}
              src="/images/fake/adobe-id.png"
              alt="Adobe InDesign"
            />
          </div>
        </div>

        <div className="h-px bg-border" />

        {/* CTA buttons */}
        <div className="flex flex-col md:flex-row gap-2.5">
          <Button size="lg" className="w-full font-semibold" onClick={() => {}}>
            Buy Now
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="w-full"
            disabled={inCart}
            onClick={() => {
              console.log('requireAuth', requireAuth);
              if (!requireAuth()) return;
              addItem(id);
            }}
          >
            {inCart ? 'Added to Cart' : 'Add to Cart'}
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <IconShieldCheck size={14} />
            Secure checkout
          </span>
          <span className="flex items-center gap-1.5">
            <IconDownload size={14} />
            Instant access
          </span>
        </div>
      </div>
    </div>
  );
};

export default PromptStoreDetailView;
