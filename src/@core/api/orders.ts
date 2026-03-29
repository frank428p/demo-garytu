import { apiFetch } from './fetchClient';
import type { ApiResponse } from '../types/apiConfig';
import type { CheckoutResponse, Order, OrdersListParams } from '../types/order';

export const ordersApi = {
  list: (params: OrdersListParams = {}) => {
    const query = new URLSearchParams();
    if (params.page !== undefined) query.set('page', String(params.page));
    if (params.page_size !== undefined)
      query.set('page_size', String(params.page_size));

    return apiFetch<ApiResponse<Order[]>>(`/orders?${query.toString()}`);
  },

  checkoutFromCart: () =>
    apiFetch<ApiResponse<CheckoutResponse>>('/orders/checkout/cart', {
      method: 'POST',
    }),

  checkoutDirect: (uuid: string) =>
    apiFetch<ApiResponse<CheckoutResponse>>(
      `/orders/checkout/prompts/${uuid}`,
      { method: 'POST' },
    ),
};
