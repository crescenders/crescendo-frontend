import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import animation from '@public/animation/main.json';
import { useGetTags } from '@hooks/queries/useGetTags';
import dynamic from 'next/dynamic';
import { getDevice } from '@utils/getDevice';

const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
});

const Banner = () => {
  const router = useRouter();
  const isMobile = getDevice();
  const { data: tags } = useGetTags();

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
    <div className="mt-[70px] flex min-h-[283px] w-full items-center bg-brand">
      <section className="mx-auto my-0 flex w-full max-w-[1200px] items-center justify-between gap-x-10 px-12">
        <div className="flex flex-col justify-center">
          <h1 className="text-[32px] font-bold text-white max-md:text-[20px]">
            관심있는 스터디를 검색해보세요!
          </h1>
          <div className="relative mb-[19px] mr-5 mt-[34px] w-full pr-5">
            <input
              onChange={onChange}
              onKeyDown={onKeyDown}
              value={keyword}
              type="text"
              placeholder="제목, 스터디명 또는 태그를 검색해주세요."
              className="relative h-[40px] w-full rounded-xl bg-white py-[10px] pl-[12px] pr-[32px] focus:outline-none max-md:text-13"
            />
            <Image
              src={'/svg/search_icon.svg'}
              width={16}
              height={16}
              alt="searchIcon"
              className="absolute right-8 top-3 cursor-pointer"
              onClick={handleSearchClick}
            />
            <ul className="mt-5 flex h-7 w-full cursor-pointer gap-3">
              {tags?.map(({ name }) => (
                <li
                  key={name}
                  className="flex w-fit items-center justify-center overflow-hidden whitespace-nowrap rounded-[26px] bg-[#A77EC4] px-3 py-0.5 text-15 text-white"
                  onClick={() => router.push(`/search?tags=${name}`)}
                >
                  #{name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {isMobile === 'desktop' && (
          <div className="flex h-[280px] max-w-[300px] items-center">
            <Lottie animationData={animation} />
          </div>
        )}
      </section>
    </div>
  );
};

export default Banner;
