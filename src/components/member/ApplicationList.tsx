import MemberCard from '@components/member/MemberCard';
import DeleteMemberModal from '@components/modal/DeleteMemberModal';
import MemberModal from '@components/modal/MemberModal';
import {
  useApproveApplication,
  useRefuseApplication,
} from '@hooks/mutations/useReplyApplication';
import { useGetApplications } from '@hooks/queries/useGetApplications';
import useModal from '@hooks/useModal';
import { useRouter } from 'next/router';

const ApplicationList = () => {
  const router = useRouter();
  const uuid = String(router.query.id);
  const { openModal } = useModal();
  const { data: applications } = useGetApplications(uuid);
  const { mutate: approveApplication } = useApproveApplication();
  const { mutate: refuseApplication } = useRefuseApplication();

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
            handleClickRefuseButton={() => {
              openModal(
                <DeleteMemberModal
                  handleClick={() => {
                    refuseApplication({ uuid, id });
                    openModal(<MemberModal title="참여 신청자" />);
                  }}
                  title="신청 거절"
                  firstText="거절한 신청은 복구할 수 없어요."
                  secondText={`그래도 ${user.username} 님의 신청을 거절하시겠어요?`}
                />,
              );
            }}
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
