import instance from '@apis/instance';

const authApi = {
  googleLogin: async (token: string | null): Promise<Token> => {
    const { data } = await instance.post(`/api/v1/auth/login/google/`, {
      access: token,
    });
    return data;
  },
  refreshToken: async (refreshToken: string | null): Promise<Token> => {
    const { data } = await instance.post(`/api/v1/auth/login/refresh/`, {
      refresh: refreshToken,
    });
    return data;
  },
};

export default authApi;
