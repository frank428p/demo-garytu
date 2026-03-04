'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { type ReactNode } from 'react';
import {
  IconCrown,
  IconLogs,
  IconArchive,
  IconHistory,
  IconSettings,
} from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import { RouterUrl } from '@/@core/constants/routerUrl';

const userNav = [
  {
    label: 'Subscription',
    url: RouterUrl.UserSubscription,
    icon: IconCrown,
  },
  {
    label: 'My Prompt',
    url: RouterUrl.UserMyPrompt,
    icon: IconArchive,
  },
  {
    label: 'Order History',
    url: RouterUrl.UserOrderHistory,
    icon: IconHistory,
  },
  {
    label: 'Manage Account',
    url: RouterUrl.UserManageAccount,
    icon: IconSettings,
  },
];

export default function UserLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-[calc(100vh-56px)]">
      <aside className="sticky top-14 h-[calc(100vh-56px)] hidden md:flex md:w-14 lg:w-56 shrink-0 flex-col bg-background md:p-2 lg:p-4">
        <nav className="flex flex-col gap-1">
          {userNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.url;
            return (
              <Link
                key={item.url}
                href={item.url}
                className={cn(
                  'flex items-center rounded-lg py-2 text-sm font-medium transition-colors',
                  'md:justify-center md:px-0 lg:justify-start lg:gap-3 lg:px-3',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                )}
              >
                <Icon size={18} className="shrink-0" />
                <span className="hidden lg:inline">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto p-4 md:p-6 justify-items-center">
        <div className="max-w-3xl w-full">{children}</div>
      </main>
    </div>
  );
}
