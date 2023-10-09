import { useGetStudyMembers } from '@hooks/queries/useGetStudyMembers';
import MemberCard from './MemberCard';

type MemberListProps = {
  uuid: string;
  isApproved: boolean;
};

const MemberList = ({ uuid, isApproved }: MemberListProps) => {
  const { data: members } = useGetStudyMembers({ uuid, isApproved });

  return (
    <>
      {members?.length ? (
        members?.map((member: StudyGroupMember) => (
          <MemberCard
            key={member.id}
            username={member.user.username}
            isLeader={member.is_leader}
            handleClickCheckButton={() => alert('신청 승인')}
            handleClickCrossButton={() => alert('신청 거절 또는 추방')}
            {...(!isApproved && {
              email: member.user.email,
              requestMessage: member.request_message,
            })}
          />
        ))
      ) : (
        <span className="absolute top-16 text-14 text-text-primary">
          {isApproved
            ? '현재 참여하고 있는 스터디원이 없습니다.'
            : '참여 신청자가 없습니다.'}
        </span>
      )}
    </>
  );
};

export default MemberList;
