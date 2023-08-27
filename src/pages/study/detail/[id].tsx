import ApplyBottomSheet from '@components/detail/ApplyBottomSheet';
import Loader from '@components/common/Loader';
import MenuBar from '@components/common/MenuBar';
import PageLayout from '@components/common/PageLayout';
import { useRouter } from 'next/router';
import { Suspense } from 'react';
import StudyDetailContent from '@components/detail/StudyDetailContent';
import tw from 'tailwind-styled-components';

const StudyDetail = () => {
  const router = useRouter();
  const id = Number(router.query.id);

  return (
    <PageLayout>
      <MenuWrapper>
        <MenuBar
          focusedPosition="left"
          leftText="정보 보기"
          rightText="과제 보기"
          path={`/study/detail/assignment/${id}`}
        />
      </MenuWrapper>
      {/* TODO: 스켈레톤으로 대체 */}
      <Suspense fallback={<Loader isFull />}>
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
