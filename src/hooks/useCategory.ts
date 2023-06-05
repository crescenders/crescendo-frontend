import { Dispatch, SetStateAction } from 'react';

type useCategoryProps = {
  name: string;
  category: string[];
  setCategory: Dispatch<SetStateAction<string[]>>;
};

const useCategory = ({ name, category, setCategory }: useCategoryProps) => {
  const handleCategoryBtn = () => {
    if (!category.includes(name)) {
      return setCategory((prev) => [...prev, name]);
    }
    return setCategory((cats) => cats.filter((item) => item !== name));
  };

  return { handleCategoryBtn };
};

export default useCategory;
