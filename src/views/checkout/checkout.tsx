'use client';

import { useParams } from 'next/navigation';
import { useState, useCallback, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import {
  IconTrash,
  IconShieldCheck,
  IconLock,
  IconPackage,
  IconCurrencyEthereum,
  IconPhoto,
  IconVideo,
  IconArrowLeft,
  IconBolt,
  IconChevronRight,
} from '@tabler/icons-react';
import { useCart } from '@/@core/provider/cartContext';
import { usePrompt } from '@/@core/useQuery/usePrompts';
import {
  useCheckoutFromCart,
  useCheckoutDirect,
} from '@/@core/useQuery/useOrders';
import type { Prompt } from '@/@core/types/prompt';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type CheckoutViewProps = { type: 'CART' | 'SINGLE_PROMPT' };

// ─── Animated price counter ───────────────────────────────────────────────────

function PriceCounter({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const duration = 900;
    const from = 0;

    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out expo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(Math.round(from + (value - from) * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [value]);

  return (
    <span className="font-bebas tabular-nums" style={{ fontSize: 'clamp(52px, 7vw, 80px)', lineHeight: 1 }}>
      {display.toLocaleString()}
    </span>
  );
}

// ─── Thumbnail ────────────────────────────────────────────────────────────────

function Thumb({ src, alt }: { src?: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  const ref = useCallback((el: HTMLImageElement | null) => {
    if (el?.complete && el.naturalWidth > 0) setLoaded(true);
  }, []);

  return (
    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-secondary group-hover:ring-2 group-hover:ring-primary/30 transition-shadow duration-300">
      {!src ? (
        <div className="flex h-full w-full items-center justify-center">
          <IconPackage size={20} className="text-muted-foreground" />
        </div>
      ) : (
        <>
          {!loaded && <Skeleton className="absolute inset-0 rounded-none" />}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={ref}
            src={src}
            alt={alt}
            onLoad={() => setLoaded(true)}
            className={cn(
              'h-full w-full object-cover transition-all duration-500 group-hover:scale-110',
              loaded ? 'opacity-100' : 'opacity-0',
            )}
          />
        </>
      )}
    </div>
  );
}

// ─── Product row ──────────────────────────────────────────────────────────────

function ProductRow({
  prompt,
  index = 0,
  onRemove,
}: {
  prompt: Prompt;
  index?: number;
  onRemove?: () => void;
}) {
  const [removing, setRemoving] = useState(false);
  const isVideo = prompt.media_type === 'VIDEO';
  const thumb =
    prompt.cover?.thumbnail_url ||
    prompt.files?.[0]?.thumbnail_url ||
    prompt.files?.[0]?.url;

  const handleRemove = () => {
    setRemoving(true);
    setTimeout(() => onRemove?.(), 300);
  };

  return (
    <div
      className={cn(
        'row-item group flex items-center gap-4 py-5 border-b border-border last:border-0 transition-all duration-300',
        removing && 'opacity-0 -translate-x-4 pointer-events-none',
      )}
      style={{ animationDelay: `${index * 0.07}s` }}
    >
      {/* Subtle index */}
      <span className="hidden sm:block w-5 shrink-0 text-center text-[11px] font-medium text-muted-foreground/40 tabular-nums select-none">
        {String(index + 1).padStart(2, '0')}
      </span>

      <Thumb src={thumb} alt={prompt.name} />

      <div className="min-w-0 flex-1 flex flex-col gap-2">
        <p className="text-sm font-semibold text-foreground leading-snug line-clamp-2">
          {prompt.name}
        </p>
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
            {isVideo ? <IconVideo size={11} /> : <IconPhoto size={11} />}
            {isVideo ? 'Video' : 'Image'}
          </span>
          <span className="inline-flex items-center gap-0.5 rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
            <IconCurrencyEthereum size={11} />
            {prompt.bonus_credit}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <span className="text-base font-bold text-foreground tabular-nums">
          NT${prompt.price.toLocaleString()}
        </span>
        {onRemove && (
          <button
            onClick={handleRemove}
            aria-label="Remove"
            className="h-8 w-8 flex items-center justify-center rounded-lg text-muted-foreground opacity-100 md:opacity-0 md:group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive transition-all duration-150 cursor-pointer"
          >
            <IconTrash size={14} />
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Skeleton row ─────────────────────────────────────────────────────────────

function RowSkeleton() {
  return (
    <div className="flex items-center gap-4 py-5 border-b border-border">
      <Skeleton className="h-20 w-20 shrink-0 rounded-xl" />
      <div className="flex-1 space-y-2.5">
        <Skeleton className="h-4 w-3/5" />
        <div className="flex gap-1.5">
          <Skeleton className="h-5 w-14 rounded-md" />
          <Skeleton className="h-5 w-16 rounded-md" />
        </div>
      </div>
      <Skeleton className="h-5 w-20" />
    </div>
  );
}

// ─── Summary panel ────────────────────────────────────────────────────────────

function SummaryPanel({
  total,
  itemCount,
  onCheckout,
  isPending,
}: {
  total: number;
  itemCount: number;
  onCheckout: () => void;
  isPending: boolean;
}) {
  const disabled = isPending || itemCount === 0;

  return (
    <div className="summary-panel sticky top-[4.5rem] flex flex-col rounded-2xl overflow-hidden border border-border bg-card">
      {/* Orange accent top */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

      {/* Big price hero */}
      <div className="px-6 pt-6 pb-4 border-b border-border">
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">
          Order Total
        </p>
        <div className="flex items-start gap-1">
          <span className="text-sm font-medium text-muted-foreground mt-3">NT$</span>
          <span className="text-primary drop-shadow-[0_0_20px_oklch(0.51_0.17_28.14/0.5)]">
            <PriceCounter value={total} />
          </span>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {itemCount} item{itemCount !== 1 ? 's' : ''} · No hidden fees
        </p>
      </div>

      {/* Line items */}
      <div className="px-6 py-4 flex flex-col gap-2.5 border-b border-border text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>Subtotal</span>
          <span className="text-foreground tabular-nums">NT${total.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Processing fee</span>
          <span className="text-primary font-medium">Free</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Delivery</span>
          <span className="text-primary font-medium">Instant</span>
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 py-5 flex flex-col gap-4">
        <button
          disabled={disabled}
          onClick={onCheckout}
          className={cn(
            'group relative w-full overflow-hidden rounded-xl py-3.5 text-sm font-semibold transition-all duration-300',
            disabled
              ? 'bg-secondary text-muted-foreground cursor-not-allowed'
              : 'bg-primary text-primary-foreground shadow-[0_4px_24px_oklch(0.51_0.17_28.14/0.35)] hover:shadow-[0_4px_36px_oklch(0.51_0.17_28.14/0.55)] hover:brightness-110 cursor-pointer',
          )}
        >
          {!disabled && (
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          )}
          <span className="relative flex items-center justify-center gap-2">
            {isPending ? (
              <>
                <span className="h-4 w-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
                Processing…
              </>
            ) : (
              <>
                <IconLock size={14} />
                Complete Purchase
                <IconChevronRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </>
            )}
          </span>
        </button>

        {/* Trust badges */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: IconLock, label: 'SSL Secure' },
            { icon: IconShieldCheck, label: 'Safe Pay' },
            { icon: IconBolt, label: 'Instant' },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1.5 rounded-xl bg-secondary/50 py-2.5 px-2"
            >
              <Icon size={14} className="text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground leading-none">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── CheckoutView ─────────────────────────────────────────────────────────────

const CheckoutView = ({ type }: CheckoutViewProps) => {
  const params = useParams<{ id: string }>();
  const { items, removeItem, total } = useCart();

  const { data: promptResponse, isLoading: promptLoading } = usePrompt(
    type === 'SINGLE_PROMPT' ? (params?.id ?? '') : '',
  );
  const prompt = promptResponse?.data;

  const { mutate: checkoutCart, isPending: cartPending } = useCheckoutFromCart();
  const { mutate: checkoutDirect, isPending: directPending } = useCheckoutDirect();

  const handleCheckout = () => {
    if (type === 'CART') {
      checkoutCart(undefined, {
        onSuccess: (res) => { window.location.href = res.data?.payment?.checkout_url; },
      });
    } else {
      if (!prompt) return;
      checkoutDirect(prompt.uuid, {
        onSuccess: (res) => { window.location.href = res.data?.payment?.checkout_url; },
      });
    }
  };

  const isPending = type === 'CART' ? cartPending : directPending;
  const totalAmount = type === 'CART' ? total : (prompt?.price ?? 0);
  const itemCount = type === 'CART' ? items.length : prompt ? 1 : 0;
  const backHref = type === 'CART' ? '/toolkit/store' : `/toolkit/store/${params?.id ?? ''}`;

  return (
    <>
      <style>{`
        .font-bebas { font-family: var(--font-bebas), sans-serif; }

        @keyframes row-in {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .row-item {
          opacity: 0;
          animation: row-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes panel-in {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .summary-panel {
          opacity: 0;
          animation: panel-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.15s forwards;
        }
        @keyframes header-in {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .page-header {
          opacity: 0;
          animation: header-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>

      <div className="min-h-screen px-4 py-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="page-header flex items-center gap-3 mb-8">
          <Link
            href={backHref}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors duration-150"
          >
            <IconArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-foreground">Checkout</h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              {itemCount} item{itemCount !== 1 ? 's' : ''} · Instant digital delivery
            </p>
          </div>
        </div>

        {/* Layout */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Left: items */}
          <div className="flex-1 min-w-0 rounded-2xl bg-card border border-border overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h2 className="text-sm font-semibold text-foreground">
                {type === 'CART' ? 'Your Items' : 'Item'}
              </h2>
              {type === 'CART' && items.length > 0 && (
                <span className="text-xs text-muted-foreground">
                  {items.length} item{items.length !== 1 ? 's' : ''}
                </span>
              )}
            </div>

            <div className="px-5">
              {type === 'CART' ? (
                items.length === 0 ? (
                  <div className="py-20 flex flex-col items-center gap-4 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center">
                      <IconPackage size={24} className="text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-1">Cart is empty</p>
                      <p className="text-xs text-muted-foreground">Add some prompts to get started.</p>
                    </div>
                    <Link
                      href="/toolkit/store"
                      className="text-xs font-medium text-primary hover:underline underline-offset-2"
                    >
                      Browse Prompt Store →
                    </Link>
                  </div>
                ) : (
                  items.map((cartItem, i) => (
                    <ProductRow
                      key={cartItem.id}
                      prompt={cartItem.item}
                      index={i}
                      onRemove={() => removeItem(cartItem.id)}
                    />
                  ))
                )
              ) : promptLoading ? (
                <RowSkeleton />
              ) : prompt ? (
                <ProductRow prompt={prompt} index={0} />
              ) : (
                <p className="py-20 text-center text-sm text-muted-foreground">Prompt not found.</p>
              )}
            </div>

            {itemCount > 0 && (
              <div className="mx-5 mb-5 mt-2 flex items-start gap-2.5 rounded-xl bg-primary/5 border border-primary/15 px-4 py-3">
                <IconBolt size={14} className="text-primary shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-foreground">Instant access</span> — all prompt files
                  available immediately in your dashboard after purchase.
                </p>
              </div>
            )}
          </div>

          {/* Right: summary */}
          <div className="w-full lg:w-[300px] xl:w-[320px] shrink-0">
            <SummaryPanel
              total={totalAmount}
              itemCount={itemCount}
              onCheckout={handleCheckout}
              isPending={isPending}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutView;
