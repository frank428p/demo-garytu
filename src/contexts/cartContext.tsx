'use client';

import {
  createContext,
  useContext,
  useReducer,
  useState,
  type ReactNode,
} from 'react';
import { MediaType } from '@/@core/types';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  mediaType: MediaType;
  thumbnail: string;
};

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM':
      if (state.items.find((item) => item.id === action.payload.id)) {
        return state;
      }
      return { items: [...state.items, action.payload] };
    case 'REMOVE_ITEM':
      return { items: state.items.filter((item) => item.id !== action.payload) };
    default:
      return state;
  }
}

type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  total: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const [isOpen, setIsOpen] = useState(false);

  const addItem = (item: CartItem) =>
    dispatch({ type: 'ADD_ITEM', payload: item });

  const removeItem = (id: string) =>
    dispatch({ type: 'REMOVE_ITEM', payload: id });

  const total = state.items.reduce((sum, item) => sum + item.price, 0);

  return (
    <CartContext.Provider
      value={{ items: state.items, addItem, removeItem, total, isOpen, setIsOpen }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
