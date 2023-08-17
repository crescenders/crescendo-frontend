import { userState } from '@recoil/auth';
import { deleteToken } from '@utils/token';
import { useSetRecoilState } from 'recoil';

const useDeleteToken = () => {
  const setUserState = useSetRecoilState(userState);

  const initUserState = () => {
    deleteToken();
    setUserState({
      isLogin: false,
      username: '',
    });
  };

  return { initUserState };
};

export default useDeleteToken;
