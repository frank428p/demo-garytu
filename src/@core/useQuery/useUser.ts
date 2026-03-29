'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { userApi } from '@/@core/api/user';
import { userAtom } from '@/@core/store/authAtoms';
import type { UpdateUserInfoRequest } from '@/@core/types/user';

export const USER_ME_KEY = ['users', 'me'];

export function useMe() {
  const user = useAtomValue(userAtom);
  return useQuery({
    queryKey: USER_ME_KEY,
    queryFn: () => userApi.getMe(),
    enabled: !user,
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
