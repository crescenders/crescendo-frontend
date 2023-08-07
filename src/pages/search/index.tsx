import Card from '@components/common/Card';
import PageLayout from '@components/common/PageLayout';
import SelectBox from '@components/common/SelectBox';
import {
  LEFT_SELECT_OPTION,
  RIGHT_SELECT_OPTION,
  SORT_OBJ,
  SortStateType,
} from '@constants/search';
import { useGetStudyByKeyword } from '@hooks/query/useGetStudy';
import useIntersection from '@hooks/useIntersection';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';

const Search = () => {
  const router = useRouter();
  const { targetRef, isIntersecting } = useIntersection({ threshold: 0.4 });
  const {
    data: studies,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useGetStudyByKeyword(router.query.keyword as string);
  const [isOpen, setIsOpen] = useState<SortStateType>(SORT_OBJ);
  const [leftValue, setLeftValue] = useState<string>('최신순');
  const [rightValue, setRightValue] = useState<string>('모집중');

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [isIntersecting]);

  return (
    <PageLayout>
      <div className="ml-[143px] mt-[150px] flex gap-x-2">
        <SelectBox
          options={LEFT_SELECT_OPTION}
          value={leftValue}
          setValue={setLeftValue}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        <SelectBox
          options={RIGHT_SELECT_OPTION}
          value={rightValue}
          setValue={setRightValue}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>
      {studies &&
        (studies.pages.flatMap((v) => v.studies).length > 0 ? (
          <StudyList>
            {studies.pages.map(({ studies }) =>
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
                    path="/"
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
          </StudyList>
        ) : (
          <div className="flex justify-center items-center h-[50vh]">
            <span className="text-status-error">검색 결과가 없습니다.</span>
          </div>
        ))}
      <div ref={targetRef} />
    </PageLayout>
  );
};

export default Search;

const StudyList = tw.div`
  mb-[100px]
  mt-[98px]
  flex
  flex-wrap
  justify-center
  gap-8
`;
