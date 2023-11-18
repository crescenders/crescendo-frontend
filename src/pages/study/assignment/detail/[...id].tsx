import MenuBar from '@components/common/MenuBar';
import PageLayout from '@components/common/PageLayout';
import AssignmentDetailContent from '@components/detail/AssignmentDetailContent';
import { useRouter } from 'next/router';

const AssignmentDetail = () => {
  const router = useRouter();
  const [uuid, id] = (router.query.id as string[]) || [];

  return (
    <PageLayout>
      <div className="mt-[105px] flex h-full flex-col items-center px-7">
        <MenuBar
          focusedPosition="center"
          leftText="정보 보기"
          centerText="과제 보기"
          rightText="멤버 보기"
          leftPath={`/study/detail/${uuid}`}
          centerPath={`/study/assignment/${uuid}`}
          rightPath={`/study/member/${uuid}`}
        />
        <AssignmentDetailContent />
      </div>
    </PageLayout>
  );
};

export default AssignmentDetail;
