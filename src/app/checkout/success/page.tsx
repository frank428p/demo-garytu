'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import {
  IconCircleCheck,
  IconBolt,
  IconArrowRight,
  IconShoppingBag,
  IconVideo,
  IconPhoto,
} from '@tabler/icons-react';
import { useCheckoutSession, useOrder } from '@/@core/useQuery/useOrders';
import { Tag } from '@/components/ui/tag';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDate } from '@/lib/date';

const CheckoutSuccessPage = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id') || null;
  const orderUUID = searchParams.get('order_uuid') || null;

  const { data: sessionData } = useCheckoutSession(sessionId);
  const { data: orderData, isLoading } = useOrder(orderUUID);

  return (
    <>
      <style>{`
        @keyframes card-in {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes check-pop {
          0%   { opacity: 0; transform: scale(0.4); }
          70%  { transform: scale(1.12); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ring-pulse {
          0%   { box-shadow: 0 0 0 0  oklch(0.7 0.16 160.43 / 40); }
          70%  { box-shadow: 0 0 0 16px oklch(0.51 0.17 28.14 / 0%); }
          100% { box-shadow: 0 0 0 0 oklch(0.51 0.17 28.14 / 0%); }
        }
        .success-card {
          opacity: 0;
          animation: card-in 0.55s cubic-bezier(0.22, 1, 0.36, 1) 0.05s forwards;
        }
        .check-icon {
          opacity: 0;
          animation: check-pop 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) 0.25s forwards,
                     ring-pulse 1.4s ease-out 0.6s;
        }
        .line-1 {
          opacity: 0;
          animation: fade-up 0.4s cubic-bezier(0.22, 1, 0.36, 1) 0.45s forwards;
        }
        .line-2 {
          opacity: 0;
          animation: fade-up 0.4s cubic-bezier(0.22, 1, 0.36, 1) 0.55s forwards;
        }
        .divider-line {
          opacity: 0;
          animation: fade-up 0.4s cubic-bezier(0.22, 1, 0.36, 1) 0.62s forwards;
        }
        .badge-row {
          opacity: 0;
          animation: fade-up 0.4s cubic-bezier(0.22, 1, 0.36, 1) 0.68s forwards;
        }
        .cta-row {
          opacity: 0;
          animation: fade-up 0.4s cubic-bezier(0.22, 1, 0.36, 1) 0.78s forwards;
        }
      `}</style>

      <div className="flex items-center justify-center py-8">
        <div className="w-full max-w-md">
          {/* success-card */}
          {/* Card */}
          <div className="relative rounded-2xl overflow-hidden">
            <div className="relative px-8 py-10 flex flex-col items-center text-center gap-6">
              {/* Checkmark */}
              <div className="check-icon flex items-center justify-center rounded-full bg-chart-2/10 p-4">
                <IconCircleCheck
                  size={52}
                  className="text-chart-2"
                  stroke={1.5}
                />
              </div>

              {/* Heading */}
              <div className="line-1 flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-foreground tracking-tight">
                  Payment Successful
                </h1>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Your order has been confirmed and all prompt files are ready
                  for immediate download.
                </p>
              </div>

              <div className="badge-row bg-card rounded-xl px-3 w-full flex flex-col">
                <div className="flex flex-col gap-3 py-4">
                  <div className="flex justify-between items-center">
                    <p className="text-xs font-semibold text-muted-foreground">
                      Order Id
                    </p>
                    {isLoading ? (
                      <Skeleton className="h-3 w-32" />
                    ) : (
                      <p className="text-xs font-semibold text-foreground">
                        {orderData?.data?.display_id}
                      </p>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xs font-semibold text-muted-foreground">
                      Total Amount
                    </p>
                    {isLoading ? (
                      <Skeleton className="h-3 w-20" />
                    ) : (
                      <p className="text-xs font-semibold text-foreground">
                        NT$&nbsp;{orderData?.data?.amount?.toLocaleString()}
                      </p>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xs font-semibold text-muted-foreground">
                      Date
                    </p>
                    {isLoading ? (
                      <Skeleton className="h-3 w-24" />
                    ) : (
                      <p className="text-xs font-semibold text-foreground">
                        {formatDate(orderData?.data?.created_at ?? '')}
                      </p>
                    )}
                  </div>
                </div>

                <div className="divider-line w-full border-t border-border" />

                <div className="flex flex-col gap-3 py-4">
                  {isLoading ? (
                    <>
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center"
                        >
                          <div className="flex gap-2">
                            <Skeleton className="h-10 w-10 rounded-md shrink-0" />
                            <div className="flex flex-col gap-2 justify-center">
                              <Skeleton className="h-3 w-12" />
                              <Skeleton className="h-3 w-28" />
                            </div>
                          </div>
                          <Skeleton className="h-3 w-16" />
                        </div>
                      ))}
                    </>
                  ) : (
                    orderData?.data?.items.map((item, index) => (
                      <div
                        key={`order_item_${index}`}
                        className="flex justify-between items-center"
                      >
                        <div className="flex gap-2">
                          <div className="h-10 w-10 shrink-0 rounded-md overflow-hidden">
                            <Image
                              src={item.item.cover.thumbnail_url}
                              alt={item.item.name}
                              width={40}
                              height={40}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex flex-col items-start gap-1">
                            <Tag
                              className="gap-1 text-[11px] px-2 ml-[-2px]"
                              variant="primary"
                            >
                              {item?.item?.media_type === 'VIDEO' ? (
                                <>
                                  <IconVideo size={12} />
                                  Video
                                </>
                              ) : (
                                <>
                                  <IconPhoto size={12} />
                                  Image
                                </>
                              )}
                            </Tag>
                            <p className="text-xs font-semibold text-foreground">
                              {item?.item?.name}
                            </p>
                          </div>
                        </div>
                        <p className="text-xs font-semibold text-foreground">
                          NT$&nbsp;{item.item.price?.toLocaleString()}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* CTA buttons */}
              <div className="cta-row w-full flex flex-col gap-3">
                <Button asChild className="w-full">
                  <Link href="/user/my-prompt">
                    View My Prompts
                    <IconArrowRight size={14} />
                  </Link>
                </Button>

                <Button asChild variant="secondary" className="w-full">
                  <Link href="/toolkit/store">Continue Browse Store</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutSuccessPage;
