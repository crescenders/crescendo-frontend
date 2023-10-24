import MenuBar from '@components/common/MenuBar';
import PageLayout from '@components/common/PageLayout';
import ApprovedStudyList from '@components/mypage/ApprovedStudyList';
import DisApprovedStudyList from '@components/mypage/DisApprovedStudyList';

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
        <h2 className="text-[24px] font-bold text-text-secondary">
          승인된 스터디
        </h2>
        <ApprovedStudyList />
        <h2 className="mt-[46px] text-[24px] font-bold text-text-secondary">
          거절당한 스터디
        </h2>
        <DisApprovedStudyList />
      </div>
    </PageLayout>
  );
};

export default Apply;
