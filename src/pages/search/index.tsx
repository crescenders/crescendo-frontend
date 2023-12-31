import StudyList from '@components/search/StudyList';
import PageLayout from '@components/common/PageLayout';
import SelectBox from '@components/common/SelectBox';
import {
  LEFT_SELECT_OPTION,
  RIGHT_SELECT_OPTION,
  SORT_OBJ,
  SortStateType,
} from '@constants/search';
import { useRef, useState } from 'react';
import StudyListSkeleton from '@components/skeleton/StudyListSkeleton';
import Input from '@components/common/Input';
import Image from 'next/image';
import { categories } from '@constants/categories';
import { useRouter } from 'next/router';
import useStudyList from '@hooks/useStudyList';
import AsyncBoundary from '@components/async/AsyncBoundary';

const Search = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { handleCategoryList, studySearchRouter } = useStudyList();
  const [isOpen, setIsOpen] = useState<SortStateType>(SORT_OBJ);
  const [leftValue, setLeftValue] = useState<string>('최신순');
  const [rightValue, setRightValue] = useState<string>('모집여부');

  const router = useRouter();

  const handleSearchClick = () => {
    if (!inputRef.current) return;
    const { value } = inputRef.current;

    studySearchRouter(value);
  };

  const handleAllCategoryClick = () => {
    router.replace(router.pathname);
    setLeftValue('최신순');
    setRightValue('모집여부');
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!(e.target instanceof HTMLInputElement) || !inputRef.current) return;
    const { value } = inputRef.current;

    if (e.key === 'Enter') {
      studySearchRouter(value);
      setLeftValue('최신순');
      setRightValue('모집여부');
    }
  };

  return (
    <PageLayout>
      <div className="mx-auto my-0 mt-[150px] flex w-full max-w-3xl flex-wrap items-center gap-2 px-5">
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
        <div className="relative w-full max-w-[500px]">
          <Input
            id="search-bar"
            type="text"
            variant="middle"
            placeholder="제목, 스터디명 또는 태그를 검색해주세요."
            className="w-full text-14"
            ref={inputRef}
            defaultValue={router.query.study_name || router.query.post_title}
            onKeyDown={onKeyDown}
          />
          <Image
            src={'/svg/search_icon.svg'}
            width={16}
            height={16}
            alt="searchIcon"
            className="absolute right-3 top-3.5 cursor-pointer"
            onClick={handleSearchClick}
          />
        </div>
      </div>
      <div className="mb-10 mt-4 w-full">
        <ul className="mx-auto my-0 flex w-full max-w-3xl flex-wrap items-center gap-x-2 gap-y-3 px-5">
          {[{ name: 'All', id: 0 }, ...categories].map(({ id, name }) => (
            <li
              key={id}
              className={`flex h-fit w-fit cursor-pointer list-none items-center justify-center rounded-[7px] border-[1.5px] bg-white px-4 py-2 text-[14px] ${
                ((id === 0 && !router.query.categories) ||
                  router.query.categories?.includes(name)) &&
                'border-[#8266FF] text-[#8266FF]'
              }`}
              onClick={() => {
                id === 0 ? handleAllCategoryClick() : handleCategoryList(name);
              }}
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
      <AsyncBoundary suspenseFallback={<StudyListSkeleton />}>
        <StudyList />
      </AsyncBoundary>
    </PageLayout>
  );
};

export default Search;
