'use client';

import { queryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { cartApi } from '@/@core/api/cart';
import { userAtom } from '@/@core/store/authAtoms';
import { cartItemsAtom } from '@/@core/store/cartAtoms';

export const CART_KEY = ['cart'];

export const cartQueryOptions = queryOptions({
  queryKey: CART_KEY,
  queryFn: () => cartApi.get(),
});

export function useCartItems() {
  const user = useAtomValue(userAtom);
  const setCartItems = useSetAtom(cartItemsAtom);
  const query = useQuery({ ...cartQueryOptions, enabled: !!user });

  useEffect(() => {
    if (!query.data?.data) return;
    setCartItems(query.data.data);
  }, [query.data, setCartItems]);

  return query;
}

export function useAddToCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (uuid: string) => cartApi.addPrompt(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_KEY });
    },
  });
}

export function useRemoveFromCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => cartApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_KEY });
    },
  });
}
