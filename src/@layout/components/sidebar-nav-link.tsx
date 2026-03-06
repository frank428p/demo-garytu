'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { NavigationType } from '@/@layout/types';

interface SidebarNavLinkProps {
  item: NavigationType;
  isActive: boolean;
  className?: string;
}

export function SidebarNavLink({
  item,
  isActive,
  className,
}: SidebarNavLinkProps) {
  const Icon = isActive && item.activeIcon ? item.activeIcon : item.icon;

  return (
    <Link
      href={item.url}
      className={cn(
        'flex flex-col items-center lg:gap-1 rounded-lg px-3 py-2 font-medium transition-colors group',
        className,
        isActive
          ? 'text-accent-foreground'
          : 'text-muted-foreground hover:text-accent-foreground',
      )}
    >
      <div
        className={cn(
          'lg:w-9 lg:h-9 flex items-center justify-center rounded-sm lg:rounded-lg',
          isActive ? 'lg:bg-primary' : 'lg:group-hover:bg-accent',
        )}
      >
        <Icon
          className={cn(
            'h-5 w-5 lg:h-6 lg:w-6 lg:group-hover:text-foreground',
            isActive
              ? 'text-primary lg:text-foreground'
              : 'text-muted-foreground',
          )}
        />
      </div>
      <span
        className={cn(
          'text-[10px] lg:text-xs text-muted-foreground lg:group-hover:text-foreground',
          isActive
            ? 'text-primary lg:text-foreground'
            : 'text-muted-foreground',
        )}
      >
        {item.i18nKey}
      </span>
    </Link>
  );
}
