'use client';

import {
  IconWorld,
  IconShoppingBag,
  IconUserFilled,
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
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

const LOCALES = [
  { value: 'en', label: 'English' },
  { value: 'zh-TW', label: '繁體中文' },
] as const;

export function Header() {
  const { items, setIsOpen } = useCart();
  const { openLogin, openSignup } = useAuth();
  const [locale, setLocale] = useState<'en' | 'zh-TW'>('en');

  const isAuth = true;

  return (
    <header className="sticky top-0 left-0 right-0 z-50 flex h-17 items-center justify-between bg-background px-4">
      {/* Left: Logo */}
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2">
          <img width={120} src="/images/logo.png" />
        </Link>

        <Link href={RouterUrl.Store} className="">
          <Muted className="font-bold text-base">{'Prompt Store'}</Muted>
        </Link>

        <Link href={RouterUrl.Store} className="">
          <Muted className="font-bold text-base">{'AI Toolkit'}</Muted>
        </Link>
      </div>

      {/* Right: Actions */}
      <div className="flex h-5 items-center gap-3">
        <div className="flex items-center gap-6">
          <Link href={RouterUrl.Business}>
            <Muted className="font-bold text-base">{'Enterprise'}</Muted>
          </Link>

          <Link href={RouterUrl.Store} className="">
            <Muted className="font-bold text-base">{'Pricing'}</Muted>
          </Link>
        </div>

        <Separator orientation="vertical" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-2">
              <IconWorld />
              English
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {LOCALES.map((l) => (
              <DropdownMenuItem
                key={l.value}
                onClick={() => setLocale(l.value)}
                className={`font-bold${locale === l.value ? ' text-primary focus:text-primary' : ''}`}
              >
                {l.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {isAuth && (
          <>
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

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar size="sm">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <IconUserFilled size={20} />
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end"></DropdownMenuContent>
            </DropdownMenu>
          </>
        )}

        {!isAuth && (
          <>
            <Button variant="secondary" size="default" onClick={openLogin}>
              Login
            </Button>
            <Button variant="default" size="default" onClick={openSignup}>
              Sign up
            </Button>
          </>
        )}
      </div>
    </header>
  );
}
