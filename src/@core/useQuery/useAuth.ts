'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { authApi } from '@/@core/api/auth';
import { isLoggedInAtom } from '@/@core/store/authAtoms';
import { USER_ME_KEY } from './useUser';
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
  const queryClient = useQueryClient();
  const setIsLoggedIn = useSetAtom(isLoggedInAtom);
  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.emailLogin(data),
    onSuccess: async (res) => {
      await saveAccessToken(res.data.access_token);
      setIsLoggedIn(true);
      await queryClient.invalidateQueries({ queryKey: USER_ME_KEY });
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
  const queryClient = useQueryClient();
  const setIsLoggedIn = useSetAtom(isLoggedInAtom);
  return useMutation({
    mutationFn: (idToken: string) => authApi.googleLogin(idToken),
    onSuccess: async (res) => {
      await saveAccessToken(res.data.access_token);
      setIsLoggedIn(true);
      await queryClient.invalidateQueries({ queryKey: USER_ME_KEY });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const setIsLoggedIn = useSetAtom(isLoggedInAtom);
  return async () => {
    await fetch('/api/auth/set-token', { method: 'DELETE' });
    setIsLoggedIn(false);
    queryClient.removeQueries({ queryKey: USER_ME_KEY });
    // Redirect away from protected pages
    if (window.location.pathname.startsWith('/user')) {
      window.location.href = '/';
    }
  };
}
