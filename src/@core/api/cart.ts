import { apiFetch } from './fetchClient';
import type { ApiResponse } from '../types/apiConfig';
import type { CartItem } from '../types/cart';

export const cartApi = {
  get: () => apiFetch<ApiResponse<CartItem[]>>('/cart'),

  addPrompt: (uuid: string) =>
    apiFetch<ApiResponse<null>>(`/cart/prompts/${uuid}`, {
      method: 'POST',
    }),

  remove: (id: string) =>
    apiFetch<ApiResponse<void>>(`/cart/${id}`, { method: 'DELETE' }),
};
