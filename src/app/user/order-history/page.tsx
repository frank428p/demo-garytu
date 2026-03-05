'use client';

import * as React from 'react';
import {
  IconChevronDown,
  IconChevronRight,
  IconPhoto,
  IconVideo,
} from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import { MediaType } from '@/@core/types';

type ChildRow = {
  id: string;
  image: string;
  title: string;
  mediaType: MediaType;
  price: number;
};

type Row = {
  id: string;
  orderNo: string;
  status: 'paid' | 'pending' | 'failed';
  total: number;
  date: string;
  children: ChildRow[];
};

const mockRows: Row[] = [
  {
    id: '1',
    orderNo: 'ORD-2026-0031',
    status: 'paid',
    total: 3000,
    date: 'Apr 1, 2026',
    children: [
      {
        id: 'p-1',
        title: 'Cinematic Portrait Lighting Pack',
        image: '/images/gallery/9-to-16_1.jpg',
        mediaType: 'image',
        price: 1500,
      },
      {
        id: 'p-2',
        title: 'Cinematic Portrait Lighting Pack',
        image: '/images/gallery/1-to-1_3.jpg',
        mediaType: 'image',
        price: 1500,
      },
    ],
  },
  {
    id: '2',
    orderNo: 'ORD-2026-0028',
    status: 'paid',
    total: 1500,
    date: 'Apr 1, 2026',
    children: [
      {
        id: 'p-3',
        title: 'Cinematic Portrait Lighting Pack',
        image: '/images/gallery/1-to-1-cover_1.avif',
        mediaType: 'video',
        price: 1500,
      },
    ],
  },
  {
    id: '3',
    orderNo: 'ORD-2026-0015',
    status: 'paid',
    total: 6000,
    date: 'Apr 1, 2026',
    children: [
      {
        id: 'p-4',
        title: 'Cinematic Portrait Lighting Pack',
        image: '/images/gallery/16-to-9-cover_1.avif',
        mediaType: 'video',
        price: 1500,
      },
      {
        id: 'p-5',
        title: 'Cinematic Portrait Lighting Pack',
        image: '/images/gallery/16-to-9_2.jpg',
        mediaType: 'image',
        price: 1500,
      },
      {
        id: 'p-6',
        title: 'Cinematic Portrait Lighting Pack',
        image: '/images/gallery/1-to-1_2.jpg',
        mediaType: 'image',
        price: 1500,
      },
      {
        id: 'p-7',
        title: 'Cinematic Portrait Lighting Pack',
        image: '/images/gallery/1-to-1-cover_1.avif',
        mediaType: 'video',
        price: 1500,
      },
    ],
  },
];

const statusConfig = {
  paid: { label: 'Paid', className: 'bg-green-500/10 text-green-500' },
  pending: { label: 'Pending', className: 'bg-yellow-500/10 text-yellow-500' },
  failed: { label: 'Failed', className: 'bg-destructive/10 text-destructive' },
};

export default function OrderHistoryPage() {
  const [openId, setOpenId] = React.useState<string | null>(null);

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
        <div className="grid grid-cols-[32px_1fr_auto] md:grid-cols-[32px_1fr_110px_76px_100px] items-center px-4 py-3 bg-muted/40">
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

        {mockRows.map((r) => {
          const open = openId === r.id;
          const status = statusConfig[r.status];
          const preview = r.children.slice(0, 3);
          const overflow = r.children.length - 3;

          return (
            <div key={r.id} className="border-t border-border">
              {/* Main row */}
              <button
                onClick={() => setOpenId(open ? null : r.id)}
                className="cursor-pointer grid grid-cols-[32px_1fr_auto] md:grid-cols-[32px_1fr_110px_76px_100px] items-center w-full px-4 py-3 text-left hover:bg-muted/20 transition-colors"
              >
                <span className="flex items-center justify-center text-muted-foreground">
                  {open ? (
                    <IconChevronDown size={16} />
                  ) : (
                    <IconChevronRight size={16} />
                  )}
                </span>

                <div>
                  <p className="text-sm font-medium">{r.orderNo}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-xs text-muted-foreground">{r.date}</p>
                    {/* Status badge — mobile only */}
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
                      key={c.id + i}
                      className="h-8 w-8 rounded-md overflow-hidden border-2 border-background shrink-0"
                      style={{ zIndex: preview.length - i }}
                    >
                      <img
                        src={c.image}
                        alt=""
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
                    NT${r.total.toLocaleString()}
                  </span>
                </div>
              </button>

              {/* Expanded detail — animated */}
              <div
                className={cn(
                  'grid transition-[grid-template-rows] duration-200 ease-in-out',
                  open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                )}
              >
                <div className="overflow-hidden">
                  <div className="bg-muted/10">
                    {r.children.map((c, i) => {
                      const MediaIcon =
                        c.mediaType === 'video' ? IconVideo : IconPhoto;
                      return (
                        <div
                          key={c.id + i}
                          className="grid grid-cols-[40px_1fr_auto] gap-3 items-center px-10 py-4"
                          // className={cn(
                          //   'grid grid-cols-[40px_1fr_auto] gap-3 items-center px-10 py-4',
                          //   i > 0 && 'border-t border-border',
                          // )}
                        >
                          <div className="h-10 w-10 shrink-0 rounded-md overflow-hidden">
                            <img
                              src={c.image}
                              alt=""
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium truncate">
                              {c.title}
                            </p>
                            <div className="flex items-center gap-1 mt-0.5">
                              <MediaIcon
                                size={12}
                                className="text-muted-foreground shrink-0"
                              />
                              <span className="text-xs text-muted-foreground capitalize">
                                {c.mediaType}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-0.5 shrink-0">
                            <span className="text-sm font-semibold">
                              NT${c.price.toLocaleString()}
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
        })}
      </div>
    </div>
  );
}
