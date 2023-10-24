import tw from 'tailwind-styled-components';
import Header from '@components/common/Header';
import { PropsWithChildren } from 'react';
import Banner from '@components/home/Banner';

const HomeLayout = ({ children, ...rest }: PropsWithChildren) => {
  return (
    <Container {...rest}>
      <Header />
      <Banner />
      {children}
    </Container>
  );
};

export default HomeLayout;

const Container = tw.main`
  relative
  flex
  h-full
  w-full
  flex-col
  items-center
  overflow-y-auto
  bg-white
`;
