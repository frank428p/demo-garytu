'use client';

import { Header } from '@/@layout/components/header';
import { Sidebar } from '@/@layout/components/sidebar';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 overflow-y-auto px-3">{children}</main>
      </div>
    </>
  );
}
