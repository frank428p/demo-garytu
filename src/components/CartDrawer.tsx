'use client';

import {
  Sheet,
  SheetPopup,
  SheetHeader,
  SheetTitle,
  SheetPanel,
  SheetFooter,
} from '@/components/ui/sheet';
import {
  IconShoppingCart,
  IconTrash,
  IconArrowRight,
  IconVideo,
  IconPhoto,
  IconCurrencyEthereum,
  IconSparkles,
  IconLock,
} from '@tabler/icons-react';
import { useState, useCallback } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useCart } from '@/@core/provider/cartContext';
import { Skeleton } from './ui/skeleton';
import { cn } from '@/lib/utils';
import { Tag } from './ui/tag';

// ─── Image ────────────────────────────────────────────────────────────────────

function CartItemImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useCallback((el: HTMLImageElement | null) => {
    if (el?.complete && el.naturalWidth > 0) setLoaded(true);
  }, []);
  return (
    <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-xl bg-white/5">
      {!loaded && <Skeleton className="absolute inset-0 rounded-none" />}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={cn(
          'h-full w-full object-cover transition-all duration-500',
          loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105',
        )}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyCart({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col h-full items-center justify-center text-center px-6 gap-6">
      {/* Animated cart icon */}
      {/* <div className="relative">
        <div className="absolute inset-0 rounded-full bg-primary/10 blur-2xl scale-150" />
        <div className="relative w-20 h-20 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
          <IconShoppingCart size={32} className="text-white/20" />
        </div>
      </div> */}

      <div className="flex flex-col gap-2">
        <h3 className="text-base font-semibold text-foreground">
          Your cart is empty
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-[200px]">
          Discover curated AI prompt packs crafted by top creators.
        </p>
      </div>

      <Link
        href="/toolkit/store"
        onClick={onClose}
        className="group inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-[0_0_24px_oklch(0.51_0.17_28.14/0.4)] transition-all duration-300 hover:shadow-[0_0_36px_oklch(0.51_0.17_28.14/0.55)] hover:scale-105"
      >
        Browse Store
        <IconArrowRight
          size={14}
          className="transition-transform group-hover:translate-x-0.5"
        />
      </Link>
    </div>
  );
}

// ─── CartDrawer ───────────────────────────────────────────────────────────────

export function CartDrawer() {
  const { items, removeItem, total, isOpen, setIsOpen } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetPopup side="right" variant="inset" className="bg-background">
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <SheetHeader className="flex-row items-center gap-3 px-5 py-4">
          {/* <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 border border-primary/20">
            <IconShoppingCart size={15} className="text-primary" />
          </div> */}
          <div className="flex items-center gap-2 flex-1">
            <SheetTitle className="text-base text-white">Cart</SheetTitle>
            {items.length > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-white">
                {items.length}
              </span>
            )}
          </div>
          {/* {items.length > 0 && (
            <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-white">
              {items.length}
            </span>
          )} */}
        </SheetHeader>

        {/* ── Items ──────────────────────────────────────────────────────── */}
        <SheetPanel className="px-4 h-full">
          {items.length === 0 ? (
            <EmptyCart onClose={() => setIsOpen(false)} />
          ) : (
            <div className="flex flex-col gap-1 pb-2">
              {items.map((item) => (
                <Link
                  key={item?.id}
                  href={`/toolkit/store/${item?.item?.uuid}`}
                  onClick={() => setIsOpen(false)}
                  className="group relative flex items-center gap-3.5 rounded-2xl p-3 transition-all duration-200 hover:bg-white/[0.04]"
                >
                  <CartItemImage
                    src={item?.item?.cover?.thumbnail_url}
                    alt={item.item?.name ?? ''}
                  />

                  <div className="min-w-0 flex-1 flex flex-col gap-1.5">
                    <p className="truncate text-md font-bold text-white/90 leading-tight">
                      {item?.item?.name}
                    </p>

                    {/* Tags row */}
                    <div className="flex items-center gap-1.5">
                      {/* Media type */}
                      <Tag className="gap-1">
                        {item?.item?.media_type === 'VIDEO' ? (
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
                      </Tag>

                      {/* Credits */}
                      <Tag variant="primary" className="gap-0.5">
                        <IconCurrencyEthereum size={14} />
                        {item?.item?.bonus_credit}
                      </Tag>
                    </div>

                    {/* Price */}
                    <span className="text-sm font-bold text-white">
                      NT$&nbsp;{item.item.price.toLocaleString()}
                    </span>
                  </div>

                  {/* Delete */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      removeItem(item.id);
                    }}
                    className="shrink-0 flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground opacity-100 hover:text-primary cursor-pointer"
                    aria-label="Remove item"
                  >
                    <IconTrash size={15} />
                  </button>
                </Link>
              ))}
            </div>
          )}
        </SheetPanel>

        {/* ── Footer ─────────────────────────────────────────────────────── */}
        {items.length > 0 && (
          <SheetFooter
            variant="bare"
            className="border-t border-border px-5 pt-4 pb-5"
          >
            <div className="w-full flex flex-col gap-3">
              {/* Summary */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/40 uppercase tracking-widest">
                  total
                </span>
                <span className="text-lg font-bold text-white">
                  NT$&nbsp;{total.toLocaleString()}
                </span>
              </div>

              {/* Checkout button */}
              <Button
                size="lg"
                className="w-full font-semibold"
                asChild
                onClick={() => setIsOpen(false)}
              >
                <Link href="/checkout/cart">Checkout</Link>
              </Button>
              {/* <div className="flex items-center justify-center">
                <div className="flex items-center gap-1.5 text-[11px] text-white/30">
                  <IconLock size={14} />
                  Secure checkout · SSL encrypted
                </div>
              </div> */}
            </div>
          </SheetFooter>
        )}
      </SheetPopup>
    </Sheet>
  );
}
