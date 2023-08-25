export const REGEX = {
  text: /^[가-힣a-zA-Z]+$/,
  file: /(.*?)\.(jpg|jpeg|png)$/,
} as const;

export const ERROR_MESSAGE = {
  regex: '올바른 형식으로 입력해주세요.',
  username: '2 ~ 10자로 입력해주세요.',
  noImage: '이미지를 업로드 할 수 없습니다.',
  extention: '확장자를 확인해주세요. (가능한 확장자: .jpg, .jpeg, .png)',
  maxSize: '업로드 가능한 최대 이미지 크기는 5MB입니다.',
  maxLength: '이미지는 한 장만 업로드 가능합니다.',
} as const;
