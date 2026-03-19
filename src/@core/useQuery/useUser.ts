'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { userApi } from '@/@core/api/user';
import { isLoggedInAtom } from '@/@core/store/authAtoms';
import type { UpdateUserInfoRequest } from '@/@core/types/user';

export const USER_ME_KEY = ['users', 'me'];

export function useMe() {
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  return useQuery({
    queryKey: USER_ME_KEY,
    queryFn: () => userApi.getMe(),
    enabled: isLoggedIn,
    retry: false,
  });
}

export function useUpdateMe() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateUserInfoRequest) => userApi.updateMe(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_ME_KEY });
    },
  });
}
