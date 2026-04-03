import { useMediaQuery } from '@/@core/hooks/useMediaQuery';

export function useBreakpoint() {
  const isSm = useMediaQuery('(max-width: 767px)');
  const isMd = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isLg = useMediaQuery('(min-width: 1024px)');
  const isXl = useMediaQuery('(min-width: 1536px)');
  const is2Xl = useMediaQuery('(min-width: 1980px)');

  return {
    isMobile: isSm,
    isTablet: isMd,
    isDesktop: isLg,
    isXlDesktop: isXl,
    is2XlDesktop: is2Xl,
  };
}
