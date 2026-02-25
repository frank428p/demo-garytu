import type { Metadata } from 'next';
import { Inter, Noto_Sans_TC } from 'next/font/google';
import './globals.css';
import { MainLayout } from '@/@layout/MainLayout';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const notoSansTC = Noto_Sans_TC({
  variable: '--font-noto-sans-tc',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'GaryTu AI',
  description: 'AI Art Generation Platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" className="dark">
      <body
        className={`${inter.variable} ${notoSansTC.variable} antialiased`}
      >
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
