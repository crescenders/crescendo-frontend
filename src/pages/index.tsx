import Image from 'next/image';
import Link from 'next/link';
import tw from 'tailwind-styled-components';
import { categories } from '@constants/categories';
import RandomStudyList from '@components/home/RandomStudyList';
import HomeLayout from '@components/common/HomeLayout';

const Home = () => {
  return (
    <HomeLayout>
      <Container>
        <ul className="mb-[35px] mt-[46px] flex items-center justify-center gap-[22px] flex-wrap">
          {categories.map(
            ({ id, emoji, name }) =>
              emoji && (
                <Category href={`/search?categories=${name}`} key={id}>
                  <Image src={emoji} alt="emoji" width={30} height={30} />
                  <span>{name}</span>
                </Category>
              ),
          )}
        </ul>
        <RandomStudyList />
      </Container>
    </HomeLayout>
  );
};

export default Home;

const Category = tw(Link)`
  hover:shadow-base
  flex
  h-[80px]
  w-[92px]
  cursor-pointer
  flex-col
  items-center
  justify-center
  gap-[10px]
  rounded-[19px]
  border-[#C4A9D8]
  hover:border
`;

const Container = tw.section`
  flex
  w-full
  max-w-[1024px]
  flex-col
`;
