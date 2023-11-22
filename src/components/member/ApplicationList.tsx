import MemberCard from '@components/member/MemberCard';
import { useDeleteApplication } from '@hooks/mutations/useDeleteApplication';
import { usePostApproveApplication } from '@hooks/mutations/usePostApplication';
import { useGetApplications } from '@hooks/queries/useGetApplications';
import { useRouter } from 'next/router';

const ApplicationList = () => {
  const router = useRouter();
  const uuid = String(router.query.id);
  const { data: applications } = useGetApplications(uuid);
  const { mutate: approveApplication } = usePostApproveApplication();
  const { mutate: refuseApplication } = useDeleteApplication();

  return (
    <>
      {applications.length ? (
        applications.map(({ id, user, request_message }: Application) => (
          <MemberCard
            key={id}
            isCurrentUserLeader
            username={user.username}
            email={user.email}
            requestMessage={request_message}
            handleClickCheckButton={() => approveApplication({ uuid, id })}
            handleClickRefuseButton={() =>
              confirm(
                `거절한 신청은 복구할 수 없어요.\n그래도 ${user.username} 님의 신청을 거절하시겠어요?`,
              ) && refuseApplication({ uuid, id })
            }
          />
        ))
      ) : (
        <span className="absolute top-16 text-14 text-text-primary">
          참여 신청자가 없습니다.
        </span>
      )}
    </>
  );
};

export default ApplicationList;
