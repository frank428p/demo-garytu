'use client';

import { DrawerPrimitive } from '@/components/ui/drawer';
import {
  IconShoppingCart,
  IconTrash,
  IconShieldCheck,
  IconBolt,
  IconX,
} from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/cartContext';

export function CartDrawer() {
  const { items, removeItem, total, isOpen, setIsOpen } = useCart();

  return (
    <DrawerPrimitive.Root
      direction="right"
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DrawerPrimitive.Portal>
        <DrawerPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60" />
        <DrawerPrimitive.Content className="fixed right-0 top-0 bottom-0 z-50 flex w-full max-w-sm flex-col bg-background outline-none">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div className="flex items-center gap-2">
              <IconShoppingCart size={18} />
              <DrawerPrimitive.Title className="font-semibold">
                Shopping Cart
              </DrawerPrimitive.Title>
              {items.length > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[11px] font-bold text-primary-foreground">
                  {items.length}
                </span>
              )}
            </div>
            <DrawerPrimitive.Close asChild>
              <button className="rounded-md p-1 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                <IconX size={18} />
              </button>
            </DrawerPrimitive.Close>
          </div>

          {/* Items list */}
          <div className="flex-1 overflow-y-auto px-5">
            {items.length === 0 ? (
              <div className="flex flex-col items-center gap-3 py-20 text-center">
                <IconShoppingCart
                  size={40}
                  className="text-muted-foreground/30"
                />
                <p className="text-sm text-muted-foreground">
                  Your cart is empty
                </p>
              </div>
            ) : (
              <div className="flex flex-col">
                {items.map((item) => (
                  // <div
                  //   key={item.id}
                  //   className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
                  // >
                  //   {/* Thumbnail */}
                  //   {/* eslint-disable-next-line @next/next/no-img-element */}
                  //   <img
                  //     src={item.thumbnail}
                  //     alt={item.name}
                  //     className="h-14 w-14 shrink-0 rounded-lg object-cover"
                  //   />

                  //   {/* Info */}
                  //   <div className="min-w-0 flex-1">
                  //     <p className="truncate text-sm font-medium">
                  //       {item.name}
                  //     </p>
                  //     <p className="mt-0.5 text-xs text-muted-foreground">
                  //       #{item.id} ·{' '}
                  //       {item.mediaType.charAt(0).toUpperCase() +
                  //         item.mediaType.slice(1)}
                  //     </p>
                  //     <p className="mt-1 text-sm font-semibold">
                  //       NT$&nbsp;{item.price.toLocaleString()}
                  //     </p>
                  //   </div>

                  //   {/* Remove */}
                  //   <button
                  //     onClick={() => removeItem(item.id)}
                  //     className="shrink-0 rounded-md p-1.5 text-muted-foreground hover:text-destructive transition-colors"
                  //   >
                  //     <IconTrash size={15} />
                  //   </button>
                  // </div>
                  <div
                    key={item.id}
                    className="flex items-center gap-3 py-5 border-b border-border last:border-b-0"
                  >
                    {/* Thumbnail */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      className="h-20 w-20 shrink-0 rounded-lg object-cover"
                    />

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {item.name}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        #{item.id} ·{' '}
                        {item.mediaType.charAt(0).toUpperCase() +
                          item.mediaType.slice(1)}
                      </p>
                      <p className="mt-1 text-sm font-semibold">
                        NT$&nbsp;{item.price.toLocaleString()}
                      </p>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="shrink-0 rounded-md p-1.5 text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
                    >
                      <IconTrash size={15} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-border px-5 py-4">
              <div className="mb-4 flex items-baseline justify-between">
                <span className="text-sm text-muted-foreground">
                  Subtotal
                  {/* ({items.length}{' '}
                  {items.length === 1 ? 'item' : 'items'}) */}
                </span>
                <span className="text-xl font-bold">
                  NT$&nbsp;{total.toLocaleString()}
                </span>
              </div>

              <Button size="lg" className="w-full font-semibold">
                {/* <IconShieldCheck size={15} /> */}
                Checkout
                {/* &nbsp;·&nbsp; NT$&nbsp;{total.toLocaleString()} */}
              </Button>

              {/* <div className="mt-3 flex items-center justify-center gap-5 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <IconShieldCheck size={12} />
                  Secure Payment
                </span>
                <span className="flex items-center gap-1">
                  <IconBolt size={12} />
                  Instant Download
                </span>
              </div> */}
            </div>
          )}
        </DrawerPrimitive.Content>
      </DrawerPrimitive.Portal>
    </DrawerPrimitive.Root>
  );
}
