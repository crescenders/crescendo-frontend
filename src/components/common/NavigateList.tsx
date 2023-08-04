import { userState } from '@recoil/auth';
import { deleteToken } from '@utils/token';
import Link from 'next/link';
import { useSetRecoilState } from 'recoil';

type NavigateListProps = {
  text: string;
  path: string;
};

const NavigateList = ({ text, path }: NavigateListProps) => {
  const setUserInfo = useSetRecoilState(userState);
  const handleLogout = () => {
    if (text === '로그아웃') {
      deleteToken();
      setUserInfo({ isLogin: false, username: '' });
    }
  };

  return (
    <Link href={`${path}`}>
      <li
        className="flex h-[47px] items-center justify-center bg-white px-7"
        onClick={handleLogout}
      >
        <span className="text-16 font-medium whitespace-nowrap hover:font-bold hover:text-brand">
          {text}
        </span>
      </li>
    </Link>
  );
};

export default NavigateList;
