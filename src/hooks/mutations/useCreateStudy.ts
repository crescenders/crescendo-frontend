import studyApi from '@apis/study/studyApi';
import { useToast } from '@providers/ToastProvider';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export const useCreateStudy = () => {
  const { showToast } = useToast();
  const router = useRouter();

  return useMutation({
    mutationFn: (formData: FormData) => studyApi.createStudy(formData),
    onSuccess: ({ uuid }) => {
      router.push(`/study/detail/${uuid}`);
      showToast({
        type: 'success',
        message: '글을 작성했어요.',
      });
    },
  });
};
