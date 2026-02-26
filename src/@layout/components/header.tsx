'use client';

import { IconWorld, IconShoppingCart } from '@tabler/icons-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { RouterUrl } from '@/@core/constants/routerUrl';
import { Muted } from '@/components/ui/typography';
import { useCart } from '@/contexts/cartContext';

export function Header() {
  const { items, setIsOpen } = useCart();

  return (
    <header className="sticky top-0 left-0 right-0 z-50 flex h-17 items-center justify-between bg-background px-4">
      {/* Left: Logo */}
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2">
          <img width={120} src="/images/logo.png" />
        </Link>

        <Link href={RouterUrl.Store} className="">
          <Muted className="font-bold text-base">{'AI Toolkit'}</Muted>
        </Link>
        <Link href={RouterUrl.Business}>
          <Muted className="font-bold text-base">{'Business'}</Muted>
        </Link>
      </div>

      {/* Right: Actions */}
      <div className="flex h-5 items-center gap-3">
        <Button variant="outline" size="icon">
          <IconWorld />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="relative"
          onClick={() => setIsOpen(true)}
        >
          <IconShoppingCart />
          {items.length > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
              {items.length}
            </span>
          )}
        </Button>

        <Button variant="secondary" size="default">
          Sign in
        </Button>
        <Button variant="default" size="default">
          Sign up
        </Button>
      </div>
    </header>
  );
}
