import userApi from '@apis/user/userApi';
import { getToken } from '@utils/token';
import { useQuery } from 'react-query';

export const useGetProfile = () => {
  return useQuery(['useGetProfile'], () => userApi.getUser(), {
    enabled: !!getToken().accessToken,
  });
};
