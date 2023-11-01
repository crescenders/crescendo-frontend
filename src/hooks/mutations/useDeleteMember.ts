import memberApi from '@apis/member/memberApi';
import useToast from '@hooks/useToast';
import { useMutation } from '@tanstack/react-query';
import { managementParamType } from '@hooks/mutations/useReplyApplication';
import { queryClient } from 'pages/_app';
import { TOAST_MESSAGE } from '@constants/index';

export const useDeleteMember = () => {
  const { showToast } = useToast();

  return useMutation({
    mutationFn: ({ uuid, id }: managementParamType) =>
      memberApi.deleteMember(uuid, id),
    onMutate: (param) => {
      queryClient.cancelQueries({
        queryKey: ['useGetStudyMembers', param.uuid],
      });

      const prevData = queryClient.getQueryData([
        'useGetStudyMembers',
        param.uuid,
      ]) as Member[];
      const optimisticData: Member[] = prevData.filter(
        (data) => data.id !== param.id,
      );

      queryClient.setQueryData(
        ['useGetStudyMembers', param.uuid],
        optimisticData,
      );
      showToast({
        type: 'success',
        message: '성공적으로 멤버를 추방했어요.',
      });
      return { prevData, optimisticData };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['useGetStudyMembers'] });
    },
    onError: (_error, param, context) => {
      queryClient.setQueryData(
        ['useGetStudyMembers', param.uuid],
        context?.prevData,
      );
      showToast({
        type: 'fail',
        message: TOAST_MESSAGE.fail,
      });
    },
  });
};
