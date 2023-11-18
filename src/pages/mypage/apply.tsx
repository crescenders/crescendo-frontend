import SSRSafeSuspense from '@components/common/SSRSafeSuspense';
import MenuBar from '@components/common/MenuBar';
import PageLayout from '@components/common/PageLayout';
import ApprovedStudyList from '@components/mypage/ApprovedStudyList';
import DisApprovedStudyList from '@components/mypage/DisApprovedStudyList';
import ApplyStudySkeleton from '@components/skeleton/ApplyStudySkeleton';

const Apply = () => {
  return (
    <PageLayout>
      <div className="mt-[110px] flex justify-center">
        <MenuBar
          focusedPosition="right"
          leftText="스터디 현황"
          rightText="신청한 스터디"
          leftPath={'/mypage/status'}
        />
      </div>
      <div className="mb-7 mt-12 flex flex-col px-[46px]">
        <h2 className="mb-10 text-[24px] font-bold text-text-secondary">
          승인된 스터디
        </h2>
        <SSRSafeSuspense fallback={<ApplyStudySkeleton />}>
          <ApprovedStudyList />
        </SSRSafeSuspense>
        <h2 className="mb-10 mt-[46px] text-[24px] font-bold text-text-secondary">
          거절당한 스터디
        </h2>
        <SSRSafeSuspense fallback={<ApplyStudySkeleton />}>
          <DisApprovedStudyList />
        </SSRSafeSuspense>
      </div>
    </PageLayout>
  );
};

export default Apply;
