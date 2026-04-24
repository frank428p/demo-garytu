'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';

const PdfViewerDialog = dynamic(
  () => import('@/components/PdfViewerDialog').then((m) => m.PdfViewerDialog),
  { ssr: false },
);
import {
  IconBookmarkFilled,
  IconBookmark,
  IconShare3,
  IconVideo,
  IconPhoto,
  IconCurrencyEthereum,
  IconDownload,
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
import { Tag } from '@/components/ui/tag';
import { useTranslations } from 'next-intl';

type PromptDetailViewProps = {
  id: string;
};

const PromptStoreDetailView = ({ id }: PromptDetailViewProps) => {
  const t = useTranslations('common');
  const { data, isPending: isPromptPending } = usePrompt(id);
  const prompt = data?.data;
  const [pdfOpen, setPdfOpen] = useState(false);

  const router = useRouter();
  const requireAuthWithDialog = useRequireAuth(false);
  const requireAuth = useRequireAuth(true);
  const isBookmarked = requireAuth() && prompt?.user_state?.is_favorite;
  const { add: addFavorite, remove: removeFavorite } = useToggleFavorite(id);
  const { addItem, isAddingToCart } = useCart();
  const { data: cartData, isFetching: isCartFetching } = useCartItems();
  const inCart = cartData?.data?.some((item) => item.item.uuid === id) ?? false;

  return (
    <div className="container flex flex-col gap-4">
      {/* Image slider */}
      <div className="">
        {prompt && (
          <div className="p-6 border border-border rounded-lg media-card">
            <ThumbnailSlider
              mediaType={prompt?.media_type ?? 'IMAGE'}
              files={prompt?.files}
            />
          </div>
        )}
        {/* {prompt ? (
          <ThumbnailSlider
            mediaType={prompt.media_type ?? 'IMAGE'}
            files={prompt.files}
          />
        ) : (
          <>
            <div className="space-y-2 md:hidden">
              <Skeleton className="aspect-square w-full rounded-3xl" />
              <div className="overflow-hidden flex gap-2">
                <Skeleton className="aspect-square w-24 h-24 rounded-xl" />
                <Skeleton className="aspect-square w-24 h-24 rounded-xl" />
                <Skeleton className="aspect-square w-24 h-24 rounded-xl" />
              </div>
            </div>

            <div
              className="hidden md:grid gap-4"
              style={{ gridTemplateColumns: '5rem minmax(0, 1fr)' }}
            >
              <div className="w-20 h-full overflow-hidden flex flex-col gap-2">
                <Skeleton className="aspect-square w-full rounded-xl" />
                <Skeleton className="aspect-square w-full rounded-xl" />
                <Skeleton className="aspect-square w-full rounded-xl" />
              </div>
              <Skeleton className="aspect-square w-full rounded-3xl" />
            </div>
          </>
        )} */}
      </div>

      {/* Info panel */}
      <div className="flex flex-row gap-6 items-start">
        <div className="flex-1 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            {/* Category badges */}
            <div className="flex flex-wrap items-center gap-2">
              {prompt?.media_type ? (
                <Tag>
                  <div className="flex items-center gap-1">
                    {prompt?.media_type === 'VIDEO' ? (
                      <>
                        <IconVideo size={14} />
                        {t('Video')}
                      </>
                    ) : (
                      <>
                        <IconPhoto size={14} />
                        {t('Image')}
                      </>
                    )}
                  </div>
                </Tag>
              ) : (
                <Skeleton className="h-4 w-[48px]" />
              )}

              {prompt?.category ? (
                <Tag variant="default">{prompt?.category?.name}</Tag>
              ) : (
                <Skeleton className="h-4 w-[48px]" />
              )}

              {prompt?.bonus_credit != null ? (
                <Tag variant="primary" className="items-center">
                  {t('Bonus Credit')} <IconCurrencyEthereum size={14} />{' '}
                  {prompt?.bonus_credit}
                </Tag>
              ) : (
                <Skeleton className="h-4 w-[48px]" />
              )}
            </div>
            {/* Title */}
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-2 items-center justify-between">
                {prompt?.name ? (
                  <h2 className="text-lg lg:text-2xl font-bold leading-snug">
                    {prompt?.name}
                  </h2>
                ) : (
                  <Skeleton className="h-10 w-2/3 rounded-lg" />
                )}
              </div>

              {/* Price */}
              <div className="flex items-center gap-2.5">
                {prompt ? (
                  <span className="text-md lg:text-lg font-normal">
                    NT$&nbsp;{prompt?.price?.toLocaleString()}
                  </span>
                ) : (
                  <Skeleton className="h-8 w-1/3" />
                )}
                {/* <span className="text-sm text-muted-foreground line-through">
            NT$&nbsp;2,000
          </span> */}
              </div>
            </div>
          </div>

          {/* Description */}
          {prompt ? (
            <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">
              {prompt.description}
            </p>
          ) : (
            <Skeleton className="h-8 w-full" />
          )}

          <div className="h-px bg-border" />

          {/* Compatible with */}
          <div className="space-y-2.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t('Compatible with')}
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
            {prompt ? (
              <>
                {prompt?.user_state?.purchased ? (
                  <>
                    <Button
                      size="lg"
                      className="px-4 md:px-8 md:w-[160px] font-semibold"
                      onClick={() => setPdfOpen(true)}
                    >
                      {t('Open PDF')}
                    </Button>
                    {prompt?.zip?.url && (
                      <Button
                        size="lg"
                        className="px-4 md:px-8 font-semibold"
                        onClick={async () => {
                          const token =
                            document.cookie.match(
                              /(?:^|;\s*)access_token=([^;]+)/,
                            )?.[1] ?? '';
                          const res = await fetch(prompt.zip.url, {
                            headers: token
                              ? { Authorization: `Bearer ${token}` }
                              : {},
                          });
                          const blob = await res.blob();
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `${prompt.name ?? 'media'}.zip`;
                          a.click();
                          URL.revokeObjectURL(url);
                        }}
                      >
                        <IconDownload />
                        <span className="hidden min-[410px]:inline">
                          {t('Media Pack')}
                        </span>
                      </Button>
                    )}
                  </>
                ) : (
                  <>
                    <Button
                      size="lg"
                      className="px-4 md:px-8 md:w-[160px] font-semibold"
                      onClick={() => {
                        if (!requireAuthWithDialog()) return;
                        if (prompt?.uuid)
                          router.push(`/checkout/${prompt.uuid}`);
                      }}
                    >
                      {t('Buy Now')}
                    </Button>
                    <Button
                      variant="secondary"
                      size="lg"
                      className="px-4 md:px-8 md:w-[160px]"
                      disabled={
                        inCart ||
                        isAddingToCart ||
                        isPromptPending ||
                        isCartFetching
                      }
                      onClick={() => {
                        if (!requireAuthWithDialog()) return;
                        addItem(id);
                      }}
                    >
                      {inCart ? t('Added to Cart') : t('Add to Cart')}
                    </Button>
                  </>
                )}

                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    'rounded-lg !h-10 !w-10',
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
                  className="rounded-lg h-10 w-10"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast.success('Share link copied!', {
                      position: 'top-center',
                    });
                  }}
                >
                  <IconShare3 size={18} color="var(--muted-foreground)" />
                </Button>
              </>
            ) : (
              <Skeleton className="h-10 w-[160px]"></Skeleton>
            )}
          </div>

          <PdfViewerDialog
            open={pdfOpen}
            onOpenChange={setPdfOpen}
            url={prompt?.pdf?.url ?? ''}
            title={prompt?.name}
          />

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
        <div className="w-[480px] shrink-0"></div>
      </div>
    </div>
  );
};

export default PromptStoreDetailView;
