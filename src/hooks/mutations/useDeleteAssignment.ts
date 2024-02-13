import assingmentApi from '@apis/assignment/assignmentApi';
import { TOAST_MESSAGE } from '@constants/index';
import { useToast } from '@providers/ToastProvider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export const useDeleteAssignmentDetail = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const router = useRouter();

  return useMutation({
    mutationFn: ({ id, uuid }: { id: number; uuid: string }) =>
      assingmentApi.deleteAssignmentDetail(id, uuid),
    onSuccess: (_, { uuid }) => {
      queryClient.invalidateQueries({
        queryKey: ['useGetAssignmentList', uuid],
      }),
        showToast({ type: 'success', message: '과제를 삭제하였습니다.' });
      router.back();
    },
    onError: () => {
      showToast({
        type: 'fail',
        message: TOAST_MESSAGE.fail,
      }),
        router.back();
    },
  });
};
