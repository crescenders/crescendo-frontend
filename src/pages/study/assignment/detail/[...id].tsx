import Loader from '@components/common/Loader';
import MenuBar from '@components/common/MenuBar';
import PageLayout from '@components/common/PageLayout';
import AssignmentDetailContent from '@components/detail/AssignmentDetailContent';
import { useRouter } from 'next/router';
import { Suspense } from 'react';
import ErrorFallback from '@components/errorboundary/ErrorFallback';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import ErrorBoundary from '@components/errorboundary/ErrorBoundary';

const AssignmentDetail = () => {
  const router = useRouter();
  const [uuid, id] = router.query.id as string[];
  const { reset } = useQueryErrorResetBoundary();

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
        <ErrorBoundary fallback={ErrorFallback} reset={reset}>
          <Suspense fallback={<Loader isFull />}>
            <AssignmentDetailContent />
          </Suspense>
        </ErrorBoundary>
      </div>
    </PageLayout>
  );
};

export default AssignmentDetail;
