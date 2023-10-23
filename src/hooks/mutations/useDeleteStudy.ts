import studyApi from '@apis/study/studyApi';
import useToast from '@hooks/useToast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryClient } from 'pages/_app';

export const useDeleteStudy = () => {
  const { showToast } = useToast();

  return useMutation({
    mutationFn: (id: string) => studyApi.deleteStudy(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['useGetMyStudyGroupList'] });
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
