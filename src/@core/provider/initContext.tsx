'use client';

import { useEffect, useState } from 'react';
import { useSetAtom } from 'jotai';
import { webConfigAtom } from '@/@core/store/configAtoms';
import { webConfigApi } from '@/@core/api/webConfig';

export function InitProvider({ children }: { children: React.ReactNode }) {
  const setWebConfig = useSetAtom(webConfigAtom);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      const res = await webConfigApi.getConfig();
      setWebConfig(res.data);
    };

    init().finally(() => setInitialized(true));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!initialized) return null;

  return <>{children}</>;
}
