import submissionApi from '@apis/submission/submissionApi';
import { TOAST_MESSAGE } from '@constants/index';
import useToast from '@hooks/useToast';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { queryClient } from 'pages/_app';

export const usePostSubmission = () => {
  const { showToast } = useToast();
  const router = useRouter();

  return useMutation({
    mutationFn: ({
      uuid,
      id,
      title,
      content,
    }: Pick<SubmissionDetail, 'id' | 'title' | 'content'> & {
      uuid: string;
    }) => submissionApi.postSubmissionDetail(uuid, id, title, content),
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
    onError: (error: AxiosError) => {
      const errorMessage = JSON.stringify(error.response?.data);
      showToast({
        type: 'fail',
        message: errorMessage.includes('already submitted')
          ? '이미 과제를 제출하였습니다.'
          : TOAST_MESSAGE.fail,
      });
    },
  });
};
