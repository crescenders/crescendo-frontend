import Button from '@components/common/Button';
import ProgressBar from '@components/common/ProgressBar';
import AssignmentCard from '@components/manage/AssignmentCard';
import AssignmentListSkeleton from '@components/skeleton/AssignmentListSkeleton';
import { useGetAssignmentList } from '@hooks/queries/useGetAssignment';
import { useSuspenseGetStudyDetail } from '@hooks/queries/useGetStudy';
import useIntersection from '@hooks/useIntersection';
import { userState } from '@recoil/auth';
import { getProgress } from '@utils/getProgress';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

const AssignmentList = () => {
  const router = useRouter();
  const uuid = String(router.query.id);
  const { targetRef, isIntersecting } = useIntersection({ threshold: 0.4 });
  const { data: study } = useSuspenseGetStudyDetail(uuid);
  const {
    data: assignment,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetAssignmentList(uuid);
  const { uuid: userId } = useRecoilValue(userState);
  // TODO: Suspense 내부에서 2개의 useQuery를 사용하기 때문에 waterfall 발생.
  // useQueries를 통해 병렬적으로 가져오기

  const progress = getProgress(study.start_date, study.end_date);

  const handleRegisterButton = () => {
    if (userId === study.leaders[0].uuid)
      router.push(`/study/assignment/register/${uuid}`);
  };

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [isIntersecting, isFetching]);

  return (
    <div className="mb-20 flex flex-col items-center">
      <h1 className="mx-8 mb-14 text-center text-[24px] font-bold text-text-secondary">
        {study.study_name}
      </h1>
      {assignment.pages.flatMap((page) => page.results).length > 0 ? (
        <>
          <ProgressBar progress={progress} />
          {progress !== 100 && (
            <span className="mt-2 text-14 font-bold">
              목표까지
              <span className="text-brand">{` ${100 - progress}`}% </span>
              남았어요!
            </span>
          )}
          <ul className="mb-5 mt-[47px] flex flex-col items-center gap-y-5">
            {assignment.pages.flatMap((page) =>
              page.results.map(({ id, title, created_at, content }) => (
                <AssignmentCard
                  key={id}
                  id={id}
                  title={title}
                  period={created_at}
                  content={content}
                />
              )),
            )}
            <Button
              text="과제 등록하기"
              className="fixed bottom-11 h-9 w-[143px]"
              onClick={handleRegisterButton}
            />
          </ul>
        </>
      ) : (
        <>
          <div className="flex h-[30vh] items-center justify-center">
            <span className="whitespace-pre-wrap text-center text-16 text-text-primary">
              {`등록한 과제가 없습니다.\n새로운 과제를 등록해보세요!`}
            </span>
          </div>
          <div className="flex justify-center">
            <Button
              text="과제 등록하기"
              className="fixed bottom-11 h-9 w-[143px]"
              onClick={handleRegisterButton}
            />
          </div>
        </>
      )}
      {isFetchingNextPage && <AssignmentListSkeleton />}
      <div ref={targetRef} />
    </div>
  );
};

export default AssignmentList;
