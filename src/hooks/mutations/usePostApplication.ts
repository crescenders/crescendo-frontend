import applicationApi from '@apis/application/applicationApi';
import { TOAST_MESSAGE } from '@constants/index';
import { useToast } from '@providers/ToastProvider';
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

export type ApplicationParamType = {
  uuid: string;
  id: number;
  message: string;
};

export const usePostApplication = (): UseMutationResult<
  { request_message: string },
  unknown,
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
  });
};

export const usePostApproveApplication = () => {
  const queryClient = useQueryClient();
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
        message: TOAST_MESSAGE.fail,
      });
    },
  });
};
