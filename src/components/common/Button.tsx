import tw from 'tailwind-styled-components';

type ButtonProps = {
  text: string;
  onClick?: () => void;
  className?: React.ComponentProps<'div'>['className'];
  isNormal?: boolean;
};

const Button = ({ text, onClick, isNormal, ...rest }: ButtonProps) => {
  return isNormal ? (
    <NormalButton {...rest} onClick={onClick} text={text}>
      {text}
    </NormalButton>
  ) : (
    <PurpleButton {...rest} onClick={onClick} text={text}>
      {text}
    </PurpleButton>
  );
};

export default Button;

const PurpleButton = tw.button<ButtonProps>`
flex justify-center items-center whitespace-nowrap rounded-full bg-brand cursor-pointer text-white text-[14px] shadow-button
`;

const NormalButton = tw.button<ButtonProps>`
${({ text }) =>
  (text === '취소' && 'bg-white text-black') ||
  (text === '삭제' && 'text-white bg-warning')}
flex justify-center items-center whitespace-nowrap rounded-full cursor-pointer text-[14px] w-[105px] h-[39px] border-[1px] border-text-primary font-bold
`;
