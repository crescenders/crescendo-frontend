import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useGetSubmissionList } from '@hooks/queries/useGetSubmission';
import useIntersection from '@hooks/useIntersection';
import { formatUTC } from '@utils/formatUTC';
import SubmissionListSkeleton from '@components/skeleton/SubmissionListSkeleton';

const SubmissionList = () => {
  const router = useRouter();
  const [uuid, assignmentId] = (router.query.id as string[]) || [];
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useGetSubmissionList(uuid, Number(assignmentId));
  const { targetRef, isIntersecting } = useIntersection({ threshold: 0.4 });

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [isIntersecting, isFetching]);

  return (
    <div className="flex flex-col gap-8">
      {data.pages.flatMap((page) => page.results).length ? (
        data.pages.flatMap((pages) =>
          pages.results.map(({ id, author, title, created_at }) => (
            <div
              key={id}
              className="flex h-[130px] w-[544px] cursor-pointer flex-col justify-between rounded-2xl bg-[#F3F4F8] p-6"
              onClick={() =>
                router.push(
                  `/study/assignment/submission/detail/${uuid}/${assignmentId}/${id}/`,
                )
              }
            >
              <span className="text-16 font-bold text-text-secondary">
                {title}
              </span>
              <div className="flex w-full items-end justify-end gap-1">
                <span className="text-12 font-bold text-text-primary">
                  {formatUTC(created_at, true)}
                </span>
                <span className="text-16 font-bold text-text-secondary">
                  {author.username}
                </span>
              </div>
            </div>
          )),
        )
      ) : (
        <div className="flex h-[50vh] select-none items-center justify-center">
          <span className="text-center text-16 text-text-primary">
            {`아직 과제를 제출한 스터디원이 없어요.`}
          </span>
        </div>
      )}
      {isFetchingNextPage && <SubmissionListSkeleton />}
      <div ref={targetRef} />
    </div>
  );
};

export default SubmissionList;
