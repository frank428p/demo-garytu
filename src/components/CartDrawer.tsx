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
} from '@tabler/icons-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useCart } from '@/@core/provider/cartContext';
import { Tag } from './ui/tag';

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
        <SheetPanel className="px-5 h-full">
          {items.length === 0 ? (
            <div className="flex flex-col h-full items-center justify-center text-center px-4">
              {/* Icon */}
              <div className="flex flex-col">
                <h3 className="text-base font-semibold mb-2">
                  Your cart is empty
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                  Discover curated AI prompt packs crafted by top creators.
                </p>
              </div>

              <Button
                asChild
                className="gap-1.5"
                onClick={() => setIsOpen(false)}
              >
                <Link href="/toolkit/store">
                  Browse Store
                  <IconArrowRight size={15} />
                </Link>
              </Button>
            </div>
          ) : (
            <div className="flex flex-col">
              {items.map((item) => (
                <Link
                  key={item?.id}
                  href={`/toolkit/store/${item?.item?.uuid}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 py-4 border-b border-border last:border-b-0"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item?.item?.files[0]?.url}
                    alt={item.item?.name}
                    className="h-20 w-20 shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {item?.item?.name}
                    </p>
                    <div className="inline-flex flex gap-1 mt-1">
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

                      {/* <span className="inline-flex items-center rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-medium text-primary">
                        AI Prompt
                      </span> */}

                      <Tag variant="secondary" className="gap-1">
                        <IconCurrencyEthereum size={14} />
                        {item?.item?.bonus_credit}
                      </Tag>
                    </div>
                    {/* <p className="mt-0.5 text-xs text-muted-foreground">
                      {item.item.files[0].file_type.charAt(0).toUpperCase() +
                        item.item.files[0].file_type.slice(1).toLowerCase()}
                    </p> */}
                    <p className="mt-1 text-sm font-semibold">
                      NT$&nbsp;{item.item.price.toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      removeItem(item.id);
                    }}
                    className="shrink-0 rounded-md p-1.5 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    <IconTrash size={18} />
                  </button>
                </Link>
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
              <Button
                size="lg"
                className="w-full font-semibold"
                asChild
                onClick={() => setIsOpen(false)}
              >
                <Link href="/checkout/cart">Checkout</Link>
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetPopup>
    </Sheet>
  );
}
