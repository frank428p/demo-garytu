import { atom } from 'jotai';
import type { WebConfig } from '@/@core/types/common';

export const webConfigAtom = atom<WebConfig | null>(null);
