import type { Prompt } from './prompt';

export type OrderStatus = 'pending' | 'paid' | 'failed';

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
  checkout_url: string;
};

export type OrdersListParams = {
  page?: number;
  page_size?: number;
};
