'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  IconChevronDown,
  IconChevronRight,
  IconPhoto,
  IconVideo,
} from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import { useOrdersPaginated } from '@/@core/useQuery/useOrders';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDate } from '@/lib/date';
import type { OrderStatus } from '@/@core/types/order';
import { Tag } from '@/components/ui/tag';
import { PaginationControls } from '@/components/ui/pagination-controls';

const statusConfig: Record<OrderStatus, { label: string; className: string }> =
  {
    PAID: { label: 'Paid', className: 'bg-green-500/10 text-green-500' },
    PENDING: {
      label: 'Pending',
      className: 'bg-yellow-500/10 text-yellow-500',
    },
    FAILED: {
      label: 'Failed',
      className: 'bg-destructive/10 text-destructive',
    },
  };

export default function OrderHistoryPage() {
  const [openId, setOpenId] = React.useState<string | null>(null);
  const [page, setPage] = React.useState(1);

  const { data, isLoading } = useOrdersPaginated(page, 5);
  const orders = data?.data ?? [];
  const totalPages = data?.meta?.total_pages ?? 1;

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Order History</h1>
        <p className="text-muted-foreground mt-1">
          View all your past purchases and transactions.
        </p>
      </div>

      <div className="rounded-xl border border-border overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[32px_1fr_auto] md:grid-cols-[32px_1fr_110px_76px_100px] items-center gap-x-4 px-4 py-3 bg-muted/40">
          <span />
          <span className="text-xs font-medium text-muted-foreground">
            Order
          </span>
          <span className="hidden md:inline text-xs font-medium text-muted-foreground text-right">
            Items
          </span>
          <span className="hidden md:inline text-xs font-medium text-muted-foreground text-right">
            Status
          </span>
          <span className="text-xs font-medium text-muted-foreground text-right">
            Total
          </span>
        </div>

        {isLoading ? (
          [0, 1, 2].map((i) => (
            <div key={i} className="border-t border-border px-4 py-3">
              <div className="grid grid-cols-[32px_1fr_auto] md:grid-cols-[32px_1fr_110px_76px_100px] items-center gap-x-4">
                <Skeleton className="h-4 w-4 rounded" />
                <div className="flex flex-col gap-1.5">
                  <Skeleton className="h-3.5 w-48" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <div className="hidden md:flex items-center justify-end -space-x-2">
                  {[0, 1, 2].map((j) => (
                    <Skeleton
                      key={j}
                      className="h-8 w-8 rounded-md border-2 border-background shrink-0"
                    />
                  ))}
                </div>
                <Skeleton className="hidden md:block h-5 w-14 rounded-md ml-auto" />
                <Skeleton className="h-4 w-20 ml-auto" />
              </div>
            </div>
          ))
        ) : orders.length === 0 ? (
          <div className="py-16 text-center text-sm text-muted-foreground">
            No orders yet.
          </div>
        ) : (
          orders.map((order) => {
            const open = openId === order.uuid;
            const status = statusConfig[order.status] ?? {
              label: order.status,
              className: 'bg-muted text-muted-foreground',
            };
            const preview = order.items.slice(0, 3);
            const overflow = order.items.length - 3;

            return (
              <div key={order.uuid} className="border-t border-border">
                {/* Main row */}
                <button
                  onClick={() => setOpenId(open ? null : order.uuid)}
                  className="cursor-pointer grid grid-cols-[32px_1fr_auto] md:grid-cols-[32px_1fr_110px_76px_100px] items-center gap-x-4 w-full px-4 py-3 text-left hover:bg-muted/20 transition-colors"
                >
                  <span className="flex items-center justify-center text-muted-foreground">
                    {open ? (
                      <IconChevronDown size={16} />
                    ) : (
                      <IconChevronRight size={16} />
                    )}
                  </span>

                  <div className="min-w-0">
                    <p className="text-sm font-medium font-mono truncate">
                      {order.uuid}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <p className="text-xs text-muted-foreground">
                        {formatDate(order.created_at)}
                      </p>
                      <span
                        className={cn(
                          'md:hidden inline-flex items-center rounded-md px-1.5 py-0.5 text-xs font-medium',
                          status.className,
                        )}
                      >
                        {status.label}
                      </span>
                    </div>
                  </div>

                  {/* Thumbnail stack — desktop only */}
                  <div className="hidden md:flex items-center justify-end -space-x-2">
                    {preview.map((c, i) => (
                      <div
                        key={`${order.uuid}-preview-${i}`}
                        className="h-8 w-8 rounded-md overflow-hidden border-2 border-background shrink-0"
                        style={{ zIndex: preview.length - i }}
                      >
                        <Image
                          src={c.item.cover.thumbnail_url}
                          alt={c.item.name}
                          width={32}
                          height={32}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                    {overflow > 0 && (
                      <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center border-2 border-background text-xs text-muted-foreground font-medium shrink-0">
                        +{overflow}
                      </div>
                    )}
                  </div>

                  {/* Status badge — desktop only */}
                  <span
                    className={cn(
                      'hidden md:inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium w-[max-content] ml-auto',
                      status.className,
                    )}
                  >
                    {status.label}
                  </span>

                  <div className="flex items-center gap-0.5 justify-end">
                    <span className="text-sm font-semibold">
                      NT$ {order.amount.toLocaleString()}
                    </span>
                  </div>
                </button>

                {/* Expanded detail */}
                <div
                  className={cn(
                    'grid transition-[grid-template-rows] duration-200 ease-in-out',
                    open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="flex flex-col gap-4 bg-muted/10 py-3">
                      {order.items.map((c, i) => {
                        const MediaIcon =
                          c.item.media_type === 'VIDEO' ? IconVideo : IconPhoto;
                        return (
                          <div
                            key={`${order.uuid}-item-${i}`}
                            className="grid grid-cols-[40px_1fr_auto] gap-3 items-center px-10"
                          >
                            <div className="h-10 w-10 shrink-0 rounded-md overflow-hidden">
                              <Image
                                src={c.item.cover.thumbnail_url}
                                alt={c.item.name}
                                width={40}
                                height={40}
                                className="h-full w-full object-cover"
                              />
                            </div>

                            <div className="min-w-0">
                              <div className="flex items-center gap-1 mb-0.5">
                                <Tag
                                  className="gap-1 text-[11px] px-2 ml-[-2px]"
                                  variant="primary"
                                >
                                  <MediaIcon size={12} />
                                  {c.item.media_type === 'VIDEO'
                                    ? 'Video'
                                    : 'Image'}
                                </Tag>
                              </div>
                              <p className="text-sm font-medium truncate">
                                {c.item.name}
                              </p>
                            </div>
                            <div className="flex items-center gap-0.5 shrink-0">
                              <span className="text-sm font-semibold">
                                NT$ {c.item.price.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <PaginationControls
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        isLoading={isLoading}
        className="mt-6 flex justify-end"
      />
    </div>
  );
}
