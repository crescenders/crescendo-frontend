import userApi from '@apis/user/userApi';
import { useQuery } from '@tanstack/react-query';

export const useGetProfile = () => {
  return useQuery({
    queryKey: ['useGetProfile'],
    queryFn: () => userApi.getUser(),

    staleTime: Infinity,
    gcTime: Infinity,
  });
};
