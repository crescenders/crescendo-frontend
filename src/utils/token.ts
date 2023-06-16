import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from '@utils/localStorage';

export interface Token {
  access_token: string | undefined;
  refresh_token: string | undefined;
}

const TOKEN_KEY = '@token';

export const getToken = (): Token => {
  const token = getLocalStorage<Token>(TOKEN_KEY, {
    access_token: undefined,
    refresh_token: undefined,
  });
  return token;
};

export const setToken = (token: Token) => {
  setLocalStorage(TOKEN_KEY, token);
};

export const deleteToken = () => {
  removeLocalStorage(TOKEN_KEY);
};
