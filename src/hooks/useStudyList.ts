import { useRouter } from 'next/router';

const useStudyList = () => {
  const router = useRouter();

  const handleCategoryList = (name: string) => {
    const { categories, ...restQuery } = router.query;
    if (categories?.includes(name)) {
      if (typeof categories === 'string') {
        router.replace({
          pathname: router.pathname,
          query: {
            ...restQuery,
          },
        });
      } else if (Array.isArray(categories))
        router.replace({
          pathname: router.pathname,
          query: {
            ...router.query,
            categories: categories.filter((category) => category !== name),
          },
        });
    } else {
      if (typeof categories === 'string')
        router.replace({
          pathname: router.pathname,
          query: {
            ...router.query,
            categories: [categories, name],
          },
        });
      else if (Array.isArray(categories))
        router.replace({
          pathname: router.pathname,
          query: {
            ...router.query,
            categories: [...categories, name],
          },
        });
      else
        router.replace({
          pathname: router.pathname,
          query: {
            ...router.query,
            categories: name,
          },
        });
    }
  };

  return { handleCategoryList };
};

export default useStudyList;
