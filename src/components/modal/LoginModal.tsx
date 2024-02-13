import ModalPortal from '@components/modal/ModalPortal';
import Image from 'next/image';
import authApi from '@apis/auth/authApi';
import { setToken } from '@utils/token';
import { useRef } from 'react';
import useScript from '@hooks/useScript';
import { useSetRecoilState } from 'recoil';
import { userState } from '@recoil/auth';
import useModal from '@hooks/useModal';
import userApi from '@apis/user/userApi';
import { setCookie } from '@utils/cookie';

export type CredentialResponse = {
  clientId: string;
  credential: string;
  select_by: string;
};

const LoginModal = () => {
  const setUserInfo = useSetRecoilState(userState);
  const googleSignInButton = useRef<HTMLDivElement>(null);
  const { closeModal } = useModal();

  const handleClickButton = () => {
    const el = document.querySelector(
      'div[aria-labelledby="button-label"]',
    ) as HTMLDivElement;
    el?.click();
  };

  const handleGoogleLogin = async (res: CredentialResponse) => {
    const { credential } = res;
    const { access, refresh }: Token = await authApi.googleLogin(credential);
    const token = { access, refresh };
    if (token) {
      setToken({ accessToken: access });
      setCookie('refreshToken', refresh);
      const { uuid, username } = await userApi.getUser();
      setUserInfo({ uuid, username });
      closeModal();
    }
  };
  useScript('https://accounts.google.com/gsi/client', () => {
    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID,
      callback: handleGoogleLogin,
      auto_select: false,
    });
    window.google.accounts.id.renderButton(googleSignInButton.current, {
      type: 'button',
    });
  });

  return (
    <ModalPortal>
      <div className="mx-[58px] mb-[50px] mt-[38px] flex flex-col items-center">
        <Image src={'/svg/logo_symbol.svg'} width={63} height={100} alt={''} />
        <Image
          className="mb-[66px] mt-[15px]"
          src={'/svg/logo_text.svg'}
          width={270}
          height={42}
          alt="logo"
        />
        <div className="flex flex-col items-center justify-center gap-[13px] text-[20px] font-bold tracking-tight text-[#4f4f4f]">
          <span>로그인을 하여</span>
          <span>스터디에 참여해보세요!</span>
        </div>
        <div ref={googleSignInButton} className="hidden" />
        <button
          onClick={handleClickButton}
          className="relative mt-[117px] flex h-[56px] w-[454px] cursor-pointer items-center justify-center rounded-2xl bg-brand font-bold tracking-tight text-white shadow-loginButton hover:opacity-80"
        >
          <Image
            className="absolute left-[23px]"
            src={'/svg/google_symbol.svg'}
            width={24}
            height={24}
            alt="logo"
          />
          <span className="text-18">Google 로그인</span>
        </button>
        <button
          onClick={closeModal}
          className="relative mt-[15px] flex h-[56px] w-[454px] cursor-pointer items-center justify-center rounded-2xl bg-[#F3F4F8] font-bold tracking-tight text-text-secondary shadow-loginButton hover:bg-[rgba(161,184,255,0.2)]"
        >
          로그인 없이 이용하기
        </button>
      </div>
    </ModalPortal>
  );
};

export default LoginModal;
