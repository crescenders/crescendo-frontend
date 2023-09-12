import useDeleteToken from '@hooks/useUser';
import Link from 'next/link';

type NavigateListProps = {
  text: string;
  path: string;
};

const NavigateList = ({ text, path }: NavigateListProps) => {
  const { initUserState } = useDeleteToken();

  const handleLogout = () => {
    if (text === '로그아웃') {
      initUserState();
    }
  };

  return (
    <Link href={`${path}`}>
      <li
        className="flex h-[47px] items-center justify-center bg-white px-7"
        onClick={handleLogout}
      >
        <span className="whitespace-nowrap text-16 font-medium hover:font-bold hover:text-brand">
          {text}
        </span>
      </li>
    </Link>
  );
};

export default NavigateList;
