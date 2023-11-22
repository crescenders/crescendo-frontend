import useModal from '@hooks/useModal';
import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

const ModalPortal = ({ children }: PropsWithChildren) => {
  const { closeModal } = useModal();
  const portalDiv = document.querySelector('#modal-root');
  if (!portalDiv) return null;

  return (
    <>
      {createPortal(
        <div className="fixed left-0 top-0 z-[999] flex h-full w-full items-center justify-center">
          <div
            onClick={closeModal}
            className="fixed left-0 top-0 z-20 h-screen w-screen cursor-pointer bg-[#333335] opacity-40"
          />
          <div className="z-[10000] h-fit w-fit rounded-[8px] bg-white shadow-card">
            {children}
          </div>
        </div>,
        portalDiv,
      )}
    </>
  );
};

export default ModalPortal;
