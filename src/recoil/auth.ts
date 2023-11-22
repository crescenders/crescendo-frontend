import { atom } from 'recoil';

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue =
      typeof window !== 'undefined' ? localStorage.getItem(key) : null;

    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: any, _: any, isReset: boolean) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const userState = atom<{
  uuid: string;
  username: string;
}>({
  key: 'user',
  default: {
    uuid: '',
    username: '',
  },
  effects: [localStorageEffect('user')],
});
