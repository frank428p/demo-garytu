import { atom } from 'jotai';
import type { MediaType } from '@/@core/types';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  mediaType: MediaType;
  thumbnail: string;
};

export const cartItemsAtom = atom<CartItem[]>([]);
export const cartIsOpenAtom = atom(false);
