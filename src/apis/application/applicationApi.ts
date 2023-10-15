import instance from '@apis/instance';

const applicationApi = {
  getApplicationList: async (uuid: string): Promise<Application[]> => {
    const { data } = await instance.get(
      `/api/v1/studygroup/studies/${uuid}/requests/`,
    );
    return data;
  },
  postApplication: async (
    uuid: string,
    message: string,
  ): Promise<Pick<Application, 'request_message'>> => {
    const { data } = await instance.post(
      `/api/v1/studygroup/studies/${uuid}/requests/`,
      { request_message: message },
    );
    return data;
  },
  approveApplication: async (uuid: string, id: number): Promise<void> => {
    return await instance.post(
      `/api/v1/studygroup/studies/${uuid}/requests/${id}/`,
    );
  },
  refuseApplication: async (uuid: string, id: number): Promise<void> => {
    return await instance.delete(
      `/api/v1/studygroup/studies/${uuid}/requests/${id}/`,
    );
  },
};

export default applicationApi;