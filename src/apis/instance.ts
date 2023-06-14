import { CONFIG } from '@config';
import { getToken } from '@utils/token';
import axios from 'axios';
import authApi from '@apis/auth/authApi';

const instance = axios.create({
  baseURL: CONFIG.BASE_URL,
});

const ReissuanceToken = async (): Promise<string> => {
  const refreshToken = getToken().refresh_token;
  const res = await authApi.refreshToken(refreshToken);
  return res.access_token;
};

instance.interceptors.request.use(
  (config) => {
    const token = getToken().access_token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
