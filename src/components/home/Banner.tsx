import Image from 'next/image';
import { useRouter } from 'next/router';
import Lottie from 'lottie-react';
import { useState } from 'react';
import animation from '@public/animation/main.json';

const Banner = () => {
  const router = useRouter();

  const [keyword, setKeyword] = useState('');

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
    <div className="mt-[70px] h-[283px] w-full">
      <section className="flex items-center justify-evenly bg-brand">
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
          <ul className="flex h-[28px] w-[215px] cursor-pointer gap-3">
            <li
              className="rounded-[26px] bg-[#A77EC4] px-[10px] py-[5px] text-white"
              onClick={() => router.push(`/search?tags=React`)}
            >
              #React
            </li>
            <li
              className="rounded-[26px] bg-[#A77EC4] px-[10px] py-[5px] text-white"
              onClick={() => router.push(`/search?tags=Django`)}
            >
              #Django
            </li>
            <li
              className="rounded-[26px] bg-[#A77EC4] px-[10px] py-[5px] text-white"
              onClick={() => router.push(`/search?tags=Java`)}
            >
              #Java
            </li>
          </ul>
        </div>
        <div className="h-[280px] w-[300px] ">
          <Lottie animationData={animation} />
        </div>
      </section>
    </div>
  );
};

export default Banner;
