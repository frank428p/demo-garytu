import { Header } from '@/@layout/components/header';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      {children}
    </div>
  );
}
