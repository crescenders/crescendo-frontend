import { ERROR_MESSAGE, REGEX } from '@constants/validation';

export const validateUsername = (username: string) => {
  if (!REGEX.text.test(username)) return ERROR_MESSAGE.regex;
  if (username.length < 2 || username.length > 10) {
    return ERROR_MESSAGE.username;
  }
  return '';
};
