'use client';

import { useAtom } from 'jotai';
import { cartItemsAtom, cartIsOpenAtom } from '@/store/cartAtoms';
import type { CartItem } from '@/store/cartAtoms';

export type { CartItem };

export function useCart() {
  const [items, setItems] = useAtom(cartItemsAtom);
  const [isOpen, setIsOpen] = useAtom(cartIsOpenAtom);

  const addItem = (item: CartItem) => {
    setItems((prev) =>
      prev.find((i) => i.id === item.id) ? prev : [...prev, item],
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return { items, addItem, removeItem, total, isOpen, setIsOpen };
}
