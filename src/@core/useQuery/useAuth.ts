'use client';

import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { authApi } from '@/@core/api/auth';
import { userApi } from '@/@core/api/user';
import { userAtom } from '@/@core/store/authAtoms';
import { cartItemsAtom } from '@/@core/store/cartAtoms';
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
  const setUser = useSetAtom(userAtom);
  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.emailLogin(data),
    onSuccess: async (res) => {
      await saveAccessToken(res.data.access_token);
      const userRes = await userApi.getMe();
      setUser(userRes.data);
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
  const setUser = useSetAtom(userAtom);
  return useMutation({
    mutationFn: (idToken: string) => authApi.googleLogin(idToken),
    onSuccess: async (res) => {
      await saveAccessToken(res.data.access_token);
      const userRes = await userApi.getMe();
      setUser(userRes.data);
    },
  });
}

export function useLogout() {
  const setUser = useSetAtom(userAtom);
  const setCartItems = useSetAtom(cartItemsAtom);
  return async () => {
    await fetch('/api/auth/set-token', { method: 'DELETE' });
    setUser(null);
    setCartItems([]);
    if (window.location.pathname.startsWith('/user')) {
      window.location.href = '/';
    }
  };
}
