import { Suspense } from 'react';
import { useRouter } from 'next/router';
import tw from 'tailwind-styled-components';
import Button from '@components/common/Button';
import MenuBar from '@components/common/MenuBar';
import PageLayout from '@components/common/PageLayout';
import SubmissionList from '@components/submission/SubmissionList';
import SubmissionListSkeleton from '@components/skeleton/SubmissionListSkeleton';
import { useGetStudyDetail } from '@hooks/queries/useGetStudy';
import ErrorBoundary from '@components/errorboundary/ErrorBoundary';
import ErrorFallback from '@components/errorboundary/ErrorFallback';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';

const Submission = () => {
  const router = useRouter();
  const [uuid, id] = router.query.id as string[];
  const { data: study } = useGetStudyDetail(uuid);
  const { reset } = useQueryErrorResetBoundary();

  return (
    <PageLayout>
      <MenuWrapper>
        <MenuBar
          focusedPosition="center"
          leftText="정보 보기"
          centerText="과제 보기"
          rightText="멤버 보기"
          leftPath={`/study/detail/${uuid}`}
          centerPath={`/study/assignment/${uuid}`}
          rightPath={`/study/member/${uuid}`}
        />
      </MenuWrapper>
      <ErrorBoundary fallback={ErrorFallback} reset={reset}>
        <StudyTitle>{study.study_name}</StudyTitle>
        <Container>
          <Suspense fallback={<SubmissionListSkeleton />}>
            <SubmissionList />
          </Suspense>
          <Button
            text="과제 제출하기"
            className="fixed bottom-11 h-9 w-[143px]"
            onClick={() => router.push(`/`)} // TODO: 과제 제출 페이지로 이동
          />
        </Container>
      </ErrorBoundary>
    </PageLayout>
  );
};

export default Submission;

const MenuWrapper = tw.div`
  mt-[105px]
  flex
  justify-center
`;

const StudyTitle = tw.h1`
  text-text-secondary
  mx-8
  mb-[23px]
  mt-9
  text-center
  text-[24px]
  font-bold
`;

const Container = tw.div`
  flex
  flex-col
  items-center
  pb-[80px]
`;
