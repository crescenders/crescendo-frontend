export const REGEX = {
  text: /^[가-힣a-zA-Z]+$/,
} as const;

export const ERROR_MESSAGE = {
  regex: '올바른 형식으로 입력해주세요.',
  username: '2 ~ 10자로 입력해주세요.',
} as const;
