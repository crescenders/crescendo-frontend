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
  getStudyDetail: async (id: number): Promise<StudyDetail> => {
    const { data } = await instance.get(`/api/v1/studygroup/studies/${id}/`);
    return data;
  },
};

export default studyApi;
