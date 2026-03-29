'use client';

import { useEffect } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { authDialogAtom, userAtom } from '@/@core/store/authAtoms';
import { useMe } from '@/@core/useQuery/useUser';
import { useQueryClient } from '@tanstack/react-query';
import { ApiError } from '@/@core/api/fetchClient';
import { cartQueryOptions, useCartItems } from '@/@core/useQuery/useCart';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data, error } = useMe();
  const setUser = useSetAtom(userAtom);
  const user = useAtomValue(userAtom);
  const queryClient = useQueryClient();
  const { refetch: getCartRefetch } = useCartItems();

  // useMe 拿到資料後同步進 atom
  useEffect(() => {
    setUser(data?.data ?? null);
  }, [data, setUser]);

  // 有 user 後預取所有需要登入才能取得的資料
  // 新增需要登入的 API，在這裡加入即可
  useEffect(() => {
    if (!user) return;
    // queryClient.prefetchQuery(cartQueryOptions);
    getCartRefetch();
  }, [user, queryClient]);

  // token 失效（401/403）清除 session
  useEffect(() => {
    if (!(error instanceof ApiError)) return;
    if (error.status !== 401 && error.status !== 403) return;
    (async () => {
      await fetch('/api/auth/set-token', { method: 'DELETE' });
      setUser(null);
      if (window.location.pathname.startsWith('/user')) {
        window.location.href = '/';
      }
    })();
  }, [error, setUser]);

  return <>{children}</>;
}

export function useIsLoggedIn() {
  const user = useAtomValue(userAtom);
  return !!user;
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
