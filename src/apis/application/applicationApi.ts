import { privateInstance } from '@apis/instance';

const applicationApi = {
  getApplicationList: async (uuid: string): Promise<Application[]> => {
    const { data } = await privateInstance.get(
      `/api/v1/studygroup/studies/${uuid}/requests/`,
    );
    return data;
  },
  postApplication: async (
    uuid: string,
    message: string,
  ): Promise<Pick<Application, 'request_message'>> => {
    const { data } = await privateInstance.post(
      `/api/v1/studygroup/studies/${uuid}/requests/`,
      { request_message: message },
    );
    return data;
  },
  postApproveApplication: async (uuid: string, id: number): Promise<void> => {
    return await privateInstance.post(
      `/api/v1/studygroup/studies/${uuid}/requests/${id}/`,
    );
  },
  deleteApplication: async (uuid: string, id: number): Promise<void> => {
    return await privateInstance.delete(
      `/api/v1/studygroup/studies/${uuid}/requests/${id}/`,
    );
  },
};

export default applicationApi;
