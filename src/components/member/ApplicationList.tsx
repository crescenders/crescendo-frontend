import MemberCard from '@components/member/MemberCard';
import {
  useApproveApplication,
  useRefuseApplication,
} from '@hooks/mutations/useReplyApplication';
import { useGetApplications } from '@hooks/queries/useGetApplications';
import { useRouter } from 'next/router';

const ApplicationList = () => {
  const router = useRouter();
  const uuid = String(router.query.id);
  const { data: applications } = useGetApplications(uuid);
  const { mutate: approveApplication } = useApproveApplication();
  const { mutate: refuseApplication } = useRefuseApplication();

  return (
    <>
      {applications.length ? (
        applications.map(({ id, user, request_message }: Application) => (
          <MemberCard
            key={id}
            username={user.username}
            email={user.email}
            requestMessage={request_message}
            handleClickCheckButton={() => approveApplication({ uuid, id })}
            handleClickCrossButton={() => refuseApplication({ uuid, id })}
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
