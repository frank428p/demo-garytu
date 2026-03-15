'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useAtom, useSetAtom } from 'jotai';
import { authDialogAtom, userAtom } from '@/store/authAtoms';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const setUser = useSetAtom(userAtom);

  useEffect(() => {
    const u = session?.user;
    console.log('session', session);
    setUser(
      u
        ? {
            name: u.name ?? null,
            email: u.email ?? null,
            image: u.image ?? null,
          }
        : null,
    );
  }, [session, setUser]);

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
