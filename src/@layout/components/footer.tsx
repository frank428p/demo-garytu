'use client';

import Link from 'next/link';
import { RouterUrl } from '@/@core/constants/routerUrl';
import { Separator } from '@/components/ui/separator';
import {
  IconBrandX,
  IconBrandInstagram,
  IconBrandYoutube,
} from '@tabler/icons-react';

const NAV_GROUPS = [
  {
    label: 'Product',
    links: [
      { label: 'Explore', href: RouterUrl.Explore },
      { label: 'Prompt Store', href: RouterUrl.Store },
      { label: 'Create Image', href: RouterUrl.ImageGenerate },
      { label: 'Create Video', href: RouterUrl.VideoGenerate },
    ],
  },
  {
    label: 'Company',
    links: [
      { label: 'Enterprise', href: RouterUrl.Business },
      { label: 'Pricing', href: RouterUrl.Store },
    ],
  },
  {
    label: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
    ],
  },
];

const SOCIALS = [
  { label: 'X', href: '#', icon: IconBrandX },
  { label: 'Instagram', href: '#', icon: IconBrandInstagram },
  { label: 'YouTube', href: '#', icon: IconBrandYoutube },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background mt-auto">
      <div className="container">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-[1fr_auto_auto_auto] py-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1 flex flex-col gap-4">
            <Link href="/" className="inline-flex items-center gap-2 w-fit">
              <img width={100} src="/images/logo.png" alt="GaryTu AI" />
            </Link>
            <p className="text-sm text-muted-foreground max-w-[260px] leading-relaxed">
              Discover and sell AI prompt packages for image and video
              generation.
            </p>
            <div className="flex items-center gap-3 mt-1">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  <Icon size={15} />
                </Link>
              ))}
            </div>
          </div>

          {/* Nav groups */}
          {NAV_GROUPS.map((group) => (
            <div key={group.label} className="flex flex-col gap-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-foreground">
                {group.label}
              </p>
              <ul className="flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator />

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between py-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} GaryTu AI. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">Made with ♥ in Taiwan</p>
        </div>
      </div>
    </footer>
  );
}
