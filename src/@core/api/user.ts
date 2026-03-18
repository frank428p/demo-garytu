import { apiFetch } from './fetchClient';
import { ApiResponse } from '../types/apiConfig';
import type { User, UpdateUserInfoRequest } from '@/@core/types/user';

export const userApi = {
  getMe: () => apiFetch<ApiResponse<User>>('/users/me'),
  updateMe: (data: UpdateUserInfoRequest) =>
    apiFetch<ApiResponse<User>>('/users/me', {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
};
