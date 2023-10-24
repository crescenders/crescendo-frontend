import assingmentApi from '@apis/assignment/assignmentApi';
import { TOAST_MESSAGE } from '@constants/index';
import useToast from '@hooks/useToast';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { queryClient } from 'pages/_app';

export const usePostAssignment = () => {
  const { showToast } = useToast();
  const router = useRouter();

  return useMutation({
    mutationFn: ({
      uuid,
      title,
      content,
    }: Pick<Assignment, 'title' | 'content'> & { uuid: string }) =>
      assingmentApi.postAssignmentDetail(uuid, title, content),
    onSuccess: (_, { uuid }) => {
      queryClient.invalidateQueries({
        queryKey: ['useGetAssignmentList', uuid],
      });
      router.back();
      showToast({
        type: 'success',
        message: '과제를 등록하였습니다.',
      });
    },
    onError: () =>
      showToast({
        type: 'fail',
        message: TOAST_MESSAGE.fail,
      }),
  });
};
