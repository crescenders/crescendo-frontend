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
};

export default studyApi;
