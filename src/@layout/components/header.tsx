'use client';

import {
  IconWorld,
  IconShoppingBag,
  IconCurrencyEthereum,
  IconChevronDown,
  IconPhoto,
  IconVideo,
} from '@tabler/icons-react';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { useAtomValue } from 'jotai';
import { userAtom } from '@/store/authAtoms';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { RouterUrl } from '@/@core/constants/routerUrl';
import { Muted, Small } from '@/components/ui/typography';
import { useCart } from '@/contexts/cartContext';
import { useAuth } from '@/contexts/authContext';
import { Separator } from '@/components/ui/separator';
import { useBreakpoint } from '@/@core/hooks/useBreakpoint';
import { HeaderMenu } from '@/@layout/components/headerMenu';
import { UserMenu } from '@/@layout/components/userMenu';
import { Badge } from '@/components/ui/badge';

const LOCALES = [
  { value: 'en', label: 'English' },
  { value: 'zh-TW', label: '繁體中文' },
] as const;

export function Header() {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  const { items, setIsOpen } = useCart();
  const { openLogin, openSignup } = useAuth();
  const [locale, setLocale] = useState<'en' | 'zh-TW'>('en');

  const user = useAtomValue(userAtom);
  const isAuth = !!user;
  const [toolkitOpen, setToolkitOpen] = useState(false);
  const toolkitCloseTimer = useRef<ReturnType<typeof setTimeout>>(null);

  const handleToolkitEnter = () => {
    if (toolkitCloseTimer.current) clearTimeout(toolkitCloseTimer.current);
    setToolkitOpen(true);
  };

  const handleToolkitLeave = () => {
    toolkitCloseTimer.current = setTimeout(() => setToolkitOpen(false), 100);
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50 flex h-13 md:h-14 items-center justify-between bg-background px-4">
      {/* Left: Logo */}
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2">
          <img width={120} src="/images/logo.png" />
        </Link>

        {isDesktop && (
          <div className="flex items-center gap-2">
            <Link href={RouterUrl.Store} className="py-1 px-2">
              <Muted className="font-normal text-base hover:text-primary">
                {'Prompt Store'}
              </Muted>
            </Link>

            <DropdownMenu
              open={toolkitOpen}
              onOpenChange={setToolkitOpen}
              modal={false}
            >
              <DropdownMenuTrigger
                asChild
                onMouseEnter={handleToolkitEnter}
                onMouseLeave={handleToolkitLeave}
              >
                <Button
                  variant="ghost"
                  asChild
                  className="text-muted-foreground font-normal text-base hover:text-primary h-auto py-1 px-2 rounded-lg"
                >
                  <Muted>AI Toolkit</Muted>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                onMouseEnter={handleToolkitEnter}
                onMouseLeave={handleToolkitLeave}
                className="p-3"
              >
                <DropdownMenuItem
                  asChild
                  className="cursor-pointer w-[280px] p-2 rounded-xl"
                >
                  <Link
                    href={RouterUrl.ImageGenerate}
                    className="flex gap-3 items-center"
                  >
                    <div className="p-3 bg-background/60 rounded-lg">
                      <IconPhoto size={48} className="!size-6 shrink-0" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <Small>Create Image</Small>
                      <Muted>Generate AI Images</Muted>
                    </div>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                  asChild
                  className="cursor-pointer w-[280px] p-2 rounded-xl"
                >
                  <Link
                    href={RouterUrl.VideoGenerate}
                    className="flex gap-3 items-center"
                  >
                    <div className="p-3 bg-background/60 rounded-lg">
                      <IconVideo size={48} className="!size-6 shrink-0" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <Small>Create Video</Small>
                      <Muted>Generate AI Videos</Muted>
                    </div>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>

      {/* Right: Actions */}
      <div className="flex h-5 items-center gap-3">
        {isDesktop && (
          <>
            <div className="flex items-center gap-2">
              <Link href={RouterUrl.Business} className="py-1 px-2">
                <Muted className="font-normal text-base hover:text-primary">
                  {'Enterprise'}
                </Muted>
              </Link>

              <Link href={RouterUrl.Store} className="py-1 px-2">
                <Muted className="font-normal text-base hover:text-primary">
                  {'Pricing'}
                </Muted>
              </Link>
            </div>
            <Separator orientation="vertical" />
          </>
        )}

        {isDesktop && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {/* <Button variant="ghost" className="p-2 text-muted-foreground">
                <IconWorld />
                English
              </Button> */}
              <Button
                variant="ghost"
                className="text-muted-foreground font-normal text-base hover:text-primary h-auto py-1 px-2 rounded-lg focus-visible:ring-0 focus-visible:outline-none"
              >
                <IconWorld />
                English
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="p-3">
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
