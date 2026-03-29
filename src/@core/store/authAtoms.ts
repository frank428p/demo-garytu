import { atom } from 'jotai';
import type { User } from '@/@core/types/user';

export const userAtom = atom<User | null>(null);

export const authDialogAtom = atom<'login' | 'signup' | null>(null);
