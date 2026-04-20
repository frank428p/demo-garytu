import { apiFetch } from './fetchClient';
import { ApiResponse } from '../types/apiConfig';
import type {
  AuthTokenResponse,
  EmailRegisterRequest,
  EmailRegisterVerifyRequest,
  LoginRequest,
  ForgotPasswordRequest,
  ForgotPasswordVerifyRequest,
} from '../types/auth';

export const authApi = {
  emailRegister: (data: EmailRegisterRequest) =>
    apiFetch<ApiResponse<string>>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  verifyEmailRegister: (data: EmailRegisterVerifyRequest) =>
    apiFetch<ApiResponse<string>>('/auth/register/verify', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  emailLogin: (data: LoginRequest) =>
    apiFetch<ApiResponse<AuthTokenResponse>>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  googleLogin: (idToken: string) =>
    apiFetch<ApiResponse<AuthTokenResponse>>('/auth/login/google', {
      method: 'POST',
      body: JSON.stringify({ token: idToken }),
    }),

  forgotPassword: (data: ForgotPasswordRequest) =>
    apiFetch<ApiResponse<null>>('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  verifyForgotPassword: (data: ForgotPasswordVerifyRequest) =>
    apiFetch<ApiResponse<AuthTokenResponse>>('/auth/forgot-password/verify', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
