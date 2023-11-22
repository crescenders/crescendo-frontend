import { useRouter } from 'next/router';

const useStudyList = () => {
  const router = useRouter();
  const { pathname } = router;

  const handleCategoryList = (name: string) => {
    const { categories, ...restQuery } = router.query;

    if (categories?.includes(name)) {
      if (typeof categories === 'string') {
        router.replace({
          pathname,
          query: {
            ...restQuery,
          },
        });
      } else if (Array.isArray(categories))
        router.replace({
          pathname,
          query: {
            ...router.query,
            categories: categories.filter((category) => category !== name),
          },
        });
    } else {
      if (typeof categories === 'string')
        router.replace({
          pathname,
          query: {
            ...router.query,
            categories: [categories, name],
          },
        });
      else if (Array.isArray(categories))
        router.replace({
          pathname,
          query: {
            ...router.query,
            categories: [...categories, name],
          },
        });
      else
        router.replace({
          pathname,
          query: {
            ...router.query,
            categories: name,
          },
        });
    }
  };

  const studySearchRouter = (value: string) => {
    if (value === '') router.replace(pathname);
    else if (value.startsWith('#'))
      router.replace({
        pathname,
        query: {
          ...router.query,
          tags: value.replace('#', ''),
        },
      });
    else
      router.replace({
        pathname,
        query: {
          ...router.query,
          post_title: value,
          study_name: value,
        },
      });
  };

  return { handleCategoryList, studySearchRouter };
};

export default useStudyList;
