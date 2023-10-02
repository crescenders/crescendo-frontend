import PageLayout from '@components/common/PageLayout';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import tw from 'tailwind-styled-components';
import Lottie from 'lottie-react';
import animation from '@public/animation/main.json';
import { categories } from '@constants/categories';
import HomeStudyList from '@components/home/HomeStudyList';

const Home = () => {
  const [keyword, setKeyword] = useState('');
  const router = useRouter();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleSearchClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!(e.target instanceof HTMLImageElement)) return;

    if (!keyword) router.push('/search');
    else if (keyword.startsWith('#'))
      router.push(`/search?tags=${keyword.replace('#', '')}`);
    else router.push(`/search?post_title=${keyword}&study_name=${keyword}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!(e.target instanceof HTMLInputElement)) return;

    if (e.key === 'Enter') {
      if (!keyword) router.push('/search');
      else if (keyword.startsWith('#'))
        router.push(`/search?tags=${keyword.replace('#', '')}`);
      else router.push(`/search?post_title=${keyword}&study_name=${keyword}`);
    }
  };

  return (
    <PageLayout>
      <div className="mt-[70px] flex h-[283px] w-full items-center justify-between bg-brand pl-[38px] pr-[150px]">
        <div className="flex flex-col justify-center">
          <h1 className="text-[32px] font-bold text-white">
            관심있는 스터디를 검색해보세요!
          </h1>
          <div className="relative mb-[19px] mt-[34px] w-fit">
            <input
              onChange={onChange}
              onKeyDown={onKeyDown}
              value={keyword}
              type="text"
              placeholder="제목, 스터디명 또는 태그를 검색해주세요."
              className="h-[40px] w-[368px] rounded-xl bg-white py-[10px] pl-[12px] pr-[32px] focus:outline-none"
            />
            <Image
              src={'/svg/search_icon.svg'}
              width={16}
              height={16}
              alt="searchIcon"
              className="absolute bottom-[13px] right-[12px] cursor-pointer"
              onClick={handleSearchClick}
            />
          </div>
          <div className="flex h-[28px] w-[215px] cursor-pointer gap-3">
            <Tag onClick={() => router.push(`/search?tags=React`)}>#React</Tag>
            <Tag onClick={() => router.push(`/search?tags=Django`)}>
              #Django
            </Tag>
            <Tag onClick={() => router.push(`/search?tags=Java`)}>#Java</Tag>
          </div>
        </div>
        <div className="h-[280px] w-[300px] ">
          <Lottie animationData={animation} />
        </div>
      </div>
      <div className="mb-[35px] mt-[46px] flex h-[80px] items-center justify-center gap-[22px]">
        {categories.map(
          ({ id, emoji, name }) =>
            emoji && (
              <Category href={`/search?categories=${name}`} key={id}>
                <Image src={emoji} alt="emoji" width={30} height={30} />
                <span>{name}</span>
              </Category>
            ),
        )}
      </div>
      <HomeStudyList />
    </PageLayout>
  );
};

export default Home;

const Tag = tw.div`
  rounded-[26px]
  bg-[#A77EC4]
  px-[10px]
  py-[5px]
  text-white
`;

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

const StudyListContainer = tw.div`
  flex
  w-full
  flex-wrap
  items-center
  justify-center
  gap-8
  pb-8
`;
