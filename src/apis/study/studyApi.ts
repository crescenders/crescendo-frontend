import instance from '@apis/instance';

const studyApi = {
  getStudyByKeyword: async (
    keyword: string,
    page: number,
  ): Promise<Study[]> => {
    const { data } = await instance.get(
      `/api/v1/studies?keyword=${keyword}&page=${page}`,
    );
    return data;
  },
  createStudy: async (formData: FormData): Promise<Study> => {
    const { data } = await instance.post(
      '/api/v1/studygroup/studies',
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );
    return data;
  },
};

export default studyApi;
