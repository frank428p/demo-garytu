'use client';
import { type ReactNode } from 'react';
import { Sidebar } from './components/sidebar';
import { useBreakpoint } from '@/@core/hooks/useBreakpoint';

type ToolkitLayoutProps = {
  children: ReactNode;
};

export default function ToolkitLayout({ children }: ToolkitLayoutProps) {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  return (
    <div className="flex">
      {isDesktop && <Sidebar />}
      <main className="flex-1 overflow-y-auto px-4">{children}</main>
    </div>
  );
}
