import tw from 'tailwind-styled-components';
import Header from '@components/common/Header';
import { PropsWithChildren } from 'react';

type PageLayoutProps = {
  className?: React.ComponentProps<'div'>['className'];
};

const PageLayout = ({
  children,
  ...rest
}: PropsWithChildren<PageLayoutProps>) => {
  return (
    <PageLayoutBox {...rest}>
      <Header />
      {children}
    </PageLayoutBox>
  );
};

export default PageLayout;

const PageLayoutBox = tw.main`
  relative
  flex
  h-full
  w-full
  max-w-[1024px]
  flex-col
  overflow-y-auto
  bg-white
`;
