'use client';

import {
  IconWorld,
  IconShoppingBag,
  IconCurrencyEthereum,
} from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { RouterUrl } from '@/@core/constants/routerUrl';
import { Muted } from '@/components/ui/typography';
import { useCart } from '@/contexts/cartContext';
import { useAuth } from '@/contexts/authContext';

import { Separator } from '@/components/ui/separator';
import { useBreakpoint } from '@/@core/hooks/useBreakpoint';
import { HeaderMenu } from '@/@layout/components/headerMenu';
import { UserMenu } from '@/@layout/components/userMenu';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

const LOCALES = [
  { value: 'en', label: 'English' },
  { value: 'zh-TW', label: '繁體中文' },
] as const;

export function Header() {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  const { items, setIsOpen } = useCart();
  const { openLogin, openSignup } = useAuth();
  const [locale, setLocale] = useState<'en' | 'zh-TW'>('en');

  const [isAuth, setIsAuth] = useState(true);

  return (
    <header className="sticky top-0 left-0 right-0 z-50 flex h-13 md:h-14 items-center justify-between bg-background px-4">
      {/* Left: Logo */}
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2">
          <img width={120} src="/images/logo.png" />
        </Link>

        {isDesktop && (
          <>
            <Link href={RouterUrl.Store} className="">
              <Muted className="font-bold text-base">{'Prompt Store'}</Muted>
            </Link>
            <Link href={RouterUrl.Store} className="">
              <Muted className="font-bold text-base">{'AI Toolkit'}</Muted>
            </Link>
          </>
        )}
      </div>

      {/* Right: Actions */}
      <div className="flex h-5 items-center gap-3">
        <Switch checked={isAuth} onCheckedChange={setIsAuth} />
        {isDesktop && (
          <>
            <div className="flex items-center gap-6">
              <Link href={RouterUrl.Business}>
                <Muted className="font-bold text-base">{'Enterprise'}</Muted>
              </Link>

              <Link href={RouterUrl.Store} className="">
                <Muted className="font-bold text-base">{'Pricing'}</Muted>
              </Link>
            </div>
            <Separator orientation="vertical" />
          </>
        )}

        {isDesktop && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-2 text-muted-foreground">
                <IconWorld />
                English
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {LOCALES.map((l) => (
                <DropdownMenuItem
                  key={l.value}
                  onClick={() => setLocale(l.value)}
                  className={`font-bold cursor-pointer${locale === l.value ? ' text-primary focus:text-primary' : ''}`}
                >
                  {l.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {isAuth && (
          <>
            <Badge className="h-8 flex gap-1 cursor-pointer border-primary">
              <IconCurrencyEthereum size={18} />
              <span className="font-bold text-sm">1,000</span>
            </Badge>
            <Button
              variant="outline"
              size="icon"
              className="relative h-8"
              onClick={() => setIsOpen(true)}
            >
              <IconShoppingBag />
              {items.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                  {items.length}
                </span>
              )}
            </Button>

            {isDesktop && <UserMenu />}
          </>
        )}

        {!isAuth && (
          <>
            <Button variant="secondary" size="sm" onClick={openLogin}>
              Login
            </Button>
            <Button variant="default" size="sm" onClick={openSignup}>
              Sign up
            </Button>
          </>
        )}

        {(isMobile || isTablet) && <HeaderMenu />}
      </div>
    </header>
  );
}
