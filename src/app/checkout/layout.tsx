import { type ReactNode } from 'react';
import ToolkitLayout from '@/@layout/ToolkitLayout';

type ToolkitRootLayoutProps = {
  children: ReactNode;
};

export default function ToolkitRootLayout({
  children,
}: ToolkitRootLayoutProps) {
  return <ToolkitLayout>{children}</ToolkitLayout>;
}
