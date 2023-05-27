import tw from 'tailwind-styled-components';
import ModalLayout from '@components/modal/ModalLayout';
import Image from 'next/image';

const LoginModal = ({ isOpen, handleClose }: Modal) => {
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
        <Btn onClick={() => alert('clicked')}>
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
