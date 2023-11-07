import Card from '@components/common/Card';
import Loader from '@components/common/Loader';
import { useGetMyStudyGroupList } from '@hooks/queries/useGetStudy';
import useIntersection from '@hooks/useIntersection';
import { useEffect } from 'react';

const PendingApprovalList = () => {
  const {
    data: studies,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetMyStudyGroupList('requested');
  const { isIntersecting, targetRef } = useIntersection({ threshold: 0.4 });

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [isIntersecting, isFetching]);

  return (
    <>
      <div className="mb-4 mt-10 flex flex-wrap gap-x-[33px]">
        {studies.pages.flatMap((page) =>
          page.results.map(
            ({ uuid, head_image, name, start_date, end_date }) => (
              <Card
                key={uuid}
                path={`/study/detail/${uuid}`}
                size="small"
                img={head_image}
                startDate={start_date}
                endDate={end_date}
                studyName={name}
              />
            ),
          ),
        )}
      </div>
      {isFetchingNextPage && <Loader />}
      <div ref={targetRef} />
    </>
  );
};

export default PendingApprovalList;
