import authApi from '@apis/auth/authApi';
import userApi from '@apis/user/userApi';
import AuthLayout from '@components/common/AuthLayout';
import { CredentialResponse } from '@components/modal/LoginModal';
import useScript from '@hooks/useScript';
import useUser from '@hooks/useUser';
import { userState } from '@recoil/auth';
import { setCookie } from '@utils/cookie';
import { setToken } from '@utils/token';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { useSetRecoilState } from 'recoil';

const Login = () => {
  const { initUserState } = useUser();
  const setUserInfo = useSetRecoilState(userState);
  const googleSignInButton = useRef<HTMLDivElement>(null);

  const router = useRouter();

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
      router.back();
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

  useEffect(() => {
    initUserState();
  }, []);

  return (
    <AuthLayout>
      <div className="flex h-full w-full flex-col items-center justify-center px-5">
        <Image
          src="/svg/logo_symbol_small.svg"
          width={203}
          height={130}
          alt=""
        />
        <span className="mt-[85px] whitespace-pre-wrap text-center text-[20px] font-bold leading-9 tracking-tight text-[#4f4f4f]">
          {'로그인을 하여 스터디에 \n 참여해보세요!'}
        </span>
        <div ref={googleSignInButton} className="hidden" />
        <button
          onClick={handleClickButton}
          className="relative mt-[117px] flex h-[56px] w-full max-w-[454px] cursor-pointer items-center justify-center rounded-2xl bg-brand font-bold tracking-tight text-white shadow-loginButton hover:opacity-80"
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
          onClick={() => router.back()}
          className="relative mt-[15px] flex h-[56px] w-full max-w-[454px] cursor-pointer items-center justify-center rounded-2xl bg-[#F3F4F8] font-bold tracking-tight text-text-secondary shadow-loginButton hover:bg-[rgba(161,184,255,0.2)]"
        >
          로그인 없이 이용하기
        </button>
      </div>
    </AuthLayout>
  );
};

export default Login;
