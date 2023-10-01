import { useEffect } from 'react';
import OpenStudyCard from '@components/manage/OpenStudyCard';
import MyStudyListSkeleton from '@components/skeleton/MyStudyListSkeleton';
import useIntersection from '@hooks/useIntersection';
import { useGetMyStudyGroupList } from '@hooks/queries/useGetStudy';

const MyStudyList = () => {
  const { targetRef, isIntersecting } = useIntersection({ threshold: 0.4 });
  const {
    data: studies,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useGetMyStudyGroupList('as_leader');

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [isIntersecting, isFetching]);

  return studies.pages.flatMap((page) => page.results).length > 0 ? (
    <>
      {studies.pages.flatMap((pages) =>
        pages.results.map(
          ({ uuid, post_title, categories, member_limit, is_closed }) => (
            <OpenStudyCard
              key={uuid}
              id={uuid}
              title={post_title}
              category={categories}
              personnel={member_limit}
              isClosed={is_closed}
              study_period="YYYY-MM-DD - YYYY-MM-DD"
              recruitment_period="YYYY-MM-DD - YYYY-MM-DD"
            />
          ),
        ),
      )}
      {isFetching && <MyStudyListSkeleton />}
      <div ref={targetRef} />
    </>
  ) : (
    <div className="flex grow items-center justify-center ">
      <span className="text-center text-[#8A8A8A]">
        개설한 스터디가 없습니다. <br /> 새로운 스터디를 개설해보세요!
      </span>
    </div>
  );
};

export default MyStudyList;
