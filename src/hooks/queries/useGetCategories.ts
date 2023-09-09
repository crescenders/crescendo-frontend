import studyApi from '@apis/study/studyApi';
import { useQuery } from '@tanstack/react-query';

export const useGetCategories = () => {
  return useQuery(['useGetCategories'], () => studyApi.getCategories());
};
