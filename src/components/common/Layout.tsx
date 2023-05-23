import tw from 'tailwind-styled-components';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return <LayoutWrapper>{children}</LayoutWrapper>;
};

const LayoutWrapper = tw.div`
w-screen h-full flex justify-center overflow-x-hidden 
`;

export default Layout;
