import { privateInstance } from '@apis/instance';

const submissionApi = {
  getSubmissionList: async (
    uuid: string,
    id: number,
    cursor: string,
  ): Promise<SubmissionList> => {
    const { data } = await privateInstance.get(
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
    const { data } = await privateInstance.post(
      `/api/v1/studygroup/studies/${uuid}/assignments/${id}/submissions/`,
      {
        title,
        content,
      },
    );
    return data;
  },
  getSubmissionDetail: async (
    uuid: string,
    assignmentId: number,
    submissionId: number,
  ): Promise<SubmissionDetail> => {
    const { data } = await privateInstance.get(
      `/api/v1/studygroup/studies/${uuid}/assignments/${assignmentId}/submissions/${submissionId}/`,
    );
    return data;
  },
  putSubmissionDetail: async (
    uuid: string,
    assignmentId: number,
    submissionId: number,
    title: string,
    content: string,
  ): Promise<Pick<SubmissionDetail, 'title' | 'content'>> => {
    const { data } = await privateInstance.put(
      `/api/v1/studygroup/studies/${uuid}/assignments/${assignmentId}/submissions/${submissionId}/`,
      {
        title,
        content,
      },
    );
    return data;
  },
  patchSubmissionDetail: async (
    uuid: string,
    assignmentId: number,
    submissionId: number,
    patchedData: Partial<SubmissionDetail>,
  ): Promise<SubmissionDetail> => {
    const { data } = await privateInstance.patch(
      `/api/v1/studygroup/studies/${uuid}/assignments/${assignmentId}/submissions/${submissionId}/`,
      patchedData,
    );
    return data;
  },
  deleteSubmissionDetail: async (
    uuid: string,
    assignmentId: number,
    submissionId: number,
  ): Promise<SubmissionDetail> => {
    const { data } = await privateInstance.delete(
      `/api/v1/studygroup/studies/${uuid}/assignments/${assignmentId}/submissions/${submissionId}/`,
    );
    return data;
  },
};

export default submissionApi;
