import { Header } from '@/@layout/components/header';
import { CartDrawer } from '@/components/CartDrawer';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <CartDrawer />
      {children}
    </>
  );
}
