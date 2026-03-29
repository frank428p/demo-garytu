'use client';

import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ordersApi } from '@/@core/api/orders';
import { CART_KEY } from './useCart';

export const ORDERS_KEY = ['orders'];

export function useOrders() {
  return useInfiniteQuery({
    queryKey: ORDERS_KEY,
    queryFn: ({ pageParam = 1 }) =>
      ordersApi.list({ page: pageParam as number }),
    getNextPageParam: (lastPage) => {
      const meta = lastPage.meta;
      if (!meta) return undefined;
      return meta.page < meta.total_pages ? meta.page + 1 : undefined;
    },
    initialPageParam: 1,
  });
}

export function useCheckoutFromCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => ordersApi.checkoutFromCart(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_KEY });
      queryClient.invalidateQueries({ queryKey: ORDERS_KEY });
    },
  });
}

export function useCheckoutDirect() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (uuid: string) => ordersApi.checkoutDirect(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ORDERS_KEY });
    },
  });
}
