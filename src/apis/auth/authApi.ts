import instance from '@apis/instance';
import axios from 'axios';

const authApi = {
  googleLogin: async (token: string | null): Promise<Token> => {
    try {
      const { data } = await instance.post(`/api/v1/auth/login/google/`, {
        google_jwt: token,
      });
      return data;
    } catch (error) {
      console.error(error);
      alert('로그인에 실패하였어요. 다시 시도해주세요.');
      throw error;
    }
  },
  refreshToken: async (refreshToken: string | undefined): Promise<Token> => {
    const { data } = await instance.post(`/api/v1/auth/login/refresh/`, {
      refresh_token: refreshToken,
    });
    return data;
  },
};

export default authApi;
