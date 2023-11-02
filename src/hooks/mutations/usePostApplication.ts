import applicationApi from '@apis/application/applicationApi';
import useToast from '@hooks/useToast';
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { queryClient } from 'pages/_app';
import { AxiosError } from 'axios';

type ErrorMessageType = {
  [key: string]: string[];
};

export type ApplicationParamType = {
  uuid: string;
  id: number;
  message: string;
};

export const usePostApplication = (): UseMutationResult<
  { request_message: string },
  AxiosError<ErrorMessageType>,
  Omit<ApplicationParamType, 'id'>
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

export const usePostApplicationApprove = () => {
  const { showToast } = useToast();

  return useMutation({
    mutationFn: ({ uuid, id }: Omit<ApplicationParamType, 'message'>) =>
      applicationApi.postApproveApplication(uuid, id),
    onMutate: async (param) => {
      await queryClient.cancelQueries({
        queryKey: ['useGetApplications', param.uuid],
      });

      const prevData = queryClient.getQueryData<Application[]>([
        'useGetApplications',
        param.uuid,
      ]);
      const optimisticData = prevData?.filter((data) => data.id !== param.id);

      queryClient.setQueryData(
        ['useGetApplications', param.uuid],
        optimisticData,
      );
      showToast({
        type: 'success',
        message: '가입 요청을 승인했어요.',
      });
      return { prevData };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['useGetApplications'] });
    },
    onError: (_error, param, context) => {
      queryClient.setQueryData(
        ['useGetApplications', param.uuid],
        context?.prevData,
      );
      showToast({
        type: 'fail',
        message: '오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      });
    },
  });
};
