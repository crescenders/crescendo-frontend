import MenuBar from '@components/common/MenuBar';
import PageLayout from '@components/common/PageLayout';
import { useRouter } from 'next/router';

const StudyDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <PageLayout>
      <div className="mt-[105px] flex justify-center">
        <MenuBar
          focusedPosition="left"
          leftText="정보 보기"
          rightText="과제 보기"
          path={`/studyDetail/assignment/${id}`}
        />
      </div>
    </PageLayout>
  );
};

export default StudyDetail;
