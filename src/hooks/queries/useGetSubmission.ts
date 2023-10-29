import submissionApi from '@apis/submission/submissionApi';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

export const useGetSubmissionList = (uuid: string, id: number) => {
  return useSuspenseInfiniteQuery({
    queryKey: ['useGetSubmissionList', uuid, id],
    queryFn: ({ pageParam }) =>
      submissionApi.getSubmissionList(uuid, id, pageParam),
    initialPageParam: '',
    getNextPageParam: (lastPage) => {
      return lastPage.next ? lastPage.next.split('?')[1] : undefined;
    },
  });
};
