import PageLayout from '@components/common/PageLayout';
import MenuBar from '@components/common/MenuBar';
import Link from 'next/link';
import StudyInProgressList from '@components/mypage/StudyInProgressList';
import PendingApprovalList from '@components/mypage/PendingApprovalList';
import StatusStudySkeleton from '@components/skeleton/StatusStudySkeleton';
import SSRSafeSuspense from '@components/common/SSRSafeSuspense';

const Status = () => {
  return (
    <PageLayout>
      <div className="mt-[110px] flex justify-center">
        <MenuBar
          focusedPosition="left"
          leftText="스터디 현황"
          rightText="신청한 스터디"
          rightPath={'/mypage/apply'}
        />
      </div>
      <div className="mt-12 flex flex-col px-[46px] ">
        <div className="flex items-center justify-between">
          <h2 className="mb-10 text-[24px] font-bold text-text-secondary">
            진행 중인 스터디
          </h2>
          <Link href={'/mypage/manage'}>
            <span className="text-12 font-normal">내가 맡은 스터디 관리</span>
          </Link>
        </div>
        <SSRSafeSuspense fallback={<StatusStudySkeleton />}>
          <StudyInProgressList />
        </SSRSafeSuspense>
        <h2 className="mb-10 mt-[46px] text-[24px] font-bold text-text-secondary">
          승인 대기 중 스터디
        </h2>
        <SSRSafeSuspense fallback={<StatusStudySkeleton />}>
          <PendingApprovalList />
        </SSRSafeSuspense>
      </div>
    </PageLayout>
  );
};

export default Status;
