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
};

export default submissionApi;
