import memberApi from '@apis/member/memberApi';
import useToast from '@hooks/useToast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { managementParamType } from '@hooks/mutations/useReplyApplication';

export const useDeleteMember = () => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

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
        message: '오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      });
    },
  });
};
