'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  IconMenu2,
  IconX,
  IconBuildingStore,
  IconSparkles,
  IconBuilding,
  IconTag,
  IconCrown,
  IconLogs,
  IconArchive,
  IconHistory,
  IconSettings,
  IconLogout,
  IconUserFilled,
} from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { DrawerPrimitive } from '@/components/ui/drawer';
import { Separator } from '@/components/ui/separator';
import { RouterUrl } from '@/@core/constants/routerUrl';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Muted, Small } from '@/components/ui/typography';

const mainNav = [
  { label: 'Prompt Store', url: RouterUrl.Store, icon: IconBuildingStore },
  { label: 'AI Toolkit', url: RouterUrl.Store, icon: IconSparkles },
  { label: 'Enterprise', url: RouterUrl.Business, icon: IconBuilding },
  { label: 'Pricing', url: RouterUrl.Store, icon: IconTag },
];

const userNav = [
  { label: 'Subscription', url: RouterUrl.UserSubscription, icon: IconCrown },
  { label: 'My Prompt', url: RouterUrl.UserMyPrompt, icon: IconArchive },
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

export function HeaderMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
        <IconMenu2 />
      </Button>

      <DrawerPrimitive.Root
        direction="right"
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <DrawerPrimitive.Portal>
          <DrawerPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60" />
          <DrawerPrimitive.Content className="fixed right-0 top-0 bottom-0 z-50 flex w-[100vw] sm:w-[80vw] sm:max-w-[320px] flex-col bg-background outline-none">
            {/* Header */}
            <DrawerPrimitive.Title className="flex items-center justify-between px-4 py-3 shrink-0">
              <img width={110} src="/images/logo.png" />
              <DrawerPrimitive.Close asChild>
                <Button variant="ghost" size="icon">
                  <IconX size={20} />
                </Button>
              </DrawerPrimitive.Close>
            </DrawerPrimitive.Title>

            {/* <Separator /> */}

            <div className="flex items-center gap-2 px-5 py-2 relative">
              <div className="absolute top-3 right-3 bg-primary/10 py-1 px-3 border border-primary rounded-md text-primary">
                <Small className="text-xs">Pro</Small>
              </div>
              <Avatar size="sm">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <IconUserFilled size={20} />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <Small className="text-sm">User Name</Small>
                <Muted className="text-xs">user@gmail.com</Muted>
              </div>
            </div>

            {/* Scrollable content */}
            <nav className="flex flex-col flex-1 overflow-y-auto p-3 gap-1">
              {userNav.map((item) => {
                const Icon = item.icon;
                return (
                  <DrawerPrimitive.Close asChild key={item.label}>
                    <Link
                      href={item.url}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2.5 text-base font-medium transition-colors',
                        'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                      )}
                    >
                      <Icon size={18} className="shrink-0" />
                      {item.label}
                    </Link>
                  </DrawerPrimitive.Close>
                );
              })}

              <Separator className="my-2" />

              {mainNav.map((item) => {
                const Icon = item.icon;
                return (
                  <DrawerPrimitive.Close asChild key={item.label}>
                    <Link
                      href={item.url}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2.5 text-base font-medium transition-colors',
                        'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                      )}
                    >
                      <Icon size={18} className="shrink-0" />
                      {item.label}
                    </Link>
                  </DrawerPrimitive.Close>
                );
              })}
            </nav>

            <Separator />

            {/* Footer: Logout */}
            <div className="p-3 shrink-0">
              <button
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  'text-destructive hover:bg-destructive/10',
                )}
              >
                <IconLogout size={18} className="shrink-0" />
                Logout
              </button>
            </div>
          </DrawerPrimitive.Content>
        </DrawerPrimitive.Portal>
      </DrawerPrimitive.Root>
    </>
  );
}
