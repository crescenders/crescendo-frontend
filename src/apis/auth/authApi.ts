import instance from '@apis/instance';

const authApi = {
  googleLogin: async (token: string | null): Promise<Token> => {
    const { data } = await instance.post(`/api/v1/auth/login/google/`, {
      access: token,
    });
    return data;
  },
  refreshToken: async (refresh: string | null): Promise<Token> => {
    const { data } = await instance.post(`/api/v1/auth/login/refresh/`, {
      refresh,
    });
    return data;
  },
  logout: async (refresh: string | null): Promise<void> => {
    return await instance.post(`/api/v1/auth/logout/`, {
      refresh,
    });
  },
};

export default authApi;
