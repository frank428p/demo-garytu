'use client';

import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/@core/api/auth';
import type {
  EmailRegisterRequest,
  EmailRegisterVerifyRequest,
  LoginRequest,
} from '../types/auth';

async function saveAccessToken(token: string) {
  await fetch('/api/auth/set-token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ access_token: token }),
  });
}

export function useEmailLogin() {
  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.emailLogin(data),
    onSuccess: async (res) => {
      await saveAccessToken(res.data.access_token);
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
    onSuccess: async (res) => {
      await saveAccessToken(res.data.access_token);
    },
  });
}
