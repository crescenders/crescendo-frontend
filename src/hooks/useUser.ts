import { userState } from '@recoil/auth';
import { deleteCookie } from '@utils/cookie';
import { deleteToken } from '@utils/token';
import { useSetRecoilState } from 'recoil';

const useUser = () => {
  const setUserState = useSetRecoilState(userState);

  const initUserState = () => {
    deleteToken();
    deleteCookie('refreshToken');
    setUserState({
      uuid: '',
      username: '',
    });
  };

  return { initUserState };
};

export default useUser;
