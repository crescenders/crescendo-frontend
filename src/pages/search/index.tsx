import Category from '@components/common/Category';
import PageLayout from '@components/common/PageLayout';
import { categories } from '@constants/categories';
import { useState } from 'react';
import tw from 'tailwind-styled-components';

const Search = () => {
  const [all, setAll] = useState<boolean>(true);
  const [category, setCategory] = useState<string[]>([]);

  return (
    <PageLayout>
      <ul className="mt-[100px] flex gap-x-10 justify-center">
        <CategoryBox
          className={`${all ? 'border-[#8266FF] ' : 'border-[#EAEAEB]'}`}
          onClick={() => setAll(true)}
        >
          <span className={`${all ? 'text-[#8266FF]' : 'text-black'}`}>
            All
          </span>
        </CategoryBox>
        {categories.map(({ id, name }) => (
          <Category
            key={id}
            name={name}
            category={category}
            setCategory={setCategory}
            all={all}
            setAll={setAll}
          />
        ))}
      </ul>
    </PageLayout>
  );
};

export default Search;

const CategoryBox = tw.li`
  flex
  h-fit
  w-fit
  cursor-pointer
  list-none
  items-center
  justify-center
  rounded-[7px]
  border-[1.5px]
  bg-white
  px-4
  py-3
`;
