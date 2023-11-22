import { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  isNormal?: boolean;
};

const Button = ({ text, isNormal, className, ...rest }: ButtonProps) => {
  return isNormal ? (
    <button
      {...rest}
      className={`${
        (text === '취소' && 'bg-white text-black') ||
        (text === '삭제' && 'bg-warning text-white')
      } flex h-[39px] w-[105px] cursor-pointer items-center justify-center whitespace-nowrap rounded-full border-[1px] border-text-primary text-[14px] font-bold ${className}`}
    >
      {text}
    </button>
  ) : (
    <button
      {...rest}
      className={`flex cursor-pointer items-center justify-center whitespace-nowrap rounded-full bg-brand text-[14px] text-white shadow-button ${className} `}
    >
      {text}
    </button>
  );
};

export default Button;
