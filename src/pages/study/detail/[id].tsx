import ApplyBottomSheet from '@components/detail/ApplyBottomSheet';
import MenuBar from '@components/common/MenuBar';
import PageLayout from '@components/common/PageLayout';
import { useRouter } from 'next/router';
import { Suspense } from 'react';
import StudyDetailContent from '@components/detail/StudyDetailContent';
import tw from 'tailwind-styled-components';
import StudyDetailSkeleton from '@components/skeleton/StudyDetailSkeleton';
import ErrorBoundary from '@components/errorboundary/ErrorBoundary';
import ErrorFallback from '@components/errorboundary/ErrorFallback';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';

const StudyDetail = () => {
  const router = useRouter();
  const id = String(router.query.id);
  const { reset } = useQueryErrorResetBoundary();

  return (
    <PageLayout>
      <MenuWrapper>
        <MenuBar
          focusedPosition="left"
          leftText="정보 보기"
          centerText="과제 보기"
          rightText="멤버 보기"
          centerPath={`/study/assignment/${id}`}
          rightPath={`/study/member/${id}`}
        />
      </MenuWrapper>
      <ErrorBoundary fallback={ErrorFallback} reset={reset}>
        <Suspense fallback={<StudyDetailSkeleton />}>
          <StudyDetailContent />
        </Suspense>
      </ErrorBoundary>
      <ApplyBottomSheet />
    </PageLayout>
  );
};

export default StudyDetail;

const MenuWrapper = tw.div`
  mt-[105px]
  flex
  justify-center
`;
