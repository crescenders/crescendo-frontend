import Image from 'next/image';
import tw from 'tailwind-styled-components';

type ProgressBarProps = {
  progress: number;
};

const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <div className="w-full max-w-[522px] rounded-full h-[10px] bg-[#C7D3EB] flex items-center">
      <div
        className={`bg-brand h-[10px] rounded-full`}
        style={{ width: `${progress}%` }}
      />
      {progress === 100 ? (
        <div className="bg-brand rounded-full w-5 h-5">
          <Image
            src={'/svg/success.svg'}
            width={20}
            height={20}
            alt="완료"
            className="relative bottom-6"
          />
        </div>
      ) : (
        <div className="bg-brand rounded-full w-5 h-5 relative right-1">
          {progress < 15 ? (
            <div className="flex flex-col items-center bottom-16 relative">
              <div className="w-[34px] h-[23px] bg-brand rounded flex justify-center items-center">
                <span className="text-white font-semibold text-12">
                  {progress}%
                </span>
              </div>
              <div className="bg-brand w-[10px] h-[10px] rotate-[135deg] relative bottom-1.5" />
            </div>
          ) : (
            <div className="flex flex-col items-center bottom-12 relative">
              <div className="w-[34px] h-[23px] bg-brand rounded flex justify-center items-center">
                <span className="text-white font-semibold text-12">
                  {progress}%
                </span>
              </div>
              <div className="bg-brand w-[10px] h-[10px] rotate-[135deg] relative bottom-1.5" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
