import { getToken, setToken } from '@utils/token';
import axios from 'axios';
import authApi from '@apis/auth/authApi';
import { getCookie, setCookie } from '@utils/cookie';

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
    const {
      config: originalRequest,
      response: { data, status },
    } = error;

    if (status === 401) {
      if (data.messages && data.messages[0].token_type === 'access') {
        const refreshToken = getCookie('refreshToken');
        try {
          const { access: accessToken, refresh } = await authApi.refreshToken(
            refreshToken,
          );
          setToken({ accessToken });
          setCookie('refreshToken', refresh);
          // 기존 header에 새로운 accessToken을 설정합니다.
          instance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
          // 원래 요청에도 새로운 accessToken을 설정합니다.
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;

          return instance.request(originalRequest);
        } catch (error) {
          alert('세션이 만료되었습니다. 다시 로그인을 시도해주세요.');
          window.location.href = '/login';
        }
      } else {
        alert('세션이 만료되었습니다. 다시 로그인을 시도해주세요.');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
