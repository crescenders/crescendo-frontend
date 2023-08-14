import { CONFIG } from '@config';
import { deleteToken, getToken, setToken } from '@utils/token';
import axios from 'axios';
import authApi from '@apis/auth/authApi';

const instance = axios.create({
  baseURL: CONFIG.BASE_URL,
});

const ReissuanceToken = async (): Promise<string | undefined> => {
  const refreshToken = getToken().refreshToken;
  if (refreshToken) {
    const res = await authApi.refreshToken(refreshToken);
    return res.access;
  }
};

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
      const accessToken = await ReissuanceToken();
      if (accessToken) {
        setToken({ accessToken, refreshToken: getToken().refreshToken });
        return instance.request(originalRequest);
      }
      alert('세션이 만료되었습니다. 다시 로그인해주세요.');
      deleteToken();
      CONFIG.ENV === 'development'
        ? (window.location.href = `${CONFIG.LOCAL}`)
        : `${CONFIG.DOMAIN}`;
    }

    return Promise.reject(error);
  },
);

export default instance;
