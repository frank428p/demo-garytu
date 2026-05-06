import { Footer } from '@/@layout/components/footer';
import { FooterLayout } from '@/@layout/FooterLayout';
import { type ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
