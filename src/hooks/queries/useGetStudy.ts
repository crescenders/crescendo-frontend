import studyApi from '@apis/study/studyApi';
import userApi from '@apis/user/userApi';
import {
  useSuspenseQuery,
  useSuspenseInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';

export const useGetStudyGroupList = (params = '') => {
  return useSuspenseInfiniteQuery({
    queryKey: ['useGetStudyGroupList', params],
    queryFn: ({ pageParam }) => {
      const cursor = params
        ? pageParam
          ? `?${params}` + `&${pageParam}`
          : `?${params}`
        : `?${pageParam}`;
      return studyApi.getStudyGroupList(cursor);
    },
    initialPageParam: '',
    getNextPageParam: (lastPage) => {
      return lastPage.next ? lastPage.next.split('?')[1] : undefined;
    },
  });
};

export const useGetRandomStudyGroupList = () => {
  return useQuery({
    queryKey: ['useGetRandomStudyGroupList'],
    queryFn: () => studyApi.getStudyGroupList('?random=true'),
  });
};

export const useSuspenseGetStudyDetail = (id: string) => {
  return useSuspenseQuery({
    queryKey: ['useSuspenseGetStudyDetail', id],
    queryFn: () => studyApi.getStudyDetail(id),
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetStudyDetail = (id: string) => {
  return useQuery({
    queryKey: ['useGetStudyDetail', id],
    queryFn: () => studyApi.getStudyDetail(id),
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
  });
};

export const useGetMyStudyGroupList = (filter: string) => {
  return useSuspenseInfiniteQuery({
    queryKey: ['useGetMyStudyGroupList', filter],
    queryFn: ({ pageParam }) => {
      return userApi.getMyStudyGroupList(
        `filter=${filter}&cursor=${pageParam}`,
      );
    },
    initialPageParam: '',
    getNextPageParam: (lastPage) => {
      return lastPage.next && new URL(lastPage.next).searchParams.get('cursor');
    },
  });
};
