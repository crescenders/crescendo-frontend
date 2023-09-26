import studyApi from '@apis/study/studyApi';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export const useGetStudyGroupList = (params = '') => {
  return useInfiniteQuery(
    ['useGetStudyGroupList', params],
    ({ pageParam = '' }) => {
      const cursor = params
        ? pageParam
          ? `?${params}` + `&${pageParam}`
          : `?${params}`
        : `?${pageParam}`;
      return studyApi.getStudyGroupList(cursor);
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.next ? lastPage.next.split('?')[1] : undefined;
      },
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
