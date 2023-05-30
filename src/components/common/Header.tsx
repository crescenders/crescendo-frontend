import Image from 'next/image';
import { useState } from 'react';
import LoginModal from '@components/modal/LoginModal';
import NavigateList, {
  NavigateListType,
} from '@components/common/NavigateList';

const NAVIGATE_LIST: NavigateListType[] = [
  { id: 1, text: '마이페이지', path: '/mypage' },
  { id: 2, text: '스터디 관리', path: '' },
  { id: 3, text: '로그아웃', path: '' },
];

const Header = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);

  return (
    <header className="flex h-[70px] w-full items-center justify-between bg-white px-7">
      <Image
        src="/svg/logo_light_mode.svg"
        width={124}
        height={24}
        alt="crescendo"
        className="h-[24px] w-[124px] cursor-pointer"
      />
      {isLogin ? (
        <div className="flex cursor-pointer gap-x-5 text-16 font-bold text-brand">
          <span>스터디 개설</span>
          <span
            onMouseEnter={(e: React.MouseEvent<HTMLSpanElement>) => {
              e.stopPropagation();
              setIsOpen(true);
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLSpanElement>) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
          >
            닉네임
          </span>
        </div>
      ) : (
        <span
          className="cursor-pointer text-16 font-bold text-brand"
          onClick={() => setIsModal(true)}
        >
          로그인 / 회원가입
        </span>
      )}
      {isOpen && (
        <ul className="absolute right-4 top-12 flex flex-col gap-y-[1px] bg-[#D1D1D1] shadow-xl">
          {NAVIGATE_LIST.map(({ id, text, path }) => (
            <NavigateList key={id} text={text} path={path} />
          ))}
        </ul>
      )}
      {isModal && (
        <LoginModal isOpen={isModal} handleClose={() => setIsModal(false)} />
      )}
    </header>
  );
};

export default Header;
