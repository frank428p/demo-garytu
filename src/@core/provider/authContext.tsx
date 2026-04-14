'use client';

import { useEffect, useState } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { authDialogAtom, userAtom } from '@/@core/store/authAtoms';
import { cartItemsAtom } from '@/@core/store/cartAtoms';
import { userApi } from '@/@core/api/user';
import { cartApi } from '@/@core/api/cart';
import { syncLocaleFromUser } from '@/@core/hooks/useLocaleSwitcher';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useSetAtom(userAtom);
  const setCartItems = useSetAtom(cartItemsAtom);
  const [initialized, setInitialized] = useState(false);

  // 初始化：有 token 同時呼叫 /users/me 和 /cart，都完成後才 render children
  useEffect(() => {
    const init = async () => {
      const token = document.cookie.match(/(?:^|;\s*)access_token=([^;]+)/)?.[1];
      if (!token) return;

      const userRes = await userApi.getMe();
      setUser(userRes.data);
      syncLocaleFromUser(userRes.data.locale);

      const cartRes = await cartApi.get();
      setCartItems(cartRes.data);
    };

    init().finally(() => setInitialized(true));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 全域監聽 401/403 與登出，清除 session
  useEffect(() => {
    const handleAuthError = () => {
      document.cookie = 'access_token=; path=/; max-age=0';
      setUser(null);
      setCartItems([]);
      if (window.location.pathname.startsWith('/user')) {
        window.location.href = '/';
      }
    };

    window.addEventListener('auth-error', handleAuthError);
    return () => window.removeEventListener('auth-error', handleAuthError);
  }, [setUser, setCartItems]);

  if (!initialized) return null;

  return <>{children}</>;
}

export function useAuth() {
  const [authMode, setAuthMode] = useAtom(authDialogAtom);

  return {
    authMode,
    openLogin: () => setAuthMode('login'),
    openSignup: () => setAuthMode('signup'),
    closeAuth: () => setAuthMode(null),
  };
}

export function useIsAuth() {
  const user = useAtomValue(userAtom);
  const hasToken = typeof document !== 'undefined'
    ? /(?:^|;\s*)access_token=([^;]+)/.test(document.cookie)
    : false;
  return !!user && hasToken;
}

export function useRequireAuth(skipLoginDialog: boolean) {
  const user = useAtomValue(userAtom);
  const setAuthMode = useSetAtom(authDialogAtom);

  return () => {
    if (user) return true;
    if (!skipLoginDialog) setAuthMode('login');
    return false;
  };
}
