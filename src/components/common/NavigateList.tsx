import useDeleteToken from '@hooks/useDeleteToken';
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
        <span className="text-16 font-medium whitespace-nowrap hover:font-bold hover:text-brand">
          {text}
        </span>
      </li>
    </Link>
  );
};

export default NavigateList;
