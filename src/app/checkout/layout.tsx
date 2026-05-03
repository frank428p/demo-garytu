import { type ReactNode } from 'react';
import { FooterLayout } from '@/@layout/FooterLayout';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <FooterLayout>{children}</FooterLayout>
    </>
  );
}
