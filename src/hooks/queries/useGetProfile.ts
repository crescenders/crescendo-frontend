import userApi from '@apis/user/userApi';
import { useQuery } from '@tanstack/react-query';
import { getToken } from '@utils/token';

export const useGetProfile = () => {
  return useQuery(['useGetProfile'], () => userApi.getUser(), {
    enabled: !!getToken().accessToken,
  });
};
