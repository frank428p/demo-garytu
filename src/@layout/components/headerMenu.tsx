'use client';

import { useState } from 'react';
import { useLocaleSwitcher } from '@/@core/hooks/useLocaleSwitcher';
import Link from 'next/link';
import {
  IconMenu2,
  IconX,
  IconChevronDown,
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
import { useTranslations } from 'next-intl';

const mainNav = [
  { label: 'Enterprise', url: RouterUrl.Business },
  { label: 'Pricing', url: RouterUrl.Store },
];

const toolkitNav = [
  { label: 'Image Generate', url: RouterUrl.ImageGenerate },
  { label: 'Video Generate', url: RouterUrl.VideoGenerate },
];

const userNav = [
  { label: 'Subscription', url: RouterUrl.UserSubscription },
  { label: 'My Prompt', url: RouterUrl.UserMyPrompt },
  { label: 'Order History', url: RouterUrl.UserOrderHistory },
  { label: 'Manage Account', url: RouterUrl.UserManageAccount },
];

const navLinkClass = cn(
  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-base font-medium transition-colors',
  'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
);

export function HeaderMenu() {
  const t = useTranslations('common');
  const [isOpen, setIsOpen] = useState(false);
  const [toolkitOpen, setToolkitOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { locale, switchLocale } = useLocaleSwitcher();

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
              {userNav.map((item) => (
                <DrawerPrimitive.Close asChild key={item.label}>
                  <Link href={item.url} className={navLinkClass}>
                    {item.label}
                  </Link>
                </DrawerPrimitive.Close>
              ))}
              <button
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-base font-medium transition-colors',
                  'text-destructive hover:bg-destructive/10',
                )}
              >
                {t('Logout')}
              </button>

              <Separator className="my-2" />

              {/* Prompt Store */}
              <DrawerPrimitive.Close asChild>
                <Link href={RouterUrl.Store} className={navLinkClass}>
                  {t('Prompt Store')}
                </Link>
              </DrawerPrimitive.Close>

              <DrawerPrimitive.Close asChild>
                <Link href={RouterUrl.Explore} className={navLinkClass}>
                  {t('Explore')}
                </Link>
              </DrawerPrimitive.Close>

              {/* AI Toolkit accordion */}
              <button
                onClick={() => setToolkitOpen((v) => !v)}
                className={navLinkClass}
              >
                {t('AI Toolkit')}
                <IconChevronDown
                  size={16}
                  className={cn(
                    'ml-auto shrink-0 transition-transform duration-200',
                    toolkitOpen && 'rotate-180',
                  )}
                />
              </button>
              <div
                className={cn(
                  'grid transition-[grid-template-rows] duration-200 ease-in-out',
                  toolkitOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                )}
              >
                <div className="overflow-hidden">
                  <div className="flex flex-col gap-1 pl-4 pb-1">
                    {toolkitNav.map((item) => (
                      <DrawerPrimitive.Close asChild key={item.label}>
                        <Link href={item.url} className={navLinkClass}>
                          {item.label}
                        </Link>
                      </DrawerPrimitive.Close>
                    ))}
                  </div>
                </div>
              </div>

              {mainNav.map((item) => (
                <DrawerPrimitive.Close asChild key={item.label}>
                  <Link href={item.url} className={navLinkClass}>
                    {item.label}
                  </Link>
                </DrawerPrimitive.Close>
              ))}

              {/* Language accordion */}
              <button
                onClick={() => setLangOpen((v) => !v)}
                className={navLinkClass}
              >
                {t('Language')}
                <IconChevronDown
                  size={16}
                  className={cn(
                    'ml-auto shrink-0 transition-transform duration-200',
                    langOpen && 'rotate-180',
                  )}
                />
              </button>
              <div
                className={cn(
                  'grid transition-[grid-template-rows] duration-200 ease-in-out',
                  langOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                )}
              >
                <div className="overflow-hidden">
                  <div className="flex flex-col gap-1 pl-4 pb-1">
                    {(['en', 'zh-TW'] as const).map((val) => (
                      <button
                        key={val}
                        onClick={() => {
                          switchLocale(val);
                          setLangOpen(false);
                          setIsOpen(false);
                        }}
                        className={cn(
                          'flex w-full items-center rounded-lg px-3 py-2.5 text-base font-medium transition-colors',
                          locale === val
                            ? 'text-primary'
                            : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                        )}
                      >
                        {val === 'en' ? 'English' : '繁體中文'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </nav>

            {/* Footer: Logout */}
            {/* <div className="p-3 shrink-0">
              <Button>Logout</Button>
            </div> */}
          </DrawerPrimitive.Content>
        </DrawerPrimitive.Portal>
      </DrawerPrimitive.Root>
    </>
  );
}
