import { useGetStudyMembers } from '@hooks/queries/useGetStudyMembers';
import MemberCard from '@components/member/MemberCard';
import { useRouter } from 'next/router';
import { useDeleteMember } from '@hooks/mutations/useDeleteMember';
import Image from 'next/image';

const MemberList = () => {
  const router = useRouter();
  const uuid = String(router.query.id);
  const { data: members, isError, error } = useGetStudyMembers(uuid);
  const { mutate: deleteMember } = useDeleteMember();

  if (isError && error.response?.status === 403) {
    return (
      <div className="absolute top-10 flex w-full select-none flex-col items-center justify-center gap-8">
        <Image src="/svg/clear_button.svg" width={60} height={60} alt="" />
        <span className="text-14 text-text-primary">
          스터디 그룹 멤버만 확인할 수 있어요.
        </span>
      </div>
    );
  }

  return (
    <>
      {members?.length ? (
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
