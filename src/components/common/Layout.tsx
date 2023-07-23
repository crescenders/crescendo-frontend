import { modalComponentState, modalVisibleState } from '@recoil/modal';
import { useRecoilValue } from 'recoil';
import tw from 'tailwind-styled-components';
import { PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => {
  const isModal = useRecoilValue(modalVisibleState);
  const modalComponent = useRecoilValue(modalComponentState);
  return (
    <LayoutWrapper>
      {children}
      {isModal && modalComponent}
    </LayoutWrapper>
  );
};

export default Layout;

const LayoutWrapper = tw.div`
  flex
  h-full
  w-screen
  justify-center
  overflow-x-hidden
`;
