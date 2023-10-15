import { useGetStudyMembers } from '@hooks/queries/useGetStudyMembers';
import MemberCard from '@components/member/MemberCard';
import { useRouter } from 'next/router';
import { useDeleteMember } from '@hooks/mutations/useDeleteMember';

const MemberList = () => {
  const router = useRouter();
  const uuid = String(router.query.id);
  const { data: members } = useGetStudyMembers(uuid);
  const { mutate: deleteMember } = useDeleteMember();

  return (
    <>
      {members.length ? (
        members.map(({ id, user, is_leader }: Member) => (
          <MemberCard
            key={id}
            username={user.username}
            isLeader={is_leader}
            handleClickCrossButton={() => deleteMember({ uuid, id })}
          />
        ))
      ) : (
        <span className="absolute top-16 text-14 text-text-primary">
          현재 참여하고 있는 스터디원이 없습니다.
        </span>
      )}
    </>
  );
};

export default MemberList;
