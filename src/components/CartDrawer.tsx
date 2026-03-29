'use client';

import {
  Sheet,
  SheetPopup,
  SheetHeader,
  SheetTitle,
  SheetPanel,
  SheetFooter,
} from '@/components/ui/sheet';
import { IconShoppingCart, IconTrash } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/@core/provider/cartContext';

export function CartDrawer() {
  const { items, removeItem, total, isOpen, setIsOpen } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetPopup side="right" variant="inset">
        {/* Header */}
        <SheetHeader className="flex-row items-center gap-2 px-5 py-4">
          <SheetTitle>Shopping Cart</SheetTitle>
          {items.length > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[11px] font-bold text-primary-foreground">
              {items.length}
            </span>
          )}
        </SheetHeader>

        {/* Items list */}
        <SheetPanel className="px-5">
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
                <div
                  key={item.id}
                  className="flex items-center gap-3 py-5 border-b border-border last:border-b-0"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.item.files[0].url}
                    alt={item.item.name}
                    className="h-20 w-20 shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {item.item.name}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      #{item.id} ·{' '}
                      {item.item.files[0].file_type.charAt(0).toUpperCase() +
                        item.item.files[0].file_type.slice(1).toLowerCase()}
                    </p>
                    <p className="mt-1 text-sm font-semibold">
                      NT$&nbsp;{item.item.price.toLocaleString()}
                    </p>
                  </div>
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
        </SheetPanel>

        {/* Footer */}
        {items.length > 0 && (
          <SheetFooter
            variant="bare"
            className="border-t border-border px-5 py-4"
          >
            <div className="w-full">
              <div className="mb-4 flex items-baseline justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="text-xl font-bold">
                  NT$&nbsp;{total.toLocaleString()}
                </span>
              </div>
              <Button size="lg" className="w-full font-semibold">
                Checkout
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetPopup>
    </Sheet>
  );
}
