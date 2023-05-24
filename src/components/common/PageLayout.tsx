import tw from 'tailwind-styled-components';

type PageLayoutProps = {
  children: React.ReactNode;
  className?: React.ComponentProps<'div'>['className'];
};

const PageLayout = ({ children, ...rest }: PageLayoutProps) => {
  return <PageLayoutWrapper {...rest}>{children}</PageLayoutWrapper>;
};

export default PageLayout;

const PageLayoutWrapper = tw.div`
relative w-full min-h-screen max-w-[1024px] bg-white
`;