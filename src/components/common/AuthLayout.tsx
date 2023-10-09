import { PropsWithChildren } from 'react';
import tw from 'tailwind-styled-components';

type AuthLayoutProps = {
  className?: React.ComponentProps<'div'>['className'];
};

const AuthLayout = ({
  children,
  ...rest
}: PropsWithChildren<AuthLayoutProps>) => {
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
