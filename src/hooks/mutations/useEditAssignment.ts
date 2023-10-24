import assingmentApi from '@apis/assignment/assignmentApi';
import { TOAST_MESSAGE } from '@constants/index';
import useToast from '@hooks/useToast';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { queryClient } from 'pages/_app';

export const useEditAssignmentDetail = () => {
  const router = useRouter();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: ({
      id,
      uuid,
      title,
      content,
    }: {
      id: number;
      uuid: string;
      title: string;
      content: string;
    }) => assingmentApi.putAssignmentDetail(id, uuid, title, content),
    onSuccess: (_, { uuid, id }) => {
      queryClient.invalidateQueries({
        queryKey: ['useGetAssignmentList', uuid],
      }),
        queryClient.invalidateQueries({
          queryKey: ['useGetAssignmentDetail', uuid, id],
        }),
        showToast({
          type: 'success',
          message: '과제를 수정하였습니다.',
        });
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
