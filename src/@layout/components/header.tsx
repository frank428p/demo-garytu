'use client';

import { IconSearch, IconBell, IconPlus } from '@tabler/icons-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between bg-background px-4">
      {/* Left: Logo */}
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2">
          {/* <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">G</span>
          </div>
          <span className="text-lg font-semibold">GaryTu AI</span> */}
          <img width={120} src="/images/logo.png" />
        </Link>
      </div>

      {/* Center: Search */}
      <div className="mx-4 flex max-w-xl flex-1 items-center">
        <div className="relative w-full">
          <IconSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search AI-generated art, styles, creators..."
            className="h-10 w-full rounded-full border border-input bg-secondary pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        <Button>
          <IconPlus className="h-4 w-4" />
          <span>Create</span>
        </Button>
        <Button variant="outline" size="icon">
          <IconBell />
        </Button>
        <Button variant="secondary" size="icon">
          U
        </Button>
      </div>
    </header>
  );
}
