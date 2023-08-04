import Image from 'next/image';
import { useState } from 'react';
import NavigateList from '@components/common/NavigateList';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { userState } from '@recoil/auth';
import useIsMounted from '@hooks/useIsMounted';
import useModal from '@hooks/useModal';
import LoginModal from '@components/modal/LoginModal';
import { NAVIGATE_LIST } from '@constants/index';

const Header = () => {
  const isMounted = useIsMounted();
  const { isLogin } = useRecoilValue(userState);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { openModal } = useModal();

  if (!isMounted) return null;

  return (
    <header className="fixed flex h-[70px] w-full max-w-[1024px] items-center justify-between bg-white px-7 z-[900]">
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
        <div className="flex cursor-pointer gap-x-7 relative">
          <span className="text-16 font-medium">스터디 개설</span>
          <div className="w-[2px] h-7 bg-[#D9D9D9]" />
          <span
            className="text-16 font-bold text-brand mr-5 relative"
            onMouseEnter={(e: React.MouseEvent<HTMLSpanElement>) => {
              e.stopPropagation();
              setIsOpen(true);
            }}
          >
            닉네임 님
          </span>
          {isOpen && (
            <div className="absolute flex items-center flex-col top-[50px] left-2/4">
              <div className="relative w-4 h-4 bg-white rotate-[135deg] top-2 shadow-sm" />
              <ul
                className="flex flex-col gap-y-[1px] bg-[#D1D1D1] shadow-xl z-10"
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
          onClick={() => openModal(<LoginModal />)}
          // TODO: 코드 스플리팅 하는 게 맞을까 ..
        >
          로그인 / 회원가입
        </span>
      )}
    </header>
  );
};

export default Header;
