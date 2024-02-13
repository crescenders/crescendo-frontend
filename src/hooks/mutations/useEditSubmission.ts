import submissionApi from '@apis/submission/submissionApi';
import { useToast } from '@providers/ToastProvider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export const usePutSubmissionDetail = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const router = useRouter();

  return useMutation({
    mutationFn: ({
      uuid,
      assignmentId,
      submissionId,
      title,
      content,
    }: Pick<SubmissionDetail, 'title' | 'content'> & {
      uuid: string;
      assignmentId: number;
      submissionId: number;
    }) =>
      submissionApi.putSubmissionDetail(
        uuid,
        assignmentId,
        submissionId,
        title,
        content,
      ),
    onSuccess: (_, { uuid, assignmentId, submissionId }) => {
      queryClient.invalidateQueries({
        queryKey: ['useGetSubmissionDetail', uuid, assignmentId, submissionId],
      });
      router.replace(
        `/study/assignment/submission/detail/${uuid}/${assignmentId}/${submissionId}`,
      );
      showToast({
        type: 'success',
        message: '과제를 수정하였습니다.',
      });
    },
  });
};

export const usePatchSubmissionDetail = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const router = useRouter();

  return useMutation({
    mutationFn: ({
      uuid,
      assignmentId,
      submissionId,
      data,
    }: {
      uuid: string;
      assignmentId: number;
      submissionId: number;
      data: Partial<SubmissionDetail>;
    }) =>
      submissionApi.patchSubmissionDetail(
        uuid,
        assignmentId,
        submissionId,
        data,
      ),
    onSuccess: (_, { uuid, assignmentId, submissionId }) => {
      queryClient.invalidateQueries({
        queryKey: ['useGetSubmissionDetail', uuid, assignmentId, submissionId],
      });
      router.replace(
        `/study/assignment/submission/detail/${uuid}/${assignmentId}/${submissionId}`,
      );
      showToast({
        type: 'success',
        message: '과제를 수정하였습니다.',
      });
    },
    // onError: () =>
    //   showToast({
    //     type: 'fail',
    //     message: TOAST_MESSAGE.fail,
    //   }),
  });
};
