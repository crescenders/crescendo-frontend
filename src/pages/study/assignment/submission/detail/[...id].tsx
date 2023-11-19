import { useRouter } from 'next/router';
import MenuBar from '@components/common/MenuBar';
import PageLayout from '@components/common/PageLayout';
import SubmissionDetailContent from '@components/detail/SubmissionDetailContent';
import ErrorBoundary from '@components/errorboundary/ErrorBoundary';
import SSRSafeSuspense from '@components/common/SSRSafeSuspense';
import Loader from '@components/common/Loader';
import ErrorFallback from '@components/errorboundary/ErrorFallback';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';

const SubmissionDetail = () => {
  const router = useRouter();
  const [uuid] = (router.query.id as string[]) || [''];
  const { reset } = useQueryErrorResetBoundary();

  return (
    <PageLayout>
      <div className="mx-auto mt-[119px] flex w-full max-w-[640px] grow flex-col items-center px-7">
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
          <SSRSafeSuspense fallback={<Loader isFull />}>
            <SubmissionDetailContent />
          </SSRSafeSuspense>
        </ErrorBoundary>
      </div>
    </PageLayout>
  );
};

export default SubmissionDetail;
