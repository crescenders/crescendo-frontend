import tw from 'tailwind-styled-components';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return <LayoutWrapper>{children}</LayoutWrapper>;
};

export default Layout;

const LayoutWrapper = tw.div`
w-screen h-full flex justify-center overflow-x-hidden 
`;
