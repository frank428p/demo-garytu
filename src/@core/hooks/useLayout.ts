'use client';

import { usePathname } from 'next/navigation';

export function useLayout() {
  const pathname = usePathname();
  const isFullContainer = pathname.includes('/toolkit');

  return { isFullContainer };
}
