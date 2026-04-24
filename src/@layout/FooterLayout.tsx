import { Footer } from './components/footer';

export function FooterLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="container pb-6 lg:pb-8">{children}</div>
      <Footer />
    </>
  );
}
