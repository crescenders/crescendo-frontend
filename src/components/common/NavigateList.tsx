import { usePostLogout } from '@hooks/mutations/usePostLogout';
import useUser from '@hooks/useUser';
import Link from 'next/link';

type NavigateListProps = {
  text: string;
  path: string;
};

const NavigateList = ({ text, path }: NavigateListProps) => {
  const { initUserState } = useUser();
  const { mutate } = usePostLogout();

  const handleLogout = () => {
    if (text === '로그아웃') {
      mutate();
      initUserState();
    }
  };

  return text === '로그아웃' ? (
    <Link href={`${path}`}>
      <li
        className="flex w-full items-center justify-center bg-white px-6 py-3 text-black hover:bg-[rgba(40,40,40,0.1)] hover:transition-all "
        onClick={handleLogout}
      >
        <span className="whitespace-nowrap text-14 font-medium">{text}</span>
      </li>
    </Link>
  ) : (
    <Link href={`${path}`}>
      <li className="flex w-full items-center justify-center bg-white px-6 py-3 text-black hover:bg-[rgba(40,40,40,0.1)] hover:duration-500 hover:ease-in-out">
        <span className="whitespace-nowrap text-14 font-medium ">{text}</span>
      </li>
    </Link>
  );
};

export default NavigateList;
