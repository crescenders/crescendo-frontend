import StudyList from '@components/search/StudyList';
import PageLayout from '@components/common/PageLayout';
import SelectBox from '@components/common/SelectBox';
import {
  LEFT_SELECT_OPTION,
  RIGHT_SELECT_OPTION,
  SORT_OBJ,
  SortStateType,
} from '@constants/search';
import { Suspense, useState } from 'react';
import tw from 'tailwind-styled-components';
import StudyListSkeleton from '@components/skeleton/StudyListSkeleton';

const Search = () => {
  const [isOpen, setIsOpen] = useState<SortStateType>(SORT_OBJ);
  const [leftValue, setLeftValue] = useState<string>('최신순');
  const [rightValue, setRightValue] = useState<string>('모집중');

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
      <StudyListContainer>
        <Suspense fallback={<StudyListSkeleton />}>
          <StudyList />
        </Suspense>
      </StudyListContainer>
    </PageLayout>
  );
};

export default Search;

const StudyListContainer = tw.div`
  mb-8
  mt-[100px]
  flex
  flex-wrap
  justify-center
  gap-8
`;
