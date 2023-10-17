import applicationApi from '@apis/application/applicationApi';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetApplications = (id: string) => {
  return useSuspenseQuery({
    queryKey: ['useGetApplications', id],
    queryFn: () => applicationApi.getApplicationList(id),
  });
};
