import Image from 'next/image';
import Link from 'next/link';
import { categories } from '@constants/categories';
import RandomStudyList from '@components/home/RandomStudyList';
import HomeLayout from '@components/common/HomeLayout';
import { GetServerSideProps } from 'next';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import studyApi from '@apis/study/studyApi';

const Home = () => {
  return (
    <HomeLayout>
      <section className="flex w-full max-w-[1024px] flex-col">
        <ul className="mb-[35px] mt-[46px] flex flex-wrap items-center justify-center gap-[22px]">
          {categories.map(
            ({ id, emoji, name }) =>
              emoji && (
                <Link href={`/search?categories=${name}`} key={id}>
                  <li className="flex h-[80px] w-[92px] cursor-pointer flex-col items-center justify-center gap-[10px] rounded-[19px] border-[#C4A9D8] hover:border hover:shadow-base">
                    <Image src={emoji} alt="emoji" width={30} height={30} />
                    <span>{name}</span>
                  </li>
                </Link>
              ),
          )}
        </ul>
        <RandomStudyList />
      </section>
    </HomeLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['useGetRandomStudyGroupList'],
    queryFn: () => studyApi.getStudyGroupList('?random=true'),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;
