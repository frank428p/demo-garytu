'use client';

import { useEffect } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { authDialogAtom, userAtom } from '@/@core/store/authAtoms';
import { cartItemsAtom } from '@/@core/store/cartAtoms';
import { useCartItems } from '@/@core/useQuery/useCart';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useSetAtom(userAtom);
  const setCartItems = useSetAtom(cartItemsAtom);

  // 全域監聽 401/403，清除 session
  useEffect(() => {
    const handleAuthError = async () => {
      await fetch('/api/auth/set-token', { method: 'DELETE' });
      setUser(null);
      setCartItems([]);
      if (window.location.pathname.startsWith('/user')) {
        window.location.href = '/';
      }
    };

    window.addEventListener('auth-error', handleAuthError);
    return () => window.removeEventListener('auth-error', handleAuthError);
  }, [setUser, setCartItems]);

  const user = useAtomValue(userAtom);
  const { refetch: refetchCart } = useCartItems();

  // 登入後強制重新 fetch cart（避免 stale cache 問題）
  useEffect(() => {
    if (!user) return;
    refetchCart();
  }, [user, refetchCart]);

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
