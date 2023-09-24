export const REGEX = {
  text: /^[가-힣a-zA-Z]+$/,
  file: /(.*?)\.(jpg|jpeg|png)$/,
  code: /<pre((?!(<\/pre>))[\s\S])*<\/pre>/gi,
  htmlTag: /<[^>]*>?/gi,
  script:
    /(&lt;script&gt;|&lt;script)((?!(&lt;\/script&gt;|\/&gt;)).)*(&lt;\/script&gt;|\/&gt;)/i,
  tag: /^[가-힣a-zA-Z\d]+$/,
} as const;

export const ERROR_MESSAGE = {
  regex: '올바른 형식으로 입력해주세요.',
  username: '2 ~ 10자로 입력해주세요.',
  tag: '1 ~ 20자로 입력해주세요.',
  required: '필수 항목입니다.',
  noImage: '이미지를 업로드 할 수 없습니다.',
  extention: '확장자를 확인해주세요. (가능한 확장자: .jpg, .jpeg, .png)',
  maxSize: '업로드 가능한 최대 이미지 크기는 5MB입니다.',
  maxLength: '이미지는 한 장만 업로드 가능합니다.',
  postContent: '사용할 수 없는 문자열(<script> 태그)이 포함되어있습니다.',
} as const;
