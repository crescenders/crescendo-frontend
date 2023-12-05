import AssignmentList from '@components/assignment/AssignmentList';
import AsyncBoundary from '@components/async/AsyncBoundary';
import MenuBar from '@components/common/MenuBar';
import PageLayout from '@components/common/PageLayout';
import AssignmentListSkeleton from '@components/skeleton/AssignmentListSkeleton';
import { useRouter } from 'next/router';

const Assignment = () => {
  const router = useRouter();
  const uuid = String(router.query.id);

  return (
    <PageLayout>
      <MenuBar
        focusedPosition="center"
        leftText="정보 보기"
        centerText="과제 보기"
        rightText="멤버 보기"
        leftPath={`/study/detail/${uuid}`}
        rightPath={`/study/member/${uuid}`}
      />
      <AsyncBoundary suspenseFallback={<AssignmentListSkeleton />}>
        <AssignmentList />
      </AsyncBoundary>
    </PageLayout>
  );
};

export default Assignment;