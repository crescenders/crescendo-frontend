import PageLayout from '@components/common/PageLayout';
import SelectBox from '@components/common/SelectBox';
import { useState } from 'react';

export type SelectListType = {
  id: number;
  name: SortType;
};

type SortType = '최신순' | '마감순' | '모집중' | '모집완료';

export type SortStateType = {
  [key in SortType]: boolean;
};

export const SORT_OBJ: SortStateType = {
  최신순: false,
  마감순: false,
  모집중: false,
  모집완료: false,
};

const LEFT_SELECT_OPTION: SelectListType[] = [
  { id: 1, name: '최신순' },
  { id: 2, name: '마감순' },
];

const RIGHT_SELECT_OPTION: SelectListType[] = [
  { id: 1, name: '모집중' },
  { id: 2, name: '모집완료' },
];

const Search = () => {
  const [isOpen, setIsOpen] = useState<SortStateType>(SORT_OBJ);
  const [leftValue, setLeftValue] = useState<string>('최신순');
  const [rightValue, setRightValue] = useState<string>('모집중');
  return (
    <PageLayout>
      <div className="mt-[150px] flex gap-x-2">
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
    </PageLayout>
  );
};

export default Search;
