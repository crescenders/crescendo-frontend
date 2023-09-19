import studyApi from '@apis/study/studyApi';
import useToast from '@hooks/useToast';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export type EditStudyParamType = {
  id: string;
  formData: FormData;
};

export const useEditStudy = () => {
  const { showToast } = useToast();
  const router = useRouter();

  return useMutation(
    ({ id, formData }: EditStudyParamType) => studyApi.editStudy(id, formData),
    {
      onSuccess: (_, { id }) => {
        router.replace(`/study/detail/${id}`);
        showToast({
          type: 'success',
          message: '글을 수정했어요.',
        });
      },
      onError: () => {
        showToast({
          type: 'fail',
          message: '오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        });
      },
    },
  );
};
