import tw from 'tailwind-styled-components';
import Header from '@components/common/Header';

type AuthLayoutProps = {
  children: React.ReactNode;
  className?: React.ComponentProps<'div'>['className'];
};

const AuthLayout = ({ children, ...rest }: AuthLayoutProps) => {
  return <AuthLayoutBox {...rest}>{children}</AuthLayoutBox>;
};

export default AuthLayout;

const AuthLayoutBox = tw.div`
  relative
  h-full
  w-full
  max-w-[1024px]
  bg-white
`;
