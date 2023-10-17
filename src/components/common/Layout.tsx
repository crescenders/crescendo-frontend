import { modalComponentState, modalVisibleState } from '@recoil/modal';
import { useRecoilValue } from 'recoil';
import tw from 'tailwind-styled-components';
import { PropsWithChildren } from 'react';
import Toast from '@components/common/Toast';

const Layout = ({ children }: PropsWithChildren) => {
  const isModal = useRecoilValue(modalVisibleState);
  const modalComponent = useRecoilValue(modalComponentState);

  return (
    <LayoutContainer style={{ height: '100svh' }}>
      {children}
      {isModal && modalComponent}
      <Toast />
    </LayoutContainer>
  );
};

export default Layout;

const LayoutContainer = tw.div`
  flex
  w-screen
  justify-center
  overflow-hidden
`;
