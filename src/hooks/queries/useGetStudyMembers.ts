import studyApi from '@apis/study/studyApi';
import { useQuery } from '@tanstack/react-query';

export type GetStudyMembersParamType = {
  uuid: string;
  isApproved?: boolean;
};

export const useGetStudyMembers = ({
  uuid,
  isApproved,
}: GetStudyMembersParamType) => {
  return useQuery({
    queryKey: ['useGetStudyMembers', isApproved],
    queryFn: () => studyApi.getStudyGroupMemberList({ uuid, isApproved }),
  });
};
