import { deleteToken, getToken, setToken } from '@utils/token';
import axios from 'axios';
import authApi from '@apis/auth/authApi';
import { getCookie } from '@utils/cookie';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
});

instance.interceptors.request.use(
  (config) => {
    const token = getToken().accessToken;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { config: originalRequest, response } = error;
    if (response?.status === 401) {
      const refreshToken = getCookie('refreshToken');
      try {
        const accessToken = await authApi
          .refreshToken(refreshToken)
          .then((res) => res.access);
        setToken({ accessToken });
        // 기존 header에 새로운 accessToken을 설정합니다.
        instance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        // 원래 요청에도 새로운 accessToken을 설정합니다.
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return instance.request(originalRequest);
      } catch (error) {
        alert('세션이 만료되었습니다. 다시 로그인을 시도해주세요.');
        process.env.NODE_ENV === 'development'
          ? (window.location.href = `${process.env.NEXT_PUBLIC_LOCAL}/login`)
          : (window.location.href = `${process.env.NEXT_PUBLIC_DOMAIN}/login`);
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
