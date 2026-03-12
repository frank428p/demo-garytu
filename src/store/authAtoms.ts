import { atom } from 'jotai';

export interface AuthUser {
  name: string | null;
  email: string | null;
  image: string | null;
}

export const userAtom = atom<AuthUser | null>(null);

export const authDialogAtom = atom<'login' | 'signup' | null>(null);
