import Card from '@components/common/Card';
import Loader from '@components/common/Loader';
import { useGetMyStudyGroupList } from '@hooks/queries/useGetStudy';
import useIntersection from '@hooks/useIntersection';
import { useEffect } from 'react';

const DisApprovedStudyList = () => {
  const {
    data: studies,
    isFetchingNextPage,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useGetMyStudyGroupList('disapproved');
  const { isIntersecting, targetRef } = useIntersection({ threshold: 0.4 });

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [isIntersecting, isFetching]);

  return (
    <>
      <div className="flex flex-wrap gap-x-[33px]">
        {studies &&
          studies.pages.flatMap((page) =>
            page.results.map(
              ({ uuid, head_image, name, start_date, end_date }) => (
                <Card
                  key={uuid}
                  path={`/study/detail/${uuid}`}
                  size="medium"
                  img={head_image}
                  startDate={start_date}
                  endDate={end_date}
                  studyName={name}
                  disapproved
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

export default DisApprovedStudyList;
