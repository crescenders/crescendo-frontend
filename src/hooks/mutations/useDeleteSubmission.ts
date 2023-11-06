import submissionApi from '@apis/submission/submissionApi';
import { TOAST_MESSAGE } from '@constants/index';
import useToast from '@hooks/useToast';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { queryClient } from 'pages/_app';

export const useDeleteSubmissionDetail = () => {
  const { showToast } = useToast();
  const router = useRouter();

  return useMutation({
    mutationFn: ({
      uuid,
      assignmentId,
      submissionId,
    }: {
      uuid: string;
      assignmentId: number;
      submissionId: number;
    }) =>
      submissionApi.deleteSubmissionDetail(uuid, assignmentId, submissionId),
    onSuccess: (_, { uuid, assignmentId }) => {
      queryClient.invalidateQueries({
        queryKey: ['useGetSubmissionList', uuid, assignmentId],
      });
      router.replace(`/study/assignment/submission/${uuid}/${assignmentId}`);
      showToast({ type: 'success', message: '과제를 삭제하였습니다.' });
    },
    onError: () => {
      showToast({
        type: 'fail',
        message: TOAST_MESSAGE.fail,
      });
    },
  });
};
