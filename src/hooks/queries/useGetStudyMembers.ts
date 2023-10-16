import memberApi from '@apis/member/memberApi';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useGetStudyMembers = (
  id: string,
): UseQueryResult<Member[], AxiosError> => {
  return useQuery({
    queryKey: ['useGetStudyMembers', id],
    queryFn: () => memberApi.getMemberList(id),
    throwOnError: false,
  });
};
