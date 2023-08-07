import { atom } from 'recoil';

export type ToastMessageType = {
  id?: number;
  type: 'success' | 'fail';
  message: string;
};

export const toastMessageState = atom<ToastMessageType[]>({
  key: 'toastMessageState',
  default: [],
});
