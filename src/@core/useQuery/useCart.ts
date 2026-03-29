'use client';

import { queryOptions, useMutation, useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { cartApi } from '@/@core/api/cart';
import { cartItemsAtom } from '@/@core/store/cartAtoms';

export const CART_KEY = ['cart'];

export const cartQueryOptions = queryOptions({
  queryKey: CART_KEY,
  queryFn: () => cartApi.get(),
});

export function useCartItems() {
  const setCartItems = useSetAtom(cartItemsAtom);
  const query = useQuery({ ...cartQueryOptions, enabled: false });

  useEffect(() => {
    if (!query.data?.data) return;
    setCartItems(query.data.data);
  }, [query.data, setCartItems]);

  return query;
}

export function useAddToCart() {
  const { refetch } = useCartItems();
  return useMutation({
    mutationFn: (uuid: string) => cartApi.addPrompt(uuid),
    onSuccess: () => {
      refetch();
    },
  });
}

export function useRemoveFromCart() {
  const { refetch } = useCartItems();
  return useMutation({
    mutationFn: (id: string) => cartApi.remove(id),
    onSuccess: () => {
      refetch();
    },
  });
}
