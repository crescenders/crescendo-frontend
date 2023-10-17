import instance from '@apis/instance';

const userApi = {
  getUser: async (): Promise<User> => {
    const { data } = await instance.get(`/api/v1/auth/profiles/me/`);
    return data;
  },
  putUser: async (nickname: string): Promise<User> => {
    const { data } = await instance.put(`/api/v1/auth/profiles/me/`, {
      username: nickname,
    });
    return data;
  },
  deleteUser: async (): Promise<void> => {
    return await instance.delete(`/api/v1/auth/profiles/me/`);
  },
  getMyStudyGroupList: async (params: string): Promise<MyStudyList> => {
    const { data } = await instance.get(
      `/api/v1/auth/profiles/me/studies?${params}`,
    );
    return data;
  },
};

export default userApi;
