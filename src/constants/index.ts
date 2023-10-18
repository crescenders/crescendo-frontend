export const REQUIRED = '*' as const;

export const NAVIGATE_LIST = [
  { id: 1, text: '마이페이지', path: '/mypage/status' },
  { id: 2, text: '스터디 관리', path: '/mypage/manage' },
  { id: 3, text: '정보 수정', path: '/mypage/edit' },
  { id: 4, text: '로그아웃', path: '/' },
] as const;

export const WEEKDAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'] as const;

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
