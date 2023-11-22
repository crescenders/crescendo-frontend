import memberApi from '@apis/member/memberApi';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetStudyMembers = (id: string) => {
  return useSuspenseQuery({
    queryKey: ['useGetStudyMembers', id],
    queryFn: () => memberApi.getMemberList(id),
  });
};
