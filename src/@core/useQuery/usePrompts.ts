'use client';

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { promptsApi } from '@/@core/api/prompts';
import type { PromptsListParams } from '@/@core/types/prompt';

export function usePromptsList(params: Omit<PromptsListParams, 'page'> = {}) {
  return useInfiniteQuery({
    queryKey: ['prompts', params],
    queryFn: ({ pageParam = 1 }) =>
      promptsApi.list({ ...params, page: pageParam as number }),
    getNextPageParam: (lastPage) => {
      const meta = lastPage.meta;
      if (!meta) return undefined;
      return meta.page < meta.total_pages ? meta.page + 1 : undefined;
    },
    initialPageParam: 1,
  });
}

export function usePrompt(uuid: string) {
  return useQuery({
    queryKey: ['prompts', uuid],
    queryFn: () => promptsApi.get(uuid),
    enabled: !!uuid,
  });
}
