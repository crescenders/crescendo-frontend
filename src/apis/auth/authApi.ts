import instance from '@apis/instance';

const authApi = {
  googleLogin: async (token: string | null): Promise<Token> => {
    const { data } = await instance.post(`/api/v1/auth/login/google/`, {
      google_jwt: token,
    });
    return data;
  },
  refreshToken: async (refreshToken: string | undefined): Promise<Token> => {
    const { data } = await instance.post(`/api/v1/auth/login/refresh/`, {
      refresh_token: refreshToken,
    });
    return data;
  },
};

export default authApi;
