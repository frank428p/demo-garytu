'use client';
import { type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from './components/sidebar';
import { SidebarNavLink } from './components/sidebar-nav-link';
import { useBreakpoint } from '@/@core/hooks/useBreakpoint';
import {
  ExploreNav,
  StoreNav,
  AssetsNav,
  ImageGenerateNav,
  VideoGenerateNav,
} from './constants';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const mainNav = [ExploreNav, AssetsNav];
const generateNav = [ImageGenerateNav, VideoGenerateNav];
const BottomNav = [
  ExploreNav,
  StoreNav,
  ImageGenerateNav,
  VideoGenerateNav,
  AssetsNav,
];

type ToolkitLayoutProps = {
  children: ReactNode;
};

export default function ToolkitLayout({ children }: ToolkitLayoutProps) {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  const pathname = usePathname();

  return (
    <div className="flex min-h-[calc(100vh-3.25rem)] md:min-h-[calc(100vh-3.5rem)]">
      <Sidebar />
      <main
        className={cn(
          'flex-1 min-w-0 px-4 pb-20 lg:pb-0',
          pathname === '/toolkit/store' ? 'px-0' : 'px-4',
        )}
      >
        {children}
      </main>

      {(isMobile || isTablet) && (
        <nav className="fixed bottom-0 left-0 z-40 w-screen flex items-center bg-background border-t border-border px-2 pb-[env(safe-area-inset-bottom)] overflow-hidden">
          {BottomNav.map((item) => (
            <SidebarNavLink
              key={item.url}
              item={item}
              isActive={pathname === item.url}
              className="flex-1"
            />
          ))}
          {/* {mainNav.map((item) => (
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
          ))} */}
        </nav>
      )}
    </div>
  );
}
