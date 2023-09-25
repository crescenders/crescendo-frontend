import { useGetStudyGroupList } from '@hooks/queries/useGetStudy';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useIntersection from '@hooks/useIntersection';
import StudyListSkeleton from '@components/skeleton/StudyListSkeleton';
import Card from '@components/common/Card';

const StudyList = () => {
  const router = useRouter();
  const { targetRef, isIntersecting } = useIntersection({ threshold: 0.4 });
  const params = router.asPath.split('?')[1];
  const {
    data: studies,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useGetStudyGroupList(params);

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [isIntersecting, isFetching]);

  return (
    <>
      {studies?.pages.flatMap((pages) =>
        pages.results.map(
          ({
            uuid,
            head_image,
            leaders,
            post_title,
            study_name,
            is_closed,
            tags,
            current_member_count,
            member_limit,
            until_deadline,
          }) => (
            <Card
              path={`/study/detail/${uuid}`}
              key={uuid}
              size="big"
              title={post_title}
              studyName={study_name}
              writer={leaders[0] && leaders[0].username} // admin 페이지에서 생성한 게시물은 leaders가 없다. 추후 수정 필요
              tags={tags}
              isClosed={is_closed}
              img={head_image}
              participant={current_member_count}
              personnel={member_limit}
              deadline={until_deadline}
            />
          ),
        ),
      )}
      {isFetching && <StudyListSkeleton />}
      <div ref={targetRef} />
    </>
  );
};

export default StudyList;
