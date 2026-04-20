'use client';

import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { authApi } from '@/@core/api/auth';
import { userApi } from '@/@core/api/user';
import { cartApi } from '@/@core/api/cart';
import { userAtom } from '@/@core/store/authAtoms';
import { cartItemsAtom } from '@/@core/store/cartAtoms';
import { syncLocaleFromUser } from '@/@core/hooks/useLocaleSwitcher';
import type {
  EmailRegisterRequest,
  EmailRegisterVerifyRequest,
  LoginRequest,
  ForgotPasswordRequest,
  ForgotPasswordVerifyRequest,
} from '../types/auth';

function saveAccessToken(token: string) {
  const maxAge = 60 * 60 * 24 * 14;
  const secure = location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `access_token=${token}; path=/; max-age=${maxAge}; SameSite=Lax${secure}`;
}

export function useEmailLogin() {
  const setUser = useSetAtom(userAtom);
  const setCartItems = useSetAtom(cartItemsAtom);
  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.emailLogin(data),
    onSuccess: async (res) => {
      saveAccessToken(res.data.access_token);
      const [userRes, cartRes] = await Promise.all([userApi.getMe(), cartApi.get()]);
      setUser(userRes.data);
      setCartItems(cartRes.data);
      syncLocaleFromUser(userRes.data.locale);
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
  const setCartItems = useSetAtom(cartItemsAtom);
  return useMutation({
    mutationFn: (idToken: string) => authApi.googleLogin(idToken),
    onSuccess: async (res) => {
      saveAccessToken(res.data.access_token);
      const [userRes, cartRes] = await Promise.all([userApi.getMe(), cartApi.get()]);
      setUser(userRes.data);
      setCartItems(cartRes.data);
      syncLocaleFromUser(userRes.data.locale);
    },
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) => authApi.forgotPassword(data),
  });
}

export function useVerifyForgotPassword() {
  const setUser = useSetAtom(userAtom);
  const setCartItems = useSetAtom(cartItemsAtom);
  return useMutation({
    mutationFn: (data: ForgotPasswordVerifyRequest) =>
      authApi.verifyForgotPassword(data),
    onSuccess: async (res) => {
      saveAccessToken(res.data.access_token);
      const [userRes, cartRes] = await Promise.all([userApi.getMe(), cartApi.get()]);
      setUser(userRes.data);
      setCartItems(cartRes.data);
      syncLocaleFromUser(userRes.data.locale);
    },
  });
}

export function useLogout() {
  return () => {
    window.dispatchEvent(new CustomEvent('auth-error'));
  };
}
