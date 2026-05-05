import type { Locale } from '@/@core/hooks/useLocaleSwitcher';

type Precision = 'date' | 'minute';

function getLocale(): Locale {
  const cookie = typeof document !== 'undefined' ? document.cookie : '';
  return (cookie.match(/(?:^|;\s*)locale=([^;]+)/)?.[1] ?? 'zh-TW') as Locale;
}

export function formatDate(
  isoString: string,
  precision: Precision = 'date',
): string {
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return '';
  const locale = getLocale();

  const hh = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  const timePart = `${hh}:${mm}`;

  if (locale === 'zh-TW') {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const datePart = `${y}-${m}-${d}`;
    return precision === 'minute' ? `${datePart} ${timePart}` : datePart;
  }

  const datePart = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);

  return precision === 'minute' ? `${datePart} ${timePart}` : datePart;
}
