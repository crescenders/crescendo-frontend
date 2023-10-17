import instance from '@apis/instance';

const memberApi = {
  getMemberList: async (uuid: string): Promise<Member[]> => {
    const { data } = await instance.get(
      `/api/v1/studygroup/studies/${uuid}/members/`,
    );
    return data;
  },
  deleteMember: async (uuid: string, id: number): Promise<void> => {
    return await instance.delete(
      `/api/v1/studygroup/studies/${uuid}/members/${id}/`,
    );
  },
};

export default memberApi;
