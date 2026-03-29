'use client';

import { useState } from 'react';
import { createStore, Provider } from 'jotai';
import { userAtom } from '@/@core/store/authAtoms';
import type { User } from '@/@core/types/user';

export function JotaiProvider({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser?: User | null;
}) {
  const [store] = useState(() => {
    const s = createStore();
    s.set(userAtom, initialUser ?? null);
    return s;
  });

  return <Provider store={store}>{children}</Provider>;
}
