'use client';

import { createContext, useContext, useState } from 'react';

type AuthDialogMode = 'login' | 'signup' | null;

interface AuthContextType {
  authMode: AuthDialogMode;
  openLogin: () => void;
  openSignup: () => void;
  closeAuth: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authMode, setAuthMode] = useState<AuthDialogMode>(null);

  return (
    <AuthContext.Provider
      value={{
        authMode,
        openLogin: () => setAuthMode('login'),
        openSignup: () => setAuthMode('signup'),
        closeAuth: () => setAuthMode(null),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
