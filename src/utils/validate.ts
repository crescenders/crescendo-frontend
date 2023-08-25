import { MAX_FILE_SIZE } from '@constants/index';
import { ERROR_MESSAGE, REGEX } from '@constants/validation';

export const validateUsername = (username: string) => {
  if (!REGEX.text.test(username)) return ERROR_MESSAGE.regex;
  if (username.length < 2 || username.length > 10) {
    return ERROR_MESSAGE.username;
  }
  return '';
};

export const validateFile = (file: FileList | null) => {
  if (!file || !file.length) return ERROR_MESSAGE.noImage;
  if (file.length > 1) return ERROR_MESSAGE.maxLength;
  if (!REGEX.file.test(file[0].name)) return ERROR_MESSAGE.extention;
  if (file[0].size > MAX_FILE_SIZE) return ERROR_MESSAGE.maxSize;
  return '';
};
