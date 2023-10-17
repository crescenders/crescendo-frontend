import applicationApi from '@apis/application/applicationApi';
import useToast from '@hooks/useToast';
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

type ApplyStudyParamType = {
  uuid: string;
  message: string;
};

type ErrorMessageType = {
  [key: string]: string[];
};

export const useApplyStudy = (): UseMutationResult<
  { request_message: string },
  AxiosError<ErrorMessageType>,
  ApplyStudyParamType
> => {
  const { showToast } = useToast();

  return useMutation({
    mutationFn: ({ uuid, message }) =>
      applicationApi.postApplication(uuid, message),
    onSuccess: () => {
      showToast({
        type: 'success',
        message: '신청이 완료되었습니다.',
      });
    },
    onError: (error) => {
      showToast({
        type: 'fail',
        message: error.response?.data['non_field_errors']
          ? '이미 신청한 스터디입니다.'
          : '오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      });
    },
  });
};
