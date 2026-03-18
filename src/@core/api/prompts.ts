import { apiFetch } from './fetchClient';
import { ApiResponse } from '../types/apiConfig';
import type { Prompt, PromptsListParams } from '../types/prompt';

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
};
