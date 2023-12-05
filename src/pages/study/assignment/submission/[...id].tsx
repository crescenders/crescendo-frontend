import { useRouter } from 'next/router';
import Button from '@components/common/Button';
import MenuBar from '@components/common/MenuBar';
import PageLayout from '@components/common/PageLayout';
import SubmissionList from '@components/submission/SubmissionList';
import SubmissionListSkeleton from '@components/skeleton/SubmissionListSkeleton';
import { useGetStudyDetail } from '@hooks/queries/useGetStudy';
import SSRSafeSuspense from '@components/async/SSRSafeSuspense';

const Submission = () => {
  const router = useRouter();
  const [uuid, id] = (router.query.id as string[]) || [];
  const { data: study } = useGetStudyDetail(uuid);

  return (
    <PageLayout>
      <MenuBar
        focusedPosition="center"
        leftText="정보 보기"
        centerText="과제 보기"
        rightText="멤버 보기"
        leftPath={`/study/detail/${uuid}`}
        centerPath={`/study/assignment/${uuid}`}
        rightPath={`/study/member/${uuid}`}
      />
      <h1 className="mx-8 mb-[23px] mt-9 text-center text-[24px] font-bold text-text-secondary">
        {study?.study_name}
      </h1>
      <div className="flex flex-col items-center pb-[80px]">
        <SSRSafeSuspense fallback={<SubmissionListSkeleton />}>
          <SubmissionList />
        </SSRSafeSuspense>
        <Button
          text="과제 제출하기"
          className="fixed bottom-11 h-9 w-[143px]"
          onClick={() =>
            router.push(`/study/assignment/submission/submit/${uuid}/${id}/`)
          }
        />
      </div>
    </PageLayout>
  );
};

export default Submission;