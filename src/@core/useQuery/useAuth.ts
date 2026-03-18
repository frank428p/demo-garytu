'use client';

import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/@core/api/auth';
import type {
  EmailRegisterRequest,
  EmailRegisterVerifyRequest,
  LoginRequest,
} from '../types/auth';

function saveAccessToken(token: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('access_token', token);
}

export function useEmailLogin() {
  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.emailLogin(data),
    onSuccess: (res) => {
      saveAccessToken(res.data.access_token);
    },
  });
}

export function useEmailRegister() {
  return useMutation({
    mutationFn: (data: EmailRegisterRequest) => authApi.emailRegister(data),
  });
}

export function useVerifyEmailRegister() {
  return useMutation({
    mutationFn: (data: EmailRegisterVerifyRequest) =>
      authApi.verifyEmailRegister(data),
  });
}

export function useGoogleLogin() {
  return useMutation({
    mutationFn: (idToken: string) => authApi.googleLogin(idToken),
    onSuccess: (res) => {
      saveAccessToken(res.data.access_token);
    },
  });
}
