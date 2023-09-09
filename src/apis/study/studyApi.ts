import instance from '@apis/instance';

const studyApi = {
  getStudyByKeyword: async (
    keyword: string,
    page: number,
  ): Promise<StudyList[]> => {
    const { data } = await instance.get(
      `/api/v1/studies?keyword=${keyword}&page=${page}`,
    );
    return data;
  },
  createStudy: async (formData: FormData): Promise<Study> => {
    const { data } = await instance.post(
      '/api/v1/studygroup/studies/',
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );
    return data;
  },
  getCategories: async (): Promise<Category[]> => {
    const { data } = await instance.get('/api/v1/studygroup/categories/');
    return data;
  },
  getStudyDetail: async (id: string): Promise<StudyDetail> => {
    const { data } = await instance.get(`/api/v1/studygroup/studies/${id}/`);
    return data;
  },
};

export default studyApi;
