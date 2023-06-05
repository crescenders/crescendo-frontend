import useCategory from '@hooks/useCategory';
import { Dispatch, SetStateAction, useEffect } from 'react';
import tw from 'tailwind-styled-components';

type CategoryProps = {
  name: string;
  category: string[];
  setCategory: Dispatch<SetStateAction<string[]>>;
  all: boolean;
  setAll: Dispatch<SetStateAction<boolean>>;
};

const Category = ({
  name,
  category,
  setCategory,
  all,
  setAll,
}: CategoryProps) => {
  const { handleCategoryBtn } = useCategory({ name, category, setCategory });

  useEffect(() => {
    if (category.length > 0) {
      setAll(false);
    }
  }, [category]);

  useEffect(() => {
    if (all === true) {
      setCategory([]);
    }
  }, [all]);
  return (
    <CategoryBox
      className={
        category.includes(name) ? 'border-[#8266FF]' : 'border-[#EAEAEB]'
      }
      onClick={handleCategoryBtn}
    >
      <span
        className={`text-15 font-medium ${
          category.includes(name) ? 'text-[#8266FF]' : 'text-black'
        }`}
      >
        {name}
      </span>
    </CategoryBox>
  );
};

export default Category;

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
