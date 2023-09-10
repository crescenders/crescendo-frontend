import categoryApi from '@apis/category/categoryApi';
import { useQuery } from '@tanstack/react-query';

export const useGetCategories = () => {
  return useQuery(['useGetCategories'], () => categoryApi.getCategories(), {
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};
