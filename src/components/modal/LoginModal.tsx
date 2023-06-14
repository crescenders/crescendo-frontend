import tw from 'tailwind-styled-components';
import ModalLayout from '@components/modal/ModalLayout';
import Image from 'next/image';
import authApi from '@apis/auth/authApi';
import { setToken } from '@utils/token';
import { useEffect, useRef } from 'react';
import useScript from '@hooks/useScript';
import { CONFIG } from '@config';
import { useRecoilState } from 'recoil';
import { userState } from '@recoil/auth';

type CredentialResponse = {
  clientId: string;
  credential: string;
  select_by: string;
};

const LoginModal = ({ isOpen, handleClose }: Modal) => {
  const [{ isLogin }, setUserInfo] = useRecoilState(userState);
  const googleSignInButton = useRef<HTMLDivElement>(null);

  const GoogleLogin = () => {
    const el = document.querySelector(
      'div[aria-labelledby="button-label"]',
    ) as HTMLDivElement;
    el.click();
  };

  const login = async (res: CredentialResponse) => {
    const { credential } = res;
    const { access_token, refresh_token }: Token = await authApi.googleLogin(
      credential,
    );
    const token = { access_token, refresh_token };
    if (token) {
      setToken(token);
      setUserInfo((info) => {
        return { ...info, isLogin: true };
      });
    } else {
      alert('로그인에 실패하였어요. 다시 시도해주세요.');
    }
  };
  useScript('https://accounts.google.com/gsi/client', () => {
    window.google.accounts.id.initialize({
      client_id: CONFIG.API_KEY.GOOGLE_CLIENT_ID,
      callback: login,
      auto_select: false,
    });
    window.google.accounts.id.renderButton(googleSignInButton.current, {
      type: 'button',
    });
  });

  useEffect(() => {
    if (isLogin) handleClose();
  }, [isLogin]);

  return (
    <ModalLayout isOpen={isOpen} handleClose={handleClose}>
      <ModalWrapper>
        <Image src={'/svg/logo_symbol.svg'} width={63} height={100} alt={''} />
        <Image
          className="mb-[66px] mt-[15px]"
          src={'/svg/logo_text.svg'}
          width={270}
          height={42}
          alt="logo"
        />
        <TextWrapper>
          <span>로그인을 하여</span>
          <span>스터디에 참여해보세요!</span>
        </TextWrapper>
        <div ref={googleSignInButton} className="hidden" />
        <Btn onClick={GoogleLogin}>
          <Image
            className="absolute left-[23px]"
            src={'/svg/google_symbol.svg'}
            width={24}
            height={24}
            alt="logo"
          />
          <span className="text-18">Google 로그인</span>
        </Btn>
        <span
          className="cursor-pointer text-[14px] underline underline-offset-2"
          onClick={handleClose}
        >
          로그인 없이 이용하기
        </span>
      </ModalWrapper>
    </ModalLayout>
  );
};

export default LoginModal;

const ModalWrapper = tw.div`
  mx-[58px]
  mb-[50px]
  mt-[38px]
  flex
  flex-col
  items-center
`;

const TextWrapper = tw.div`
  flex
  flex-col
  items-center
  justify-center
  gap-[13px]
  text-[20px]
  font-bold
  text-[#4f4f4f]
`;

const Btn = tw.div`
  bg-brand
  shadow-loginButton
  relative
  mb-[15px]
  mt-[117px]
  flex
  h-[56px]
  w-[454px]
  cursor-pointer
  items-center
  justify-center
  rounded-2xl
  font-bold
  text-white
`;
