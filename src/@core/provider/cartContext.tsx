'use client';

import { useAtom } from 'jotai';
import { cartItemsAtom, cartIsOpenAtom } from '@/@core/store/cartAtoms';
import type { CartItem } from '@/@core/store/cartAtoms';
import { useAddToCart, useRemoveFromCart } from '@/@core/useQuery/useCart';
import { toast } from 'sonner';

export type { CartItem };

export function useCart() {
  const [items] = useAtom(cartItemsAtom);
  const [isOpen, setIsOpen] = useAtom(cartIsOpenAtom);
  const { mutate: addToCart } = useAddToCart();
  const { mutate: removeFromCart } = useRemoveFromCart();

  const addItem = (uuid: string) => {
    addToCart(uuid, {
      onSuccess: () =>
        toast.success('Added to cart', { position: 'top-center' }),
    });
  };

  const removeItem = (id: string) => {
    removeFromCart(id, {
      onSuccess: () =>
        toast.success('Removed from cart', { position: 'top-center' }),
    });
  };

  const total = items.reduce((sum, item) => sum + item.item.price, 0);

  return { items, addItem, removeItem, total, isOpen, setIsOpen };
}
