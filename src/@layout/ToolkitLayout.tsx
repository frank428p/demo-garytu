import { type ReactNode } from 'react';
import { Sidebar } from './components/sidebar';

type ToolkitLayoutProps = {
  children: ReactNode;
};

export default function ToolkitLayout({ children }: ToolkitLayoutProps) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 overflow-y-auto px-4">{children}</main>
    </div>
  );
}
