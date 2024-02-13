import assingmentApi from '@apis/assignment/assignmentApi';
import { useToast } from '@providers/ToastProvider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export const usePostAssignment = () => {
  const queryClient = useQueryClient();
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
  });
};
