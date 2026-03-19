import { atom } from 'jotai';
import type { User } from '@/@core/types/user';

export const userAtom = atom<User | null>(null);

export const authDialogAtom = atom<'login' | 'signup' | null>(null);

// Reactive flag for useMe() enabled — updated after login/logout
export const isLoggedInAtom = atom(false);
