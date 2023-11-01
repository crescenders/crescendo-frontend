import applicationApi from '@apis/application/applicationApi';
import useToast from '@hooks/useToast';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from 'pages/_app';

export type managementParamType = {
  uuid: string;
  id: number;
};

export const useApproveApplication = () => {
  const { showToast } = useToast();

  return useMutation({
    mutationFn: ({ uuid, id }: managementParamType) =>
      applicationApi.approveApplication(uuid, id),
    onMutate: (param) => {
      queryClient.cancelQueries({
        queryKey: ['useGetApplications', param.uuid],
      });

      const prevData = queryClient.getQueryData([
        'useGetApplications',
        param.uuid,
      ]) as Member[];
      const optimisticData: Member[] = prevData.filter(
        (data) => data.id !== param.id,
      );

      queryClient.setQueryData(
        ['useGetApplications', param.uuid],
        optimisticData,
      );

      showToast({
        type: 'success',
        message: '가입 요청을 승인했어요.',
      });
      return { prevData, optimisticData };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['useGetApplications'] });
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

  return useMutation({
    mutationFn: ({ uuid, id }: managementParamType) =>
      applicationApi.refuseApplication(uuid, id),
    onMutate: (param) => {
      queryClient.cancelQueries({
        queryKey: ['useGetApplications', param.uuid],
      });

      const prevData = queryClient.getQueryData([
        'useGetApplications',
        param.uuid,
      ]) as Member[];
      const optimisticData: Member[] = prevData.filter(
        (data) => data.id !== param.id,
      );

      queryClient.setQueryData(
        ['useGetApplications', param.uuid],
        optimisticData,
      );
      showToast({
        type: 'success',
        message: '가입 요청을 거절했어요.',
      });
      return { prevData, optimisticData };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['useGetApplications'] });
    },
    onError: (_error, _param, context) => {
      queryClient.setQueryData(['useGetStudyMembers'], context?.prevData);
      showToast({
        type: 'fail',
        message: '오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      });
    },
  });
};
