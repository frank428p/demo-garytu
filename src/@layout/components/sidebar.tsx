'use client';

import { usePathname } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import {
  StoreNav,
  AssetsNav,
  ImageGenerateNav,
  VideoGenerateNav,
} from '../constants';
import { SidebarNavLink } from './sidebar-nav-link';

const mainNav = [StoreNav, AssetsNav];
const generateNav = [ImageGenerateNav, VideoGenerateNav];
// const otherNav = [EnterpriseNav];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-[68px] left-0 flex h-[calc(100vh-68px)] w-17 flex-col bg-background z-40">
      <nav className="flex flex-1 flex-col overflow-y-auto p-3">
        {mainNav.map((item) => (
          <SidebarNavLink
            key={item.url}
            item={item}
            isActive={pathname === item.url}
          />
        ))}
        <Separator />

        {generateNav.map((item) => (
          <SidebarNavLink
            key={item.url}
            item={item}
            isActive={pathname === item.url}
          />
        ))}

        {/* <Separator /> */}

        {/* {otherNav.map((item) => (
          <SidebarNavLink
            key={item.url}
            item={item}
            isActive={pathname === item.url}
          />
        ))} */}

        {/* <div className="flex-1" /> */}
      </nav>
    </aside>
  );
}
