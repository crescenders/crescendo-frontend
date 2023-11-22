import Button from '@components/common/Button';
import PageLayout from '@components/common/PageLayout';
import MyStudyList from '@components/manage/MyStudyList';
import MyStudyListSkeleton from '@components/skeleton/MyStudyListSkeleton';
import { useRouter } from 'next/router';
import { Suspense } from 'react';

const StudyManage = () => {
  const router = useRouter();

  return (
    <PageLayout>
      <div className="flex min-h-full w-full flex-col items-start justify-start px-7 pt-[125px]">
        <div className="flex w-full justify-center">
          <h1 className="w-[645px] text-20 font-bold">내가 맡은 스터디</h1>
        </div>
        <div className="flex w-full grow flex-col items-center justify-between gap-y-5 pb-28 pt-5">
          <Suspense fallback={<MyStudyListSkeleton />}>
            <MyStudyList />
          </Suspense>
          <Button
            className="fixed bottom-11 h-9 w-[134px]"
            text="스터디 개설하기"
            onClick={() => router.push('/create')}
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default StudyManage;
