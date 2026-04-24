import { FooterLayout } from '@/@layout/FooterLayout';
import { type ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return <FooterLayout>{children}</FooterLayout>;
}
