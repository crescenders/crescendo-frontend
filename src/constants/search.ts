export type SelectListType = {
  id: number;
  name: SortType;
};

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

export const LEFT_SELECT_OPTION: SelectListType[] = [
  { id: 1, name: '최신순' },
  { id: 2, name: '마감순' },
];

export const RIGHT_SELECT_OPTION: SelectListType[] = [
  { id: 1, name: '모집중' },
  { id: 2, name: '모집완료' },
];
