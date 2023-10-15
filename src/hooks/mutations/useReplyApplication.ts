import applicationApi from '@apis/application/applicationApi';
import useToast from '@hooks/useToast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export type managementParamType = {
  uuid: string;
  id: number;
};

export const useApproveApplication = () => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ uuid, id }: managementParamType) =>
      applicationApi.approveApplication(uuid, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['useGetApplications'] });
      showToast({
        type: 'success',
        message: '가입 요청을 승인했어요.',
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

export const useRefuseApplication = () => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ uuid, id }: managementParamType) =>
      applicationApi.refuseApplication(uuid, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['useGetApplications'] });
      showToast({
        type: 'success',
        message: '가입 요청을 거절했어요.',
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
