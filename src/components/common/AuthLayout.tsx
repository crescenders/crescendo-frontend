import { PropsWithChildren } from 'react';

type AuthLayoutProps = {
  className?: React.ComponentProps<'div'>['className'];
};

const AuthLayout = ({
  children,
  ...rest
}: PropsWithChildren<AuthLayoutProps>) => {
  return (
    <main
      className="relative flex h-full w-full max-w-[1024px] flex-col items-center bg-white"
      {...rest}
    >
      {children}
    </main>
  );
};

export default AuthLayout;
