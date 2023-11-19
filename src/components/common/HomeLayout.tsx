import Header from '@components/common/Header';
import { PropsWithChildren } from 'react';
import Banner from '@components/home/Banner';
import Footer from '@components/common/Footer';

const HomeLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="relative flex h-full w-full flex-col items-center overflow-y-auto bg-white">
      <Header />
      <Banner />
      {children}
      <Footer />
    </main>
  );
};

export default HomeLayout;
