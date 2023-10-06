import authApi from '@apis/auth/authApi';
import { useMutation } from '@tanstack/react-query';
import { getCookie } from '@utils/cookie';

export const usePostLogout = () => {
  const refreshToken = getCookie('refreshToken');
  return useMutation({
    mutationFn: () => authApi.logout(refreshToken),
  });
};
