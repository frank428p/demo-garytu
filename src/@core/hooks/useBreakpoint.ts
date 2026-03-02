import { useMediaQuery } from '@/lib/hooks/useMediaQuery';

export function useBreakpoint() {
  const isSm = useMediaQuery('(max-width: 767px)');
  const isMd = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isLg = useMediaQuery('(min-width: 1024px)');

  return {
    isMobile: isSm,
    isTablet: isMd,
    isDesktop: isLg,
  };
}
