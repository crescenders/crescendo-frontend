import memberApi from '@apis/member/memberApi';
import useToast from '@hooks/useToast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { managementParamType } from '@hooks/mutations/useReplyApplication';
import { queryClient } from 'pages/_app';
import { TOAST_MESSAGE } from '@constants/index';

export const useDeleteMember = () => {
  const { showToast } = useToast();

  return useMutation({
    mutationFn: ({ uuid, id }: managementParamType) =>
      memberApi.deleteMember(uuid, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['useGetStudyMembers'] });
      showToast({
        type: 'success',
        message: '성공적으로 멤버를 탈퇴시켰어요.',
      });
    },
    onError: () => {
      showToast({
        type: 'fail',
        message: TOAST_MESSAGE.fail,
      });
    },
  });
};
