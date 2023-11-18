import submissionApi from '@apis/submission/submissionApi';
import { useQuery, useSuspenseInfiniteQuery } from '@tanstack/react-query';

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

export const useGetSubmissionDetail = (
  uuid: string,
  assignmentId: number,
  submissionId: number,
) => {
  return useQuery({
    queryKey: ['useGetSubmissionDetail', uuid, assignmentId, submissionId],
    queryFn: () =>
      submissionApi.getSubmissionDetail(uuid, assignmentId, submissionId),
    enabled: !!uuid && !!assignmentId && !!submissionId,
  });
};
