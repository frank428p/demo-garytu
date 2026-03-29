import { apiFetch } from './fetchClient';
import { ApiResponse } from '../types/apiConfig';
import type { Prompt, PromptsListParams, PromptsPaginationParams } from '../types/prompt';

export const promptsApi = {
  list: (params: PromptsListParams = {}) => {
    const query = new URLSearchParams();
    if (params.page !== undefined) query.set('page', String(params.page));
    if (params.page_size !== undefined)
      query.set('page_size', String(params.page_size));
    if (params.search) query.set('search', params.search);

    return apiFetch<ApiResponse<Prompt[]>>(`/prompts?${query.toString()}`);
  },

  get: (uuid: string) => apiFetch<ApiResponse<Prompt>>(`/prompts/${uuid}`),

  listFavorites: (params: PromptsPaginationParams = {}) => {
    const query = new URLSearchParams();
    if (params.page !== undefined) query.set('page', String(params.page));
    if (params.page_size !== undefined)
      query.set('page_size', String(params.page_size));

    return apiFetch<ApiResponse<Prompt[]>>(`/prompts/favorites?${query.toString()}`);
  },

  listPurchased: (params: PromptsPaginationParams = {}) => {
    const query = new URLSearchParams();
    if (params.page !== undefined) query.set('page', String(params.page));
    if (params.page_size !== undefined)
      query.set('page_size', String(params.page_size));

    return apiFetch<ApiResponse<Prompt[]>>(`/prompts/purchased?${query.toString()}`);
  },

  addFavorite: (uuid: string) =>
    apiFetch<ApiResponse<void>>(`/prompts/${uuid}/favorite`, { method: 'POST' }),

  removeFavorite: (uuid: string) =>
    apiFetch<ApiResponse<void>>(`/prompts/${uuid}/favorite`, { method: 'DELETE' }),
};
