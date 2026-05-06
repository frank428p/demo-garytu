'use client';

import { useTranslations } from 'next-intl';
import { PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { cn } from '@/lib/utils';

interface PaginationControlsProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
  className?: string;
}

export function PaginationControls({
  page,
  totalPages,
  onPageChange,
  isLoading = false,
  className,
}: PaginationControlsProps) {
  const t = useTranslations('common');

  if (totalPages <= 1) return null;

  return (
    <div className={cn('flex items-center justify-between gap-1', className)}>
      <span className="text-xs text-muted-foreground tabular-nums">
        {t('pageOf', { page, total: totalPages })}
      </span>

      <div className="flex items-center gap-1">
        <PaginationPrevious
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (page > 1) onPageChange(page - 1);
          }}
          className={cn(
            'h-6 w-6 border border-border rounded-md',
            page === 1 || isLoading ? 'pointer-events-none opacity-50' : '',
          )}
        />
        <PaginationNext
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (page < totalPages) onPageChange(page + 1);
          }}
          className={cn(
            'h-6 w-6 border border-border rounded-md',
            page === totalPages || isLoading
              ? 'pointer-events-none opacity-50'
              : '',
          )}
        />
      </div>
    </div>
  );
}
