import { atom } from 'recoil';

export const modalVisibleState = atom<boolean>({
  key: 'modalVisibleState',
  default: false,
});

export const modalComponentState = atom<React.ReactElement | ''>({
  key: 'modalComponentState',
  default: '',
});
