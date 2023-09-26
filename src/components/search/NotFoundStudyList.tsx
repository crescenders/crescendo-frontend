import { useRouter } from 'next/router';

type NotFoundStudyListProps = {
  keyword: string;
};

const NotFoundStudyList = ({ keyword }: NotFoundStudyListProps) => {
  const router = useRouter();

  return (
    <div className="flex w-full select-none flex-col items-center justify-center">
      {keyword ? (
        <p className="tracking-[-0.8px]">
          &apos;<span className="font-bold">{keyword}</span>
          &apos; 검색 결과를 찾을 수 없어요😭
        </p>
      ) : (
        <p className="tracking-[-0.8px]">검색 결과를 찾을 수 없어요😭</p>
      )}
      <p className="mt-3 text-13 text-text-primary">
        모집 중인 모든 스터디를 둘러보세요!
      </p>
      <button
        className="mt-8 h-[34px] w-[100px] rounded bg-[#9455D3]"
        onClick={() => router.replace('/search')}
      >
        <span className="text-14 font-bold text-white">전체 보기</span>
      </button>
      <div className="mt-[88px] h-[80px] w-[286px] rounded-md bg-[rgba(0,23,88,0.05)] px-4 py-3 text-13 tracking-[-0.8px]">
        <p className=" font-bold">이렇게 해보세요.</p>
        <li className="pl-1">검색어를 올바르게 입력했는지 확인해 주세요.</li>
        <li className="pl-1">태그를 이렇게 검색해보세요. (예: #태그)</li>
      </div>
    </div>
  );
};

export default NotFoundStudyList;
