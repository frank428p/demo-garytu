'use client';

import Link from 'next/link';
import {
  IconArrowLeft,
  IconShoppingCart,
  IconTrash,
  IconShieldCheck,
  IconBolt,
} from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { RouterUrl } from '@/@core/constants/routerUrl';
import { useCart } from '@/@core/provider/cartContext';

export default function CartView() {
  const { items, removeItem, total } = useCart();

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      {/* Back link */}
      <Link
        href={RouterUrl.Store}
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <IconArrowLeft size={16} />
        Back to Store
      </Link>

      {/* Page title */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <IconShoppingCart size={22} />
          <h1 className="text-xl font-bold">Shopping Cart</h1>
        </div>
        <span className="text-sm text-muted-foreground">
          {items.length} items
        </span>
      </div>

      {/* Empty state */}
      {items.length === 0 && (
        <div className="flex flex-col items-center gap-4 py-24 text-center">
          <IconShoppingCart size={48} className="text-muted-foreground/40" />
          <p className="text-muted-foreground">Your cart is empty</p>
          <Button variant="secondary" asChild>
            <Link href={RouterUrl.Store}>Browse Prompts</Link>
          </Button>
        </div>
      )}

      {/* Cart items */}
      {items.length > 0 && (
        <>
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-xl border border-border bg-card p-4"
              >
                {/* Thumbnail */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.item.files[0].url}
                  alt={item.item.name}
                  className="h-16 w-16 shrink-0 rounded-lg object-cover"
                />

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium leading-snug">
                    {item.item.name}
                  </p>
                  {/* <p className="mt-0.5 text-xs text-muted-foreground">
                    #{item.id} · AI Prompt ·{' '}
                    {item.item.files[0].mediaType.charAt(0).toUpperCase() + item.mediaType.slice(1)}
                  </p> */}
                </div>

                {/* Price + Remove */}
                <div className="flex shrink-0 flex-col items-end gap-2">
                  <span className="font-semibold">
                    NT$&nbsp;{item.item.price.toLocaleString()}
                  </span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <IconTrash size={13} />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="mt-8 rounded-xl border border-border bg-card p-5">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-muted-foreground">
                Total ({items.length} {items.length === 1 ? 'item' : 'items'})
              </span>
              <span className="text-2xl font-bold tracking-tight">
                NT$&nbsp;{total.toLocaleString()}
              </span>
            </div>

            <Button size="lg" className="mt-4 w-full font-semibold">
              <IconShieldCheck size={16} />
              Checkout &nbsp;·&nbsp; NT$&nbsp;{total.toLocaleString()}
            </Button>

            {/* Trust indicators */}
            <div className="mt-4 flex items-center justify-center gap-6 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <IconShieldCheck size={13} />
                Secure Payment
              </span>
              <span className="flex items-center gap-1.5">
                <IconBolt size={13} />
                Instant Download
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
