import studyApi from '@apis/study/studyApi';
import useToast from '@hooks/useToast';
import { useMutation } from '@tanstack/react-query';

export const useDeleteStudy = () => {
  const { showToast } = useToast();

  return useMutation((id: string) => studyApi.deleteStudy(id), {
    onSuccess: () => {
      showToast({
        type: 'success',
        message: '성공적으로 글을 삭제했어요.',
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
