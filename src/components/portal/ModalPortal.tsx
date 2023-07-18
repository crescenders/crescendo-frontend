import useModal from '@hooks/useModal';
import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import tw from 'tailwind-styled-components';

const ModalPortal = ({ children }: PropsWithChildren) => {
  const { closeModal } = useModal();
  const portalDiv = document.querySelector('#modal-root');
  if (!portalDiv) return null;

  return (
    <>
      {createPortal(
        <Wrapper>
          <Overlay onClick={closeModal} />
          <Box>{children}</Box>
        </Wrapper>,
        portalDiv,
      )}
    </>
  );
};

export default ModalPortal;

const Wrapper = tw.div`
  fixed
  left-0
  top-0
  z-[999]
  flex
  h-full
  w-full
  items-center
  justify-center
`;

const Overlay = tw.div`
  fixed
  left-0
  top-0
  z-20
  h-screen
  w-screen
  cursor-pointer
  bg-[#333335]
  opacity-40
`;

const Box = tw.div`
  shadow-card
  z-[10000]
  h-fit
  w-fit
  rounded-[8px]
  bg-white
`;
