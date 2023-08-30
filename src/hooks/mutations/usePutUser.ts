import userApi from '@apis/user/userApi';
import useToast from '@hooks/useToast';
import { userState } from '@recoil/auth';
import { useMutation } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';

export const usePutUser = () => {
  const { showToast } = useToast();
  const setUserInfo = useSetRecoilState(userState);

  return useMutation((nickname: string) => userApi.putUser(nickname), {
    onSuccess: (_, nickname) => {
      setUserInfo((info) => {
        return { ...info, username: nickname };
      });
      showToast({
        type: 'success',
        message: '프로필을 저장했어요.',
      });
    },
    onError: () => {
      showToast({
        type: 'fail',
        message: '오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      });
    },
  });
};
