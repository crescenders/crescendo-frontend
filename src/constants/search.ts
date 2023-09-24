export type SortType = '최신순' | '마감순' | '모집중' | '모집완료';

export type SortStateType = {
  [key in SortType]: boolean;
};

export const SORT_OBJ: SortStateType = {
  최신순: false,
  마감순: false,
  모집중: false,
  모집완료: false,
};

export const LEFT_SELECT_OPTION = [
  { id: 1, name: '최신순', query: 'created_at' },
  { id: 2, name: '마감순', query: 'deadline' },
];

export const RIGHT_SELECT_OPTION = [
  { id: 1, name: '모집중', query: 'false' },
  { id: 2, name: '모집완료', query: 'true' },
];

export type OptionsType = typeof LEFT_SELECT_OPTION;
