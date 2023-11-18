import assingmentApi from '@apis/assignment/assignmentApi';
import { useQuery, useSuspenseInfiniteQuery } from '@tanstack/react-query';

export const useGetAssignmentList = (uuid: string) => {
  return useSuspenseInfiniteQuery({
    queryKey: ['useGetAssignmentList', uuid],
    queryFn: ({ pageParam }) =>
      assingmentApi.getAssignmentList(pageParam, uuid),
    initialPageParam: '',
    getNextPageParam: ({ next }) => {
      return next ? next.split('?')[1] : undefined;
    },
  });
};

export const useGetAssignmentDetail = (uuid: string, id: number) => {
  return useQuery({
    queryKey: ['useGetAssignmentDetail', uuid, id],
    queryFn: () => assingmentApi.getAssignmentDetail(uuid, id),
    staleTime: 5 * 60 * 1000,
  });
};
