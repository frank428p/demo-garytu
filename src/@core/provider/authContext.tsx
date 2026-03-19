'use client';

import { useEffect } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import {
  authDialogAtom,
  isLoggedInAtom,
  userAtom,
} from '@/@core/store/authAtoms';
import { useMe } from '@/@core/useQuery/useUser';
import { ApiError } from '@/@core/api/fetchClient';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data, error } = useMe();
  const setUser = useSetAtom(userAtom);
  const setIsLoggedIn = useSetAtom(isLoggedInAtom);

  // On mount: restore login state from auth_status cookie (handles page refresh)
  useEffect(() => {
    if (document.cookie.includes('auth_status=1')) {
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);

  // If token is invalid (401) or forbidden (403), clear the session
  useEffect(() => {
    if (!(error instanceof ApiError)) return;
    if (error.status !== 401 && error.status !== 403) return;
    (async () => {
      await fetch('/api/auth/set-token', { method: 'DELETE' });
      setIsLoggedIn(false);
      setUser(null);
      if (window.location.pathname.startsWith('/user')) {
        window.location.href = '/';
      }
    })();
  }, [error, setIsLoggedIn, setUser]);

  useEffect(() => {
    setUser(data?.data ?? null);
  }, [data, setUser]);

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
