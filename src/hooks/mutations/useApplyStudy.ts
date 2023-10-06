import studyApi from '@apis/study/studyApi';
import useToast from '@hooks/useToast';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

type ApplyStudyParamType = {
  uuid: string;
  message: string;
};

type ErrorMessageType = {
  [key: string]: string[];
};

export const useApplyStudy = () => {
  const { showToast } = useToast();

  return useMutation({
    mutationFn: ({ uuid, message }: ApplyStudyParamType) =>
      studyApi.applyStudyGroup(uuid, message),
    onSuccess: () => {
      showToast({
        type: 'success',
        message: '신청이 완료되었습니다.',
      });
    },
    onError: (error: AxiosError) => {
      const errorMessage = error.response?.data as ErrorMessageType;
      showToast({
        type: 'fail',
        message: errorMessage.non_field_errors
          ? '이미 신청한 스터디입니다.'
          : '오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      });
    },
    throwOnError: false,
  });
};
