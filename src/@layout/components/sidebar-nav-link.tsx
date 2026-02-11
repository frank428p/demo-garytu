'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { NavigationType } from '@/@layout/types';

interface SidebarNavLinkProps {
  item: NavigationType;
  isActive: boolean;
}

export function SidebarNavLink({ item, isActive }: SidebarNavLinkProps) {
  const Icon = isActive && item.activeIcon ? item.activeIcon : item.icon;

  return (
    <Link
      href={item.url}
      className={cn(
        'flex flex-col items-center gap-1 rounded-lg px-3 py-2 text-xs font-medium transition-colors group',
        isActive
          ? 'text-accent-foreground'
          : 'text-muted-foreground hover:text-accent-foreground',
      )}
    >
      <div
        className={cn(
          'w-9 h-9 flex items-center justify-center rounded-lg',
          isActive ? 'bg-primary' : 'group-hover:bg-accent',
        )}
      >
        <Icon className="h-6 w-6" />
      </div>
      {item.i18nKey}
    </Link>
  );
}
