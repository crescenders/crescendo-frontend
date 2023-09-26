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

export const validateStudy = <T>(input: T): string => {
  if (typeof input === 'object') {
    if (input === null) return ERROR_MESSAGE.required;
    if (Array.isArray(input) && !input.length) return ERROR_MESSAGE.required;
  } else if (typeof input === 'string') {
    if (!input || !input.replace(REGEX.htmlTag, ''))
      return ERROR_MESSAGE.required;
    if (REGEX.script.test(input.replace(REGEX.code, '')))
      return ERROR_MESSAGE.postContent;
  }
  return '';
};

export const validateTag = (tag: string) => {
  if (!REGEX.tag.test(tag)) return ERROR_MESSAGE.regex;
  if (tag.length < 1 || tag.length > 20) {
    return ERROR_MESSAGE.tag;
  }
  return '';
};
