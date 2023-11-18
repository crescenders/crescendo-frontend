import AssignmentList from '@components/assignment/AssignmentList';
import SSRSafeSuspense from '@components/common/SSRSafeSuspense';
import MenuBar from '@components/common/MenuBar';
import PageLayout from '@components/common/PageLayout';
import ErrorBoundary from '@components/errorboundary/ErrorBoundary';
import ErrorFallback from '@components/errorboundary/ErrorFallback';
import AssignmentListSkeleton from '@components/skeleton/AssignmentListSkeleton';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { useRouter } from 'next/router';

const Assignment = () => {
  const router = useRouter();
  const uuid = String(router.query.id);
  const { reset } = useQueryErrorResetBoundary();

  return (
    <PageLayout>
      <div className="mb-9 mt-[105px] flex items-center justify-center">
        <MenuBar
          focusedPosition="center"
          leftText="정보 보기"
          centerText="과제 보기"
          rightText="멤버 보기"
          leftPath={`/study/detail/${uuid}`}
          rightPath={`/study/member/${uuid}`}
        />
      </div>
      <ErrorBoundary fallback={ErrorFallback} reset={reset}>
        <SSRSafeSuspense fallback={<AssignmentListSkeleton />}>
          <AssignmentList />
        </SSRSafeSuspense>
      </ErrorBoundary>
    </PageLayout>
  );
};

export default Assignment;
