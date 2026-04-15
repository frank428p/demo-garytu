import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

const locales = ['en', 'zh-TW'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'zh-TW';

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const raw = cookieStore.get('locale')?.value ?? defaultLocale;
  const locale: Locale = (locales as readonly string[]).includes(raw)
    ? (raw as Locale)
    : defaultLocale;

  const [common, error] = await Promise.all([
    import(`../../i18n/common/${locale}.json`),
    import(`../../i18n/error/${locale}.json`),
  ]);

  return {
    locale,
    messages: {
      common: common.default,
      error: error.default,
    },
  };
});
