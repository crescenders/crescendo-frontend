import SSRSafeSuspense from '@components/async/SSRSafeSuspense';
import MenuBar from '@components/common/MenuBar';
import PageLayout from '@components/common/PageLayout';
import ApprovedStudyList from '@components/mypage/ApprovedStudyList';
import DisApprovedStudyList from '@components/mypage/DisApprovedStudyList';
import ApplyStudySkeleton from '@components/skeleton/ApplyStudySkeleton';

const Apply = () => {
  return (
    <PageLayout>
      <MenuBar
        focusedPosition="right"
        leftText="스터디 현황"
        rightText="신청한 스터디"
        leftPath={'/mypage/status'}
      />
      <div className="mb-7 mt-12 flex flex-col px-[46px]">
        <h2 className="mb-10 text-18 font-bold text-text-secondary sm:text-2xl">
          승인된 스터디
        </h2>
        <SSRSafeSuspense fallback={<ApplyStudySkeleton />}>
          <ApprovedStudyList />
        </SSRSafeSuspense>
        <h2 className="mb-10 mt-[46px] font-bold text-text-secondary first-line:text-18 sm:text-2xl">
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