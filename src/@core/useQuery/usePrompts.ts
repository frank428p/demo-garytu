'use client';

import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { promptsApi } from '@/@core/api/prompts';
import type { FeaturedPromptsParams, PromptsListParams, PromptsPaginationParams } from '@/@core/types/prompt';

export function usePromptsList(
  params: Omit<PromptsListParams, 'page'> = {},
  options?: { enabled?: boolean },
) {
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
    enabled: options?.enabled ?? true,
  });
}

export function useFeaturedPrompts(params: Omit<FeaturedPromptsParams, 'page' | 'page_size'> = {}) {
  return useQuery({
    queryKey: ['prompts', 'featured', params],
    queryFn: () => promptsApi.listFeatured({ ...params, all: true }),
  });
}

export function usePrompt(uuid: string) {
  return useQuery({
    queryKey: ['prompts', uuid],
    queryFn: () => promptsApi.get(uuid),
    enabled: !!uuid,
  });
}

export function useFavoritePrompts(params: PromptsPaginationParams = {}) {
  return useInfiniteQuery({
    queryKey: ['prompts', 'favorites', params],
    queryFn: ({ pageParam = 1 }) =>
      promptsApi.listFavorites({ ...params, page: pageParam as number }),
    getNextPageParam: (lastPage) => {
      const meta = lastPage.meta;
      if (!meta) return undefined;
      return meta.page < meta.total_pages ? meta.page + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 0,
    gcTime: 0,
  });
}

export function usePurchasedPrompts(params: PromptsPaginationParams = {}) {
  return useInfiniteQuery({
    queryKey: ['prompts', 'purchased', params],
    queryFn: ({ pageParam = 1 }) =>
      promptsApi.listPurchased({ ...params, page: pageParam as number }),
    getNextPageParam: (lastPage) => {
      const meta = lastPage.meta;
      if (!meta) return undefined;
      return meta.page < meta.total_pages ? meta.page + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 0,
    gcTime: 0,
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
