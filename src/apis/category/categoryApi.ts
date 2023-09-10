import instance from '@apis/instance';

const categoryApi = {
  getCategories: async (): Promise<Category[]> => {
    const { data } = await instance.get('/api/v1/studygroup/categories/');
    return data;
  },
};

export default categoryApi;
