import tw from 'tailwind-styled-components';

type ButtonProps = {
  text: string;
  className?: React.ComponentProps<'div'>['className'];
};

const Button = ({ text, ...rest }: ButtonProps) => {
  return <ButtonContainer {...rest}>{text}</ButtonContainer>;
};

export default Button;

const ButtonContainer = tw.div`
flex justify-center items-center whitespace-nowrap rounded-full bg-brand cursor-pointer text-white shadow-button
`;
