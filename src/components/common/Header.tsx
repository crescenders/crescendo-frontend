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
import useClickAway from '@hooks/useClickAway';
import { getDevice } from '@utils/getDevice';
import { useRouter } from 'next/router';

const LoginModal = lazy(() => import('@components/modal/LoginModal'));

const Header = () => {
  const { username } = useRecoilValue(userState);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { openModal } = useModal();
  const isMounted = useIsMounted();
  const router = useRouter();
  const isMobile = getDevice();

  const ref = useClickAway<HTMLSpanElement>(() => setIsOpen(false));

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
        {isMounted &&
          (username ? (
            <span
              ref={ref}
              className="relative mr-5 cursor-pointer whitespace-nowrap text-16 font-bold text-brand max-md:mr-0 max-md:text-13"
              onMouseEnter={(e: React.MouseEvent<HTMLSpanElement>) => {
                e.stopPropagation();
                setIsOpen(true);
              }}
            >
              {username} 님
              {isOpen && (
                <ul
                  className="absolute right-0 top-10 z-10 flex max-w-[120px] flex-col rounded bg-white py-3 shadow-[0_0_5px_0_rgba(0,0,0,0.15)]"
                  onMouseLeave={(e: React.MouseEvent<HTMLSpanElement>) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                >
                  {NAVIGATE_LIST.map(({ id, text, path }) => (
                    <NavigateList key={id} text={text} path={path} />
                  ))}
                </ul>
              )}
            </span>
          ) : (
            <span
              className="cursor-pointer text-16 font-bold text-brand"
              onClick={() =>
                isMobile === 'mobile'
                  ? router.push('/login')
                  : openModal(
                      <Suspense fallback={<Loader isFull />}>
                        <LoginModal />
                      </Suspense>,
                    )
              }
            >
              로그인 / 회원가입
            </span>
          ))}
      </nav>
    </header>
  );
};

export default Header;
