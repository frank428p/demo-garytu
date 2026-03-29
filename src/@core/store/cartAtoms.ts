import { atom } from 'jotai';
import type { CartItem } from '@/@core/types/cart';

export type { CartItem };

export const cartItemsAtom = atom<CartItem[]>([]);
export const cartIsOpenAtom = atom(false);
