import instance from '@apis/instance';

const submissionApi = {
  getSubmissionList: async (
    uuid: string,
    id: number,
    cursor: string,
  ): Promise<SubmissionList> => {
    const { data } = await instance.get(
      `/api/v1/studygroup/studies/${uuid}/assignments/${id}/submissions?${cursor}`,
    );
    return data;
  },
  postSubmissionDetail: async (
    uuid: string,
    id: number,
    title: string,
    content: string,
  ): Promise<Pick<SubmissionDetail, 'title' | 'content'>> => {
    const { data } = await instance.post(
      `/api/v1/studygroup/studies/${uuid}/assignments/${id}/submissions/`,
      {
        title,
        content,
      },
    );
    return data;
  },
};

export default submissionApi;
