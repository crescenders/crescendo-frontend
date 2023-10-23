import assingmentApi from '@apis/assignment/assignmentApi';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

export const useGetAssignment = (uuid: string) => {
  return useQuery({
    queryKey: ['useGetAssignment', uuid],
    queryFn: () => assingmentApi.getAssignmentList(uuid),
  });
};

export const useGetAssignmentDetail = (uuid: string, id: number) => {
  return useSuspenseQuery({
    queryKey: ['useGetAssignmentDetail', uuid, id],
    queryFn: () => assingmentApi.getAssignmentDetail(uuid, id),
    staleTime: 5 * 60 * 1000,
  });
};
