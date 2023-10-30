import tagApi from '@apis/tag/tagApi';
import { useQuery } from '@tanstack/react-query';

export const useGetTags = () => {
  return useQuery({
    queryKey: ['tags'],
    queryFn: () => tagApi.getTags(),
  });
};
