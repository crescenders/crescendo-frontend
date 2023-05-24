import { createPortal } from 'react-dom';
import tw from 'tailwind-styled-components';

type LayoutProps = {
  children: React.ReactNode;
  isOpen: boolean;
  close: () => void;
};

const Layout = ({ children, isOpen, close }: LayoutProps) => {
  const handleClick = () => {
    close();
  };

  const portalDiv = document.querySelector('#modal-root');
  if (!portalDiv) return null;

  return (
    <>
      {isOpen &&
        createPortal(
          <Wrapper>
            <Overlay onClick={handleClick} />
            <Box>{children}</Box>
          </Wrapper>,
          portalDiv,
        )}
    </>
  );
};

export default Layout;

const Wrapper = tw.div`
  fixed
  left-0
  top-0
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
