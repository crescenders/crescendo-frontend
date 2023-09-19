import studyApi from '@apis/study/studyApi';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

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

export const useGetStudyDetail = (id: string) => {
  return useQuery(
    ['useGetStudyDetail', id],
    () => studyApi.getStudyDetail(id),
    {
      enabled: !!id,
      staleTime: 5 * 60 * 1000,
    },
  );
};
