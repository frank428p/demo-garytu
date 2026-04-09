import { CartItem } from './cart';
import type { Prompt } from './prompt';

export type OrderStatus = 'PENDING' | 'PAID' | 'FAILED';

export type OrderItem = {
  id: string;
  prompt: Prompt;
  price: number;
};

export type Order = {
  uuid: string;
  status: OrderStatus;
  total: number;
  checkout_url?: string;
  items: OrderItem[];
  created_at: string;
};

export type CheckoutResponse = {
  uuid: string;
  status: OrderStatus;
  amount: number;
  currency: string;
  items: CartItem;
  payment: {
    checkout_url: string;
    expires_at: string;
  };
  created_at: string;
};

export type OrdersListParams = {
  page?: number;
  page_size?: number;
};
