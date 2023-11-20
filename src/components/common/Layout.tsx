import { modalComponentState, modalVisibleState } from '@recoil/modal';
import { useRecoilValue } from 'recoil';
import { PropsWithChildren } from 'react';
import Toast from '@components/common/Toast';

const Layout = ({ children }: PropsWithChildren) => {
  const isModal = useRecoilValue(modalVisibleState);
  const modalComponent = useRecoilValue(modalComponentState);

  return (
    <div
      className="flex w-screen justify-center overflow-x-hidden"
      style={{ height: '100svh' }}
    >
      {children}
      {isModal && modalComponent}
      <Toast />
    </div>
  );
};

export default Layout;
