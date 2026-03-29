'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { userApi } from '@/@core/api/user';
import { userAtom } from '@/@core/store/authAtoms';
import type { UpdateUserInfoRequest } from '@/@core/types/user';

export const USER_ME_KEY = ['users', 'me'];

export function useMe() {
  return useQuery({
    queryKey: USER_ME_KEY,
    queryFn: () => userApi.getMe(),
    enabled: false,
    retry: false,
  });
}

export function useUpdateMe() {
  const setUser = useSetAtom(userAtom);
  return useMutation({
    mutationFn: (data: UpdateUserInfoRequest) => userApi.updateMe(data),
    onSuccess: (res) => {
      setUser(res.data);
    },
  });
}
