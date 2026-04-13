import type { Metadata } from 'next';
import { Inter, Noto_Sans_TC } from 'next/font/google';
import './globals.css';
import { MainLayout } from '@/@layout/MainLayout';
import { AuthProvider } from '@/@core/provider/authContext';
import { AuthDialog } from '@/components/AuthDialog';
import { JotaiProvider } from '@/@core/provider/JotaiProvider';
import { ReactQueryProvider } from '@/@core/provider/ReactQueryProvider';
import { Toaster } from '@/components/ui/sonner';
import { headers } from 'next/headers';
import type { User } from '@/@core/types/user';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const userDataHeader = headersList.get('x-user-data');
  const initialUser: User | null = userDataHeader
    ? JSON.parse(userDataHeader)
    : null;

  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      <body className={`${inter.variable} ${notoSansTC.variable} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ReactQueryProvider>
            <JotaiProvider initialUser={initialUser}>
              <AuthProvider>
                <MainLayout>{children}</MainLayout>
                <AuthDialog />
                <Toaster />
              </AuthProvider>
            </JotaiProvider>
          </ReactQueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
