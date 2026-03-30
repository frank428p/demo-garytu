'use client';

import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  IconTrash,
  IconShieldCheck,
  IconLock,
  IconPackage,
} from '@tabler/icons-react';
import { useCart } from '@/@core/provider/cartContext';
import { usePrompt } from '@/@core/useQuery/usePrompts';
import {
  useCheckoutFromCart,
  useCheckoutDirect,
} from '@/@core/useQuery/useOrders';
import type { Prompt } from '@/@core/types/prompt';

type CheckoutViewProps = {
  type: 'CART' | 'SINGLE_PROMPT';
};

// ─── ProductRow ───────────────────────────────────────────────────────────────

function ProductRow({
  prompt,
  onRemove,
}: {
  prompt: Prompt;
  onRemove?: () => void;
}) {
  const mainFile = prompt.files[0];
  const fileTypeLabel =
    mainFile?.file_type.charAt(0).toUpperCase() +
    mainFile?.file_type.slice(1).toLowerCase();

  return (
    <div className="flex items-center gap-4 py-4 border-b border-border last:border-0">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-muted">
        {mainFile?.url || mainFile?.thumbnail_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={mainFile.thumbnail_url || mainFile.url}
            alt={prompt.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <IconPackage size={20} className="text-muted-foreground" />
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{prompt.name}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {fileTypeLabel} · AI Prompt
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <span className="text-sm font-semibold">
          NT$&nbsp;{prompt.price.toLocaleString()}
        </span>
        {onRemove && (
          <button
            onClick={onRemove}
            className="rounded-md p-1.5 text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
            aria-label="Remove item"
          >
            <IconTrash size={15} />
          </button>
        )}
      </div>
    </div>
  );
}

// ─── ProductRowSkeleton ───────────────────────────────────────────────────────

function ProductRowSkeleton() {
  return (
    <div className="flex items-center gap-4 py-4">
      <Skeleton className="h-16 w-16 shrink-0 rounded-xl" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-1/3" />
      </div>
      <Skeleton className="h-4 w-16" />
    </div>
  );
}

// ─── OrderSummaryPanel ────────────────────────────────────────────────────────

function OrderSummaryPanel({
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
  return (
    <div className="rounded-2xl border border-border bg-card p-6 space-y-5 sticky top-[4.5rem]">
      <h2 className="text-base font-semibold">Payment Summary</h2>

      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">
            Subtotal&nbsp;({itemCount}&nbsp;item{itemCount !== 1 ? 's' : ''})
          </span>
          <span>NT$&nbsp;{total.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Processing fee</span>
          <span className="text-muted-foreground">Free</span>
        </div>

        <div className="h-px bg-border" />

        <div className="flex items-baseline justify-between">
          <span className="font-medium">Total</span>
          <span className="text-2xl font-bold tracking-tight">
            NT$&nbsp;{total.toLocaleString()}
          </span>
        </div>
      </div>

      <Button
        size="lg"
        className="w-full font-semibold"
        disabled={isPending || itemCount === 0}
        onClick={onCheckout}
      >
        {isPending ? 'Processing…' : 'Proceed to Payment'}
      </Button>

      <div className="flex items-center justify-center gap-5 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <IconLock size={12} />
          Secure payment
        </span>
        <span className="flex items-center gap-1.5">
          <IconShieldCheck size={12} />
          SSL encrypted
        </span>
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

  const { mutate: checkoutCart, isPending: cartPending } =
    useCheckoutFromCart();
  const { mutate: checkoutDirect, isPending: directPending } =
    useCheckoutDirect();

  const handleCheckout = () => {
    if (type === 'CART') {
      checkoutCart(undefined, {
        onSuccess: (res) => {
          window.location.href = res.data.checkout_url;
        },
      });
    } else {
      if (!prompt) return;
      checkoutDirect(prompt.uuid, {
        onSuccess: (res) => {
          window.location.href = res.data.checkout_url;
        },
      });
    }
  };

  const isPending = type === 'CART' ? cartPending : directPending;
  const totalAmount = type === 'CART' ? total : (prompt?.price ?? 0);
  const itemCount =
    type === 'CART' ? items.length : (prompt ? 1 : 0);

  return (
    <div className="px-4 py-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left: product list */}
        <div className="flex-1 min-w-0 rounded-2xl border border-border bg-card p-6">
          <h2 className="text-base font-semibold mb-1">
            {type === 'CART' ? 'Your Items' : 'Item'}
          </h2>

          {type === 'CART' ? (
            items.length === 0 ? (
              <p className="py-10 text-center text-sm text-muted-foreground">
                Your cart is empty.
              </p>
            ) : (
              items.map((cartItem) => (
                <ProductRow
                  key={cartItem.id}
                  prompt={cartItem.item}
                  onRemove={() => removeItem(cartItem.id)}
                />
              ))
            )
          ) : promptLoading ? (
            <ProductRowSkeleton />
          ) : prompt ? (
            <ProductRow prompt={prompt} />
          ) : (
            <p className="py-10 text-center text-sm text-muted-foreground">
              Prompt not found.
            </p>
          )}
        </div>

        {/* Right: summary */}
        <div className="w-full lg:w-[340px] shrink-0">
          <OrderSummaryPanel
            total={totalAmount}
            itemCount={itemCount}
            onCheckout={handleCheckout}
            isPending={isPending}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutView;
