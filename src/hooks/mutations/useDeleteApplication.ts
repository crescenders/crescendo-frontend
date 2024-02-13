import applicationApi from '@apis/application/applicationApi';
import { useToast } from '@providers/ToastProvider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApplicationParamType } from '@hooks/mutations/usePostApplication';

export const useDeleteApplication = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: ({ uuid, id }: Omit<ApplicationParamType, 'message'>) =>
      applicationApi.deleteApplication(uuid, id),
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
        message: '가입 요청을 거절했어요.',
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
