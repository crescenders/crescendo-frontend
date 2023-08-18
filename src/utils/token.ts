import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from '@utils/localStorage';

type UserToken = {
  accessToken: string | undefined;
  refreshToken: string | undefined;
};

const TOKEN_KEY = '@token';

export const getToken = (): UserToken => {
  const token = getLocalStorage<UserToken>(TOKEN_KEY, {
    accessToken: undefined,
    refreshToken: undefined,
  });
  return token;
};

export const setToken = (token: UserToken) => {
  setLocalStorage(TOKEN_KEY, token);
};

export const deleteToken = () => {
  removeLocalStorage(TOKEN_KEY);
};
