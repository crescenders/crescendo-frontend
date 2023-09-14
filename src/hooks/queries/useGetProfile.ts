import userApi from '@apis/user/userApi';
import { useQuery } from '@tanstack/react-query';

export const useGetProfile = () => {
  return useQuery(['useGetProfile'], () => userApi.getUser(), {
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};
