import Header from '@components/common/Header';
import { PropsWithChildren } from 'react';

type PageLayoutProps = {
  className?: React.HTMLAttributes<'main'>['className'];
};

const PageLayout = ({
  children,
  className,
  ...rest
}: PropsWithChildren<PageLayoutProps>) => {
  return (
    <>
      <Header />
      <main
        className={`flex h-full w-full max-w-5xl flex-col overflow-y-auto overflow-x-hidden bg-white px-5 ${className}`}
        {...rest}
      >
        {children}
      </main>
    </>
  );
};

export default PageLayout;
