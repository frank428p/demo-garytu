'use client';

import { useLocale } from 'next-intl';
import { useAtomValue } from 'jotai';
import { userAtom } from '@/@core/store/authAtoms';
import { userApi } from '@/@core/api/user';

export type Locale = 'en' | 'zh-TW';

export const LOCALES: { value: Locale; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'zh-TW', label: '繁體中文' },
];

export function syncLocaleFromUser(userLocale: string | null | undefined) {
  if (!userLocale) return;
  const validLocales: string[] = LOCALES.map((l) => l.value);
  if (!validLocales.includes(userLocale)) return;
  const currentLocale = document.cookie.match(/(?:^|;\s*)locale=([^;]+)/)?.[1] ?? 'zh-TW';
  if (userLocale !== currentLocale) {
    document.cookie = `locale=${userLocale}; path=/; max-age=31536000`;
    window.location.reload();
  }
}

export function useLocaleSwitcher() {
  const locale = useLocale() as Locale;
  const user = useAtomValue(userAtom);

  const switchLocale = async (newLocale: Locale) => {
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000`;
    if (user) {
      await userApi.updateMe({ locale: newLocale }).catch(() => {});
    }
    window.location.reload();
  };

  return { locale, switchLocale };
}
