import Image from 'next/image';

type ProgressBarProps = {
  progress: number;
};

const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <div className="relative mt-4 flex h-[10px] w-full max-w-[522px] items-center rounded-full bg-[#C7D3EB]">
      <div className="absolute bottom-5 left-0 flex items-center gap-x-1">
        <Image
          src="/svg/run.svg"
          width={28}
          height={28}
          alt="progress"
          className="mb-1 scale-x-[-1]"
        />
        <span className="text-14 font-bold text-brand">진행도</span>
      </div>
      <div
        className="relative h-[10px] rounded-full bg-brand"
        style={{ width: `${progress}%` }}
      />
      {progress === 100 ? (
        <div className="absolute right-0 h-5 w-5 rounded-full bg-brand">
          <Image
            src={'/svg/success.svg'}
            width={20}
            height={20}
            alt="완료"
            className="relative bottom-6"
          />
        </div>
      ) : (
        <div className="relative right-1 h-5 w-5 rounded-full bg-brand">
          {progress < 15 ? (
            <div className="relative bottom-16 flex flex-col items-center">
              <div className="flex h-[23px] w-[34px] items-center justify-center rounded bg-brand">
                <span className="text-12 font-semibold text-white">
                  {progress}%
                </span>
              </div>
              <div className="relative bottom-1.5 h-[10px] w-[10px] rotate-[135deg] bg-brand" />
            </div>
          ) : (
            <div className="relative bottom-12 flex flex-col items-center">
              <div className="flex h-[23px] w-[34px] items-center justify-center rounded bg-brand">
                <span className="text-12 font-semibold text-white">
                  {progress}%
                </span>
              </div>
              <div className="relative bottom-1.5 h-[10px] w-[10px] rotate-[135deg] bg-brand" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
