import { privateInstance } from '@apis/instance';

const userApi = {
  getUser: async (): Promise<User> => {
    const { data } = await privateInstance.get(`/api/v1/auth/profiles/me/`);
    return data;
  },
  putUser: async (nickname: string): Promise<User> => {
    const { data } = await privateInstance.put(`/api/v1/auth/profiles/me/`, {
      username: nickname,
    });
    return data;
  },
  deleteUser: async (): Promise<void> => {
    return await privateInstance.delete(`/api/v1/auth/profiles/me/`);
  },
  getMyStudyGroupList: async (params: string): Promise<MyStudyList> => {
    const { data } = await privateInstance.get(
      `/api/v1/auth/profiles/me/studies?${params}`,
    );
    return data;
  },
};

export default userApi;
