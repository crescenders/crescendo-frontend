import instance from '@apis/instance';

const userApi = {
  getUserByEmail: async (email: string): Promise<User[]> => {
    const { data } = await instance.get(`/api/v1/auth/users/?email=${email}`);
    return data.results;
  },
  getUserByUsername: async (username: string): Promise<User[]> => {
    const { data } = await instance.get(
      `/api/v1/auth/users/?username=${username}`,
    );
    return data.results;
  },
  getSingleUser: async (uuid: string): Promise<User> => {
    const { data } = await instance.get(`/api/v1/auth/users/${uuid}/`);
    return data;
  },
  putUserNickName: async (uuid: string, nickname: string): Promise<User> => {
    const { data } = await instance.put(`/api/v1/auth/users/${uuid}/`, {
      username: nickname,
    });
    return data;
  },
  deleteUser: async (uuid: string): Promise<void> => {
    return await instance.delete(`/api/v1/auth/users/${uuid}/`);
  },
};

export default userApi;
