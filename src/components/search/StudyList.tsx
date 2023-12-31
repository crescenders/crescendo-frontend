import { useGetStudyGroupList } from '@hooks/queries/useGetStudy';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useIntersection from '@hooks/useIntersection';
import Card from '@components/common/Card';
import NotFoundStudyList from './NotFoundStudyList';
import StudyListSkeleton from '@components/skeleton/StudyListSkeleton';

const StudyList = () => {
  const router = useRouter();
  const { targetRef, isIntersecting } = useIntersection({ threshold: 0.4 });
  const params = router.asPath.split('?')[1];
  const {
    data: studies,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useGetStudyGroupList(params);

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [isIntersecting, isFetching]);

  return (
    <>
      <ul className="flex flex-wrap justify-center gap-8 px-5 pb-8">
        {!isFetching ? (
          studies.pages.flatMap((page) => page.results).length > 0 ? (
            studies.pages.flatMap((pages) =>
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
            )
          ) : (
            <NotFoundStudyList
              keyword={
                (router.query.post_title as string) ||
                (router.query.study_name as string) ||
                (router.query.tags as string)
              }
            />
          )
        ) : null}
        {(isFetching || isFetchingNextPage) && <StudyListSkeleton />}
      </ul>
      <div ref={targetRef} />
    </>
  );
};

export default StudyList;
