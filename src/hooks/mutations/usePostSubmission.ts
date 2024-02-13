import submissionApi from '@apis/submission/submissionApi';
import { TOAST_MESSAGE } from '@constants/index';
import { useToast } from '@providers/ToastProvider';
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';

export const usePostSubmission = (): UseMutationResult<
  Pick<SubmissionDetail, 'title' | 'content'>,
  AxiosError<TNonFieldError>,
  Pick<SubmissionDetail, 'id' | 'title' | 'content'> & {
    uuid: string;
  }
> => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const router = useRouter();

  return useMutation({
    mutationFn: ({ uuid, id, title, content }) =>
      submissionApi.postSubmissionDetail(uuid, id, title, content),
    onSuccess: (_, { uuid, id }) => {
      queryClient.invalidateQueries({
        queryKey: ['useGetSubmissionList', uuid, id],
      });
      router.replace(`/study/assignment/submission/${uuid}/${id}/`);
      showToast({
        type: 'success',
        message: '과제를 제출하였습니다.',
      });
    },
    onError: (error) => {
      showToast({
        type: 'fail',
        message: error.response?.data.non_field_errors || TOAST_MESSAGE.fail,
      });
    },
  });
};
