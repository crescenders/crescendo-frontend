import Button from '@components/common/Button';
import PageLayout from '@components/common/PageLayout';
import MyStudyList from '@components/manage/MyStudyList';
import MyStudyListSkeleton from '@components/skeleton/MyStudyListSkeleton';
import { useRouter } from 'next/router';
import { Suspense } from 'react';
import tw from 'tailwind-styled-components';

const StudyManage = () => {
  const router = useRouter();

  return (
    <PageLayout>
      <Container>
        <TitleArea>
          <Title>내가 맡은 스터디</Title>
        </TitleArea>
        <StudyListArea>
          <Suspense fallback={<MyStudyListSkeleton />}>
            <MyStudyList />
          </Suspense>
          <Button
            className="fixed bottom-11 h-9 w-[134px]"
            text="스터디 개설하기"
            onClick={() => router.push('/create')}
          />
        </StudyListArea>
      </Container>
    </PageLayout>
  );
};

export default StudyManage;

const Container = tw.div`
  flex
  w-full
  flex-col
  items-start
  justify-start
  px-7
  pt-[125px]
`;

const Title = tw.div`
  text-20
  w-[645px]
  font-bold
`;

const TitleArea = tw.div`
  flex
  w-full
  justify-center
`;

const StudyListArea = tw.div`
  flex
  w-full
  grow
  flex-col
  items-center
  justify-between
  gap-y-5
  py-5
`;
