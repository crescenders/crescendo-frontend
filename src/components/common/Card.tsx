import Image from 'next/image';
import Link from 'next/link';

import tw from 'tailwind-styled-components';

type CardProps = {
  path: string;
  size: 'big' | 'medium' | 'small';
  isCanApply?: boolean;
  isApprove?: boolean;
  img: string;
  title?: string;
  studyName: string;
  tag?: string;
  writer?: string;
  participant?: number;
  personnel?: number;
  startDate: string;
  endDate?: string;
};

const Card = ({
  path,
  size,
  isCanApply,
  isApprove,
  img,
  title,
  studyName,
  tag,
  writer,
  personnel,
  participant,
  startDate,
  endDate,
}: CardProps) => {
  const getDiffDate = (startDate: string) => {
    const theDate = new Date(startDate);
    const today = new Date();
    const diffTime = theDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return Math.abs(diffDays) > 0 ? Math.abs(diffDays) : 'day';
  };

  return (
    <Wrapper href={path} className={`${WrapperStyle[size]}`}>
      {size === 'medium' && !isApprove && (
        <div className="absolute z-[2] h-[172px] w-[187px] rounded-[7px] bg-white/50"></div>
      )}
      <ImageBox className={`${ImageBoxStyle[size]} relative`}>
        {size === 'big' && isCanApply && (
          <DDayBox
            className={`${
              Number(getDiffDate(startDate))
                ? 'bg-[#8266FF]'
                : 'bg-status-error'
            } `}
          >
            D - {getDiffDate(startDate)}
          </DDayBox>
        )}
        <Image src={img} alt="thumbnail" fill className="object-cover" />
        {size === 'big' && !isCanApply && (
          <div className="absolute flex h-full  w-full flex-col items-center justify-center gap-2 bg-black/50">
            <Image
              src="/svg/check_circle.svg"
              width={52}
              height={52}
              alt="check circle"
            />
            <span className="text-[28px] text-white">모집 완료</span>
          </div>
        )}
      </ImageBox>
      <InfoBox className={`${InfoBoxStyle[size]}`}>
        {size === 'big' ? (
          <>
            <div className="text-14">{title}</div>
            <div className="my-[8px] text-12">{studyName}</div>
            <div className="mb-[8px] text-[8px]">{tag}</div>
            <div className="flex items-center justify-between text-[12px] text-[#666666]">
              <div>{writer}</div>
              <div className="flex items-center justify-center gap-[5px]">
                <Image
                  src="/svg/person.svg"
                  width={10}
                  height={10}
                  alt="인원"
                />
                {participant} / {personnel}
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              className={`${
                size === 'medium' ? 'text-14' : 'text-12'
              } mb-[4px] font-bold `}
            >
              {studyName}
            </div>
            <div
              className={`${
                size === 'medium' ? 'text-12' : 'text-10'
              } text-text-primary `}
            >
              {startDate} ~ {endDate}
            </div>
          </>
        )}
      </InfoBox>
    </Wrapper>
  );
};

export default Card;

const Wrapper = tw(Link)`
  shadow-header
  cursor-pointer
  overflow-hidden
  rounded-[7px]
  bg-white
`;

const WrapperStyle = {
  big: 'w-[210px] h-[237px]',
  medium: 'w-[187px] h-[172px]',
  small: 'w-[160px] h-[148px]',
};

const ImageBox = tw.div`
  relative
`;

const ImageBoxStyle = {
  big: 'w-[210px] h-[129px]',
  medium: 'w-[187px] h-[115px]',
  small: 'w-[160px] h-[98px]',
};

const DDayBox = tw.div`
  absolute
  right-3
  top-2
  flex
  h-[22px]
  w-[42px]
  items-center
  justify-center
  rounded-[15px]
  text-[10px]
  font-bold
  text-white
`;

const InfoBox = tw.div`
  flex
  flex-col
`;

const InfoBoxStyle = {
  big: 'py-[6px] px-[10px]',
  medium: 'px-[9px] py-[8px]',
  small: 'px-[8px] py-[8px]',
};
