import studyApi from '@apis/study/studyApi';
import useToast from '@hooks/useToast';
import { useMutation } from 'react-query';

export const useCreateStudy = () => {
  const { showToast } = useToast();

  return useMutation((formData: FormData) => studyApi.createStudy(formData), {
    onSuccess: () => {
      showToast({
        type: 'success',
        message: '글을 작성했어요.',
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
