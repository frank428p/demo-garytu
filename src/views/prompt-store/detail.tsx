'use client';

import { Button } from '@/components/ui/button';
import {
  IconBookmarkFilled,
  IconBookmark,
  IconShare3,
} from '@tabler/icons-react';
import { ThumbnailSlider } from '@/components/ThumbnailSlider';
import { useCart } from '@/@core/provider/cartContext';
import { usePrompt, useToggleFavorite } from '@/@core/useQuery/usePrompts';
import { Skeleton } from '@/components/ui/skeleton';
import { useRequireAuth } from '@/@core/provider/authContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useCartItems } from '@/@core/useQuery/useCart';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type PromptDetailViewProps = {
  id: string;
};

const PromptStoreDetailView = ({ id }: PromptDetailViewProps) => {
  const { data, isPending: isPromptPending } = usePrompt(id);
  const prompt = data?.data;

  const router = useRouter();
  const requireAuthWithDialog = useRequireAuth(false);
  const requireAuth = useRequireAuth(true);
  const isBookmarked = requireAuth() && prompt?.user_state?.is_favorite;
  const { add: addFavorite, remove: removeFavorite } = useToggleFavorite(id);
  const { addItem, isAddingToCart } = useCart();
  const { data: cartData, isFetching: isCartFetching } = useCartItems();
  const inCart = cartData?.data?.some((item) => item.item.uuid === id) ?? false;

  return (
    <div className="flex flex-col gap-4 lg:gap-12 lg:flex-row lg:items-start pt-4">
      {/* Image slider */}
      <div className="min-w-0 lg:flex-[5] lg:sticky lg:top-18">
        {prompt ? (
          <ThumbnailSlider
            mediaType={prompt.files[0]?.file_type ?? 'IMAGE'}
            files={prompt.files}
          />
        ) : (
          <Skeleton className="aspect-square w-full rounded-3xl" />
        )}
      </div>

      {/* Info panel */}
      <div className="flex w-full flex-col gap-5 pb-8 lg:flex-[5] lg:shrink-0">
        {/* Title */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2 items-center justify-between">
            {prompt?.name ? (
              <h2 className="text-xl lg:text-3xl font-bold leading-snug">
                {prompt?.name}
              </h2>
            ) : (
              <Skeleton className="h-8 w-2/3 rounded-lg" />
            )}

            {/* <div
              className="cursor-pointer"
              onClick={() => {
                if (!requireAuthWithDialog()) return;
                if (isBookmarked) removeFavorite.mutate();
                else addFavorite.mutate();
              }}
            >
              {isBookmarked ? (
                <IconBookmarkFilled size={18} color="var(--primary)" />
              ) : (
                <IconBookmark size={18} color="var(--muted-foreground)" />
              )}
            </div> */}
          </div>

          {/* Category badges */}
          <div className="flex flex-wrap items-center gap-2">
            {prompt?.name ? (
              <span className="inline-flex items-center rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-medium text-primary">
                AI Prompt
              </span>
            ) : (
              <Skeleton className="h-4 w-[48px]" />
            )}

            {prompt?.bonus_credit != null ? (
              <span className="rounded-full bg-chart-1/10 px-1.5 py-0.5 text-xs font-bold text-chart-1">
                Bonus Credit: {prompt?.bonus_credit}
              </span>
            ) : (
              <Skeleton className="h-4 w-[48px]" />
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
        <div className="flex flex-row gap-2.5 mb-8">
          <Button
            size="lg"
            className="px-4 md:px-8 md:w-[160px] font-semibold"
            onClick={() => {
              if (!requireAuthWithDialog()) return;
              if (prompt?.uuid) router.push(`/checkout/${prompt.uuid}`);
            }}
          >
            Buy Now
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="px-4 md:px-8 md:w-[160px]"
            disabled={
              inCart || isAddingToCart || isPromptPending || isCartFetching
            }
            onClick={() => {
              if (!requireAuthWithDialog()) return;
              addItem(id);
            }}
          >
            {inCart ? 'Added to Cart' : 'Add to Cart'}
          </Button>

          <Button
            variant="outline"
            size="icon"
            className={cn(
              'rounded-full !h-10 !w-10',
              isBookmarked && 'border-primary',
            )}
            onClick={() => {
              if (!requireAuthWithDialog()) return;
              if (isBookmarked) removeFavorite.mutate();
              else addFavorite.mutate();
            }}
          >
            {isBookmarked ? (
              <IconBookmarkFilled size={18} color="var(--primary)" />
            ) : (
              <IconBookmark size={18} color="var(--muted-foreground)" />
            )}
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-10 w-10"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              toast.success('Share link copied!', { position: 'top-center' });
            }}
          >
            <IconShare3 size={18} color="var(--muted-foreground)" />
          </Button>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="shipping">
            <AccordionTrigger>What is an AI prompt package?</AccordionTrigger>
            <AccordionContent>
              We offer standard (5-7 days), express (2-3 days), and overnight
              shipping. Free shipping on international orders.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="returns">
            <AccordionTrigger>How to use AI prompt package?</AccordionTrigger>
            <AccordionContent>
              Returns accepted within 30 days. Items must be unused and in
              original packaging. Refunds processed within 5-7 business days.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="support">
            <AccordionTrigger>
              How can I contact customer support?
            </AccordionTrigger>
            <AccordionContent>
              Reach us via email, live chat, or phone. We respond within 24
              hours during business days.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default PromptStoreDetailView;
