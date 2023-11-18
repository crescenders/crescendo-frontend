import Image from 'next/image';
import { Suspense, lazy, useState } from 'react';
import NavigateList from '@components/common/NavigateList';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { userState } from '@recoil/auth';
import useModal from '@hooks/useModal';
import { NAVIGATE_LIST } from '@constants/index';
import Loader from '@components/common/Loader';
import useIsMounted from '@hooks/useIsMounted';

const LoginModal = lazy(() => import('@components/modal/LoginModal'));

const Header = () => {
  const { username } = useRecoilValue(userState);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { openModal } = useModal();
  const isMounted = useIsMounted();

  return (
    <header className="fixed inset-x-0 top-0 z-[900] flex h-[70px] w-full items-center bg-white">
      <nav className="mx-auto my-0 flex w-full max-w-[1200px] items-center justify-between px-7">
        <Link href={'/'}>
          <Image
            src="/svg/logo_light_mode.svg"
            width={124}
            height={24}
            alt="crescendo"
            className="h-[24px] w-[124px] cursor-pointer"
          />
        </Link>
        {username && isMounted ? (
          <div className="relative flex cursor-pointer gap-x-7">
            <Link href={'/create'}>
              <span className="text-16 font-medium">스터디 개설</span>
            </Link>
            <div className="h-7 w-[2px] bg-[#D9D9D9]" />
            <span
              className="relative mr-5 text-16 font-bold text-brand"
              onMouseEnter={(e: React.MouseEvent<HTMLSpanElement>) => {
                e.stopPropagation();
                setIsOpen(true);
              }}
            >
              {username} 님
            </span>
            {isOpen && (
              <div className="absolute left-2/4 top-[50px] flex flex-col items-center">
                <div className="relative top-2 h-4 w-4 rotate-[135deg] bg-white shadow-sm" />
                <ul
                  className="z-10 flex flex-col gap-y-[1px] bg-[#D1D1D1] shadow-xl"
                  onMouseLeave={(e: React.MouseEvent<HTMLSpanElement>) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                >
                  {isMounted &&
                    NAVIGATE_LIST.map(({ id, text, path }) => (
                      <NavigateList key={id} text={text} path={path} />
                    ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <span
            className="cursor-pointer text-16 font-bold text-brand"
            onClick={() =>
              openModal(
                <Suspense fallback={<Loader isFull />}>
                  <LoginModal />
                </Suspense>,
              )
            }
          >
            로그인 / 회원가입
          </span>
        )}
      </nav>
    </header>
  );
};

export default Header;
