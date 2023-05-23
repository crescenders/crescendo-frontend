import tw from 'tailwind-styled-components';

type PageLayoutProps = {
  children: React.ReactNode;
};

const PageLayout = ({ children, ...rest }: PageLayoutProps) => {
  return <PageLayoutWrapper {...rest}>{children}</PageLayoutWrapper>;
};

const PageLayoutWrapper = tw.div`
relative w-full min-h-screen max-w-[1024px] bg-white
`;

export default PageLayout;
