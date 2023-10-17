import ApplyBottomSheet from '@components/detail/ApplyBottomSheet';
import MenuBar from '@components/common/MenuBar';
import PageLayout from '@components/common/PageLayout';
import { useRouter } from 'next/router';
import { Suspense } from 'react';
import StudyDetailContent from '@components/detail/StudyDetailContent';
import tw from 'tailwind-styled-components';
import StudyDetailSkeleton from '@components/skeleton/StudyDetailSkeleton';

const StudyDetail = () => {
  const router = useRouter();
  const id = String(router.query.id);

  return (
    <PageLayout>
      <MenuWrapper>
        <MenuBar
          focusedPosition="left"
          leftText="정보 보기"
          centerText="과제 보기"
          rightText="멤버 보기"
          centerPath={`/study/detail/assignment/${id}`}
          rightPath={`/study/detail/member/${id}`}
        />
      </MenuWrapper>
      <Suspense fallback={<StudyDetailSkeleton />}>
        <StudyDetailContent />
      </Suspense>
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
