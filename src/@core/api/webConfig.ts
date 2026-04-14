import { apiFetch } from './fetchClient';
import { ApiResponse } from '../types/apiConfig';
import type { WebConfig } from '@/@core/types/config';

export const webConfigApi = {
  getConfig: () => apiFetch<ApiResponse<WebConfig>>('/web/config'),
};
