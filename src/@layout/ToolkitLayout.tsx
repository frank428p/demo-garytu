'use client';
import { type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from './components/sidebar';
import { SidebarNavLink } from './components/sidebar-nav-link';
import { useBreakpoint } from '@/@core/hooks/useBreakpoint';
import {
  StoreNav,
  AssetsNav,
  ImageGenerateNav,
  VideoGenerateNav,
} from './constants';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const mainNav = [StoreNav, AssetsNav];
const generateNav = [ImageGenerateNav, VideoGenerateNav];

type ToolkitLayoutProps = {
  children: ReactNode;
};

export default function ToolkitLayout({ children }: ToolkitLayoutProps) {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  const pathname = usePathname();

  return (
    <div className="flex">
      <Sidebar />
      <main
        className={cn(
          'flex-1 px-4 pb-20 md:pb-0',
          pathname === '/toolkit/store' ? 'px-0' : 'px-2',
        )}
      >
        {children}
      </main>

      {(isMobile || isTablet) && (
        <nav className="fixed bottom-0 left-0 z-40 w-screen flex items-center bg-background border-t border-border px-2 overflow-hidden">
          {mainNav.map((item) => (
            <SidebarNavLink
              key={item.url}
              item={item}
              isActive={pathname === item.url}
              className="flex-1"
            />
          ))}
          {generateNav.map((item) => (
            <SidebarNavLink
              key={item.url}
              item={item}
              isActive={pathname === item.url}
              className="flex-1"
            />
          ))}
        </nav>
      )}
    </div>
  );
}
