import MemberCard from '@components/member/MemberCard';
import { useGetStudyMembers } from '@hooks/queries/useGetStudyMembers';
import { useDeleteMember } from '@hooks/mutations/useDeleteMember';
import { userState } from '@recoil/auth';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import Image from 'next/image';

const MemberList = () => {
  const router = useRouter();
  const uuid = String(router.query.id);
  const { username } = useRecoilValue(userState);
  const { data: members, isError, error } = useGetStudyMembers(uuid);
  const { mutate: deleteMember } = useDeleteMember();

  const compareMembers = (a: Member, b: Member) => {
    if (a.is_leader && !b.is_leader) return -1;
    if (!a.is_leader && b.is_leader) return 1;
    return 0;
  };

  const checkIsLeader = () => {
    const leaders = members?.filter((member) => member.is_leader)[0];

    return leaders?.user.username === username;
  };

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
        members
          .sort(compareMembers)
          .map(({ id, user, is_leader }: Member) => (
            <MemberCard
              key={id}
              username={user.username}
              isLeader={is_leader}
              isCurrentUserLeader={checkIsLeader()}
              handleClickRefuseButton={() =>
                confirm(
                  `추방한 멤버는 복구할 수 없어요.\n정말로 ${user.username} 님을 추방하시겠어요?`,
                ) && deleteMember({ uuid, id })
              }
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
