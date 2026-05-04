import { Footer } from './components/footer';

export function FooterLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="container flex-1 pb-6 lg:pb-8">{children}</main>
      <Footer />
    </>
  );
}
