import { useRouter } from 'next/router';
import Image from 'next/image';

type NotFoundProps = {
  reset?: () => void;
};

const NotFound = ({ reset }: NotFoundProps) => {
  const router = useRouter();

  const handleHomeButton = () => {
    reset?.();
    router.replace('/');
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-11">
      <Image
        className="animate-neon"
        src="/svg/logo_symbol.svg"
        width={120}
        height={200}
        alt="logo"
      />
      <div className="mb-10 flex flex-col items-center justify-center gap-4">
        <p className="text-20 font-bold">페이지를 찾을 수 없습니다</p>
        <p className="text-16 font-bold text-text-primary">
          404 Page not found
        </p>
      </div>
      <button
        className="rounded-md bg-[#6B21A8] focus:outline-none"
        onClick={handleHomeButton}
      >
        <div className="translate-y-[-4px] whitespace-nowrap rounded-md bg-[#9333EA] px-4 py-2 text-center text-16 font-bold text-white transition-transform ease-out hover:translate-y-[-6px] active:translate-y-[-2px]">
          홈으로 가기
        </div>
      </button>
    </div>
  );
};

export default NotFound;
