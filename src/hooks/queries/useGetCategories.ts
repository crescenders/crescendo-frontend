import categoryApi from '@apis/category/categoryApi';
import { useQuery } from '@tanstack/react-query';

export const useGetCategories = () => {
  return useQuery({
    queryKey: ['useGetCategories'],
    queryFn: () => categoryApi.getCategories(),
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
