import Image from 'next/image';
import { Suspense, lazy, useState } from 'react';
import NavigateList from '@components/common/NavigateList';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { userState } from '@recoil/auth';
import useIsMounted from '@hooks/useIsMounted';
import useModal from '@hooks/useModal';
import { NAVIGATE_LIST } from '@constants/index';
import Loader from '@components/common/Loader';

const LoginModal = lazy(() => import('@components/modal/LoginModal'));

const Header = () => {
  const isMounted = useIsMounted();
  const { isLogin } = useRecoilValue(userState);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { openModal } = useModal();

  if (!isMounted) return null;

  return (
    <header className="fixed z-[900] flex h-[70px] w-full max-w-[1024px] items-center justify-between bg-white px-7">
      <Link href={'/'}>
        <Image
          src="/svg/logo_light_mode.svg"
          width={124}
          height={24}
          alt="crescendo"
          className="h-[24px] w-[124px] cursor-pointer"
        />
      </Link>
      {isLogin ? (
        <div className="relative flex cursor-pointer gap-x-7">
          <span className="text-16 font-medium">스터디 개설</span>
          <div className="h-7 w-[2px] bg-[#D9D9D9]" />
          <span
            className="relative mr-5 text-16 font-bold text-brand"
            onMouseEnter={(e: React.MouseEvent<HTMLSpanElement>) => {
              e.stopPropagation();
              setIsOpen(true);
            }}
          >
            닉네임 님
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
                {NAVIGATE_LIST.map(({ id, text, path }) => (
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
    </header>
  );
};

export default Header;
