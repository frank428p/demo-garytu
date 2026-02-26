'use client';

import { Header } from '@/@layout/components/header';
import { Sidebar } from '@/@layout/components/sidebar';
import { CartDrawer } from '@/components/CartDrawer';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <CartDrawer />
      {children}
      {/* <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 overflow-y-auto px-3">{children}</main>
      </div> */}
    </>
  );
}
