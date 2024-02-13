import userApi from '@apis/user/userApi';
import { useToast } from '@providers/ToastProvider';
import { userState } from '@recoil/auth';
import { useMutation } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';

export const usePutUser = () => {
  const { showToast } = useToast();
  const setUserInfo = useSetRecoilState(userState);

  return useMutation({
    mutationFn: (nickname: string) => userApi.putUser(nickname),
    onSuccess: (_, nickname) => {
      setUserInfo((info) => {
        return { ...info, username: nickname };
      });
      showToast({
        type: 'success',
        message: '프로필을 저장했어요.',
      });
    },
  });
};
