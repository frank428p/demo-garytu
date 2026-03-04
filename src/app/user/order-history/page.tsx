'use client';

import { IconCurrencyEthereum, IconChevronDown } from '@tabler/icons-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const orders = [
  {
    id: 'ORD-2026-0031',
    items: ['SEO Article Writer', 'Email Marketing Copy'],
    total: 30,
    status: 'completed',
    date: 'Feb 27, 2026',
    paymentMethod: 'Credit',
  },
  {
    id: 'ORD-2026-0028',
    items: ['Pro Plan — Monthly'],
    total: 9.9,
    status: 'completed',
    date: 'Feb 1, 2026',
    paymentMethod: 'Credit Card',
  },
  {
    id: 'ORD-2026-0015',
    items: ['Product Description Generator', 'Social Media Caption Pack'],
    total: 23,
    status: 'completed',
    date: 'Jan 30, 2026',
    paymentMethod: 'Credit',
  },
  {
    id: 'ORD-2026-0009',
    items: ['Code Review Assistant'],
    total: 25,
    status: 'completed',
    date: 'Jan 22, 2026',
    paymentMethod: 'Credit',
  },
  {
    id: 'ORD-2026-0003',
    items: ['Business Plan Template'],
    total: 30,
    status: 'refunded',
    date: 'Jan 15, 2026',
    paymentMethod: 'Credit',
  },
  {
    id: 'ORD-2025-0198',
    items: ['Pro Plan — Monthly'],
    total: 9.9,
    status: 'completed',
    date: 'Jan 1, 2026',
    paymentMethod: 'Credit Card',
  },
];

const statusConfig: Record<string, { label: string; className: string }> = {
  completed: {
    label: 'Completed',
    className: 'bg-green-500/10 text-green-500 border-green-500/20',
  },
  pending: {
    label: 'Pending',
    className: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
  },
  refunded: {
    label: 'Refunded',
    className: 'bg-muted text-muted-foreground border-border',
  },
  failed: {
    label: 'Failed',
    className: 'bg-destructive/10 text-destructive border-destructive/20',
  },
};

export default function OrderHistoryPage() {
  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Order History</h1>
        <p className="text-muted-foreground mt-1">
          View all your past purchases and transactions.
        </p>
      </div>

      <div className="rounded-xl border border-border overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-5 py-3 bg-muted/40 text-xs font-medium text-muted-foreground">
          <span>Order</span>
          <span className="text-right">Amount</span>
          <span className="text-right">Status</span>
          <span className="text-right">Date</span>
        </div>

        {/* Table rows */}
        <div className="divide-y divide-border">
          {orders.map((order) => {
            const status = statusConfig[order.status] ?? statusConfig.completed;
            return (
              <div
                key={order.id}
                className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-5 py-4 items-center hover:bg-muted/20 transition-colors cursor-pointer"
              >
                <div>
                  <p className="text-sm font-medium">{order.id}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate max-w-[280px]">
                    {order.items.join(', ')}
                  </p>
                </div>
                <div className="text-sm font-semibold text-right">
                  {order.paymentMethod === 'Credit' ? (
                    <div className="flex items-center gap-0.5 justify-end">
                      <IconCurrencyEthereum
                        size={13}
                        className="text-primary"
                      />
                      <span>{order.total}</span>
                    </div>
                  ) : (
                    <span>${order.total.toFixed(2)}</span>
                  )}
                </div>
                <div className="flex justify-end">
                  <span
                    className={cn(
                      'inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium',
                      status.className,
                    )}
                  >
                    {status.label}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground text-right whitespace-nowrap">
                  {order.date}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
