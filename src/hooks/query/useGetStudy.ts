import studyApi from '@apis/study/studyApi';
import { useInfiniteQuery } from 'react-query';

export const useGetStudyByKeyword = (keyword: string) => {
  return useInfiniteQuery(
    ['useGetStudy', keyword],
    ({ pageParam = 1 }) =>
      studyApi
        .getStudyByKeyword(keyword, pageParam)
        .then((studies) => ({ studies, page: pageParam })),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.studies.length > 0 ? lastPage.page + 1 : undefined;
      },
      enabled: !!keyword,
    },
  );
};
