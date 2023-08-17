import userApi from '@apis/user/userApi';
import { useQuery } from 'react-query';

export const useGetProfile = () => {
  return useQuery(['useGetProfile'], () => userApi.getUser());
};
