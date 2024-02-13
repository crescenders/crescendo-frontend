import userApi from '@apis/user/userApi';
import useUser from '@hooks/useUser';
import { useToast } from '@providers/ToastProvider';
import { useMutation } from '@tanstack/react-query';

export const useDeleteUser = () => {
  const { showToast } = useToast();
  const { initUserState } = useUser();

  return useMutation({
    mutationFn: () => userApi.deleteUser(),
    onSuccess: () => {
      initUserState();
      showToast({
        type: 'success',
        message: '회원 탈퇴가 성공적으로 처리되었습니다.',
      });
    },
  });
};
