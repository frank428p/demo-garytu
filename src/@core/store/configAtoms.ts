import { atom } from 'jotai';
import type { WebConfig } from '@/@core/types/config';

export const webConfigAtom = atom<WebConfig | null>(null);
