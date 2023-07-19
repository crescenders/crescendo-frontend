import { ButtonHTMLAttributes } from 'react';
import tw from 'tailwind-styled-components';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  isNormal?: boolean;
};

type StyledButtonProps = {
  $text: string;
};

const Button = ({ text, isNormal, ...rest }: ButtonProps) => {
  return isNormal ? (
    <NormalButton {...rest} $text={text}>
      {text}
    </NormalButton>
  ) : (
    <PurpleButton {...rest}>{text}</PurpleButton>
  );
};

export default Button;

const PurpleButton = tw.button`
  bg-brand
  shadow-button
  flex
  cursor-pointer
  items-center
  justify-center
  whitespace-nowrap
  rounded-full
  text-[14px]
  text-white
`;

const NormalButton = tw.button<StyledButtonProps>`
  ${({ $text }) =>
    ($text === '취소' && 'bg-white text-black') ||
    ($text === '삭제' && 'text-white bg-warning')}
  border-text-primary
  flex
  h-[39px]
  w-[105px]
  cursor-pointer
  items-center
  justify-center
  whitespace-nowrap
  rounded-full
  border-[1px]
  text-[14px]
  font-bold
`;
