import { Suspense } from 'react';
import { useRouter } from 'next/router';
import Loader from '@components/common/Loader';
import MenuBar from '@components/common/MenuBar';
import PageLayout from '@components/common/PageLayout';
import ErrorFallback from '@components/errorboundary/ErrorFallback';
import ErrorBoundary from '@components/errorboundary/ErrorBoundary';
import SubmissionDetailContent from '@components/detail/SubmissionDetailContent';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';

const SubmissionDetail = () => {
  const router = useRouter();
  const [uuid] = router.query.id as string[];
  const { reset } = useQueryErrorResetBoundary();

  return (
    <PageLayout>
      <div className="mt-[119px] flex flex-col items-center px-7">
        <MenuBar
          focusedPosition="center"
          leftText="정보 보기"
          centerText="과제 보기"
          rightText="멤버 보기"
          leftPath={`/study/detail/${uuid}`}
          centerPath={`/study/assignment/${uuid}`}
          rightPath={`/study/member/${uuid}`}
        />
      </div>
      <div className="mx-auto min-w-[550px]">
        <ErrorBoundary fallback={ErrorFallback} reset={reset}>
          <Suspense fallback={<Loader isFull />}>
            <SubmissionDetailContent />
          </Suspense>
        </ErrorBoundary>
      </div>
    </PageLayout>
  );
};

export default SubmissionDetail;
