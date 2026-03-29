'use client';

import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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

export function useFavoritePrompts() {
  return useInfiniteQuery({
    queryKey: ['prompts', 'favorites'],
    queryFn: ({ pageParam = 1 }) =>
      promptsApi.listFavorites({ page: pageParam as number }),
    getNextPageParam: (lastPage) => {
      const meta = lastPage.meta;
      if (!meta) return undefined;
      return meta.page < meta.total_pages ? meta.page + 1 : undefined;
    },
    initialPageParam: 1,
  });
}

export function usePurchasedPrompts() {
  return useInfiniteQuery({
    queryKey: ['prompts', 'purchased'],
    queryFn: ({ pageParam = 1 }) =>
      promptsApi.listPurchased({ page: pageParam as number }),
    getNextPageParam: (lastPage) => {
      const meta = lastPage.meta;
      if (!meta) return undefined;
      return meta.page < meta.total_pages ? meta.page + 1 : undefined;
    },
    initialPageParam: 1,
  });
}

export function useToggleFavorite(uuid: string) {
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['prompts', uuid] });
    queryClient.invalidateQueries({ queryKey: ['prompts', 'favorites'] });
  };

  const add = useMutation({
    mutationFn: () => promptsApi.addFavorite(uuid),
    onSuccess: invalidate,
  });

  const remove = useMutation({
    mutationFn: () => promptsApi.removeFavorite(uuid),
    onSuccess: invalidate,
  });

  return { add, remove };
}
