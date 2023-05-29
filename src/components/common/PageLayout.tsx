import tw from 'tailwind-styled-components';
import Header from '@components/common/Header';

type PageLayoutProps = {
  children: React.ReactNode;
  className?: React.ComponentProps<'div'>['className'];
};

const PageLayout = ({ children, ...rest }: PageLayoutProps) => {
  return (
    <PageLayoutBox {...rest}>
      <Header />
      {children}
    </PageLayoutBox>
  );
};

export default PageLayout;

const PageLayoutBox = tw.div`
  relative
  min-h-screen
  w-full
  max-w-[1024px]
  bg-white
`;
