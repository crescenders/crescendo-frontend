import { useGetStudyByKeyword } from '@hooks/queries/useGetStudy';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useIntersection from '@hooks/useIntersection';
import StudyListSkeleton from '@components/skeleton/StudyListSkeleton';
import Card from '@components/common/Card';

const StudyList = () => {
  const router = useRouter();
  const { targetRef, isIntersecting } = useIntersection({ threshold: 0.4 });
  const {
    data: studies,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useGetStudyByKeyword(router.query.keyword as string);

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [isIntersecting]);

  return (
    <>
      {studies?.pages.map(({ studies }) =>
        studies.map(
          ({
            id,
            title,
            studyName,
            writer,
            tags,
            isCanApply,
            img,
            participant,
            personnel,
            startDate,
            endDate,
          }) => (
            <Card
              path={`/study/detail/${id}`}
              key={id}
              size="big"
              title={title}
              studyName={studyName}
              writer={writer}
              tags={tags}
              isCanApply={isCanApply}
              img={img}
              participant={participant}
              personnel={personnel}
              startDate={startDate}
              endDate={endDate}
            />
          ),
        ),
      )}
      {isFetchingNextPage && <StudyListSkeleton />}
      <div className="absolute bottom-0" ref={targetRef} />
    </>
  );
};

export default StudyList;
