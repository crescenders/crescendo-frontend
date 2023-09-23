import Card from '@components/common/Card';
import PageLayout from '@components/common/PageLayout';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import tw from 'tailwind-styled-components';
import Lottie from 'lottie-react';
import animation from '@public/animation/main.json';
import { categories } from '@constants/categories';

const Home = () => {
  const [keyword, setKeyword] = useState('');
  const router = useRouter();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!(e.target instanceof HTMLInputElement) || !keyword) return;
    if (e.key === 'Enter') {
      if (keyword.includes('#')) router.push(`/search?tag=${keyword}`);
      else router.push(`/search?post_title=${keyword}&study_name=${keyword}`);
    }
  };

  const DUMMY_DATALIST = [
    {
      id: 1,
      img: 'https://github.com/crescenders/crescendo-frontend/assets/87893624/d458744c-54b6-4018-9de5-ba354e6da407',
      title: '테스트 타이틀 1',
      studyName: '테스트 스터디명 1',
      writer: 'Lami',
      participant: 3,
      personnel: 5,
      tags: ['태그1', '태그2', '태그3'],
      startDate: '2023.06.04',
    },
    {
      id: 2,
      img: 'https://github.com/crescenders/crescendo-frontend/assets/87893624/777979ee-45f3-4f00-88c3-cb32119249fe',
      title: '테스트 타이틀 2',
      studyName: '테스트 스터디명 2',
      writer: 'Lami2',
      participant: 4,
      personnel: 10,
      tags: ['태그1', '태그2', '태그3'],
      startDate: '2023.06.12',
    },
    {
      id: 3,
      img: 'https://github.com/crescenders/crescendo-frontend/assets/87893624/396933ec-8d20-4faf-9412-f18e06332558',
      title: '테스트 타이틀 3',
      studyName: '테스트 스터디명 3',
      writer: 'Lami3',
      participant: 2,
      personnel: 8,
      tags: ['태그1', '태그2', '태그3'],
      startDate: '2023.06.05',
    },
    {
      id: 4,
      img: 'https://github.com/crescenders/crescendo-frontend/assets/87893624/7c2fdee4-de2f-4fef-80c6-02e51e0715ac',
      title: '테스트 타이틀 4',
      studyName: '테스트 스터디명 4',
      writer: 'Lami   4',
      participant: 3,
      personnel: 6,
      tags: ['태그1', '태그2', '태그3'],
      startDate: '2023.06.20',
    },
  ];

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
            <Link href={`/search?keyword=${keyword}`}>
              <Image
                src={'/svg/search_icon.svg'}
                width={16}
                height={16}
                alt="searchIcon"
                className="absolute bottom-[13px] right-[12px] cursor-pointer"
              />
            </Link>
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
      <div className="flex justify-center gap-[41px]">
        {DUMMY_DATALIST.map(
          ({
            id,
            img,
            title,
            studyName,
            writer,
            participant,
            personnel,
            tags,
            startDate,
          }) => (
            <Card
              key={id}
              path={`/post/${id}`}
              size="big"
              isClosed={true}
              img={img}
              title={title}
              studyName={studyName}
              writer={[]}
              participant={participant}
              personnel={personnel}
              tags={tags}
              startDate={startDate as string}
            />
          ),
        )}
      </div>
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
