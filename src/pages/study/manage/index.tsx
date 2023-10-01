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
    <PageLayout className="flex flex-col items-center">
      <TitleArea>
        <Title>내가 맡은 스터디</Title>
      </TitleArea>
      <StudyListArea>
        <Suspense fallback={<MyStudyListSkeleton />}>
          <MyStudyList />
        </Suspense>
        <Button
          className="h-9 w-[134px]"
          text="스터디 개설하기"
          onClick={() => router.push('/study/create')}
        />
      </StudyListArea>
    </PageLayout>
  );
};

export default StudyManage;

const Title = tw.span`
  text-20
  font-bold
`;

const TitleArea = tw.div`
  w-[100%]
  pl-48
  pt-[125px]
`;

const StudyListArea = tw.div`
  flex
  grow
  flex-col
  items-center
  justify-between
  gap-y-5
  py-5
`;
