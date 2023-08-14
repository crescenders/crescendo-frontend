import userApi from '@apis/user/userApi';
import useDeleteToken from '@hooks/useDeleteToken';
import useToast from '@hooks/useToast';
import { useMutation } from 'react-query';

export const usePutUser = () => {
  const { showToast } = useToast();
  const { initUserState } = useDeleteToken();

  return useMutation((nickname: string) => userApi.putUser(nickname), {
    onSuccess: () => {
      showToast({
        type: 'success',
        message: '프로필을 저장했어요.',
      });
      initUserState();
    },
    onError: () => {
      showToast({
        type: 'fail',
        message: '오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      });
    },
  });
};
