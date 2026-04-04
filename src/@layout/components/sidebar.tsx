'use client';

import { usePathname } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import {
  ExploreNav,
  StoreNav,
  AssetsNav,
  ImageGenerateNav,
  VideoGenerateNav,
} from '../constants';
import { SidebarNavLink } from './sidebar-nav-link';

const mainNav = [ExploreNav, StoreNav, AssetsNav];
const generateNav = [ImageGenerateNav, VideoGenerateNav];
// const otherNav = [EnterpriseNav];

export function Sidebar() {
  const pathname = usePathname();
  // w-17
  return (
    <aside className="sticky top-14 left-0 h-[calc(100vh-68px)] w-17 flex-col bg-background z-40 hidden lg:flex">
      <nav className="flex flex-1 flex-col overflow-y-auto pl-6">
        {mainNav.map((item) => (
          <SidebarNavLink
            key={item.url}
            item={item}
            isActive={pathname.startsWith(item.url)}
          />
        ))}
        <Separator />

        {generateNav.map((item) => (
          <SidebarNavLink
            key={item.url}
            item={item}
            isActive={pathname.startsWith(item.url)}
          />
        ))}

        {/* <Separator /> */}

        {/* {otherNav.map((item) => (
          <SidebarNavLink
            key={item.url}
            item={item}
            isActive={pathname.startsWith(item.url)}
          />
        ))} */}

        {/* <div className="flex-1" /> */}
      </nav>
    </aside>
  );
}
