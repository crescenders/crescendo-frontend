import Image from 'next/image';
import Link from 'next/link';

type CardProps = {
  path: string;
  size: 'big' | 'medium' | 'small';
  isClosed?: boolean;
  disapproved?: boolean;
  img: string;
  title?: string;
  studyName: string;
  tags?: string[];
  writer?: string;
  participant?: number;
  personnel?: number;
  startDate?: string;
  endDate?: string;
  deadline?: number;
};

const Card = ({
  path,
  size,
  isClosed,
  disapproved,
  img,
  title,
  studyName,
  tags,
  writer,
  personnel,
  participant,
  startDate,
  endDate,
  deadline,
}: CardProps) => {
  return (
    <Link href={path}>
      <li
        className={`cursor-pointer list-none overflow-hidden rounded-[7px] bg-white shadow-header ${
          (size === 'big' && 'w-[210px] h-[245px]') ||
          (size === 'medium' && 'w-[187px] h-[172px]') ||
          (size === 'small' && 'h-[148px] w-[160px]')
        }`}
      >
        {size === 'medium' && disapproved && (
          <div className="absolute z-[2] h-[172px] w-[187px] rounded-[7px] bg-white/50"></div>
        )}
        <div
          className={`${
            (size === 'big' && 'w-[210px] h-[129px]') ||
            (size === 'medium' && 'w-[187px] h-[115px]') ||
            (size === 'small' && 'h-[98px] w-[160px]')
          } relative`}
        >
          {size === 'big' && !isClosed && (
            <div
              className={`absolute right-3 top-2 z-[2] flex h-[22px] w-[42px] items-center justify-center rounded-[15px] text-[10px] font-bold text-white
            ${
              deadline && deadline > 0
                ? 'bg-[#8266FF]'
                : deadline === 0
                ? 'bg-status-error'
                : ''
            } `}
            >
              {deadline && deadline > 0 && deadline < 99
                ? `D - ${deadline}`
                : deadline === 0
                ? 'D-Day'
                : deadline && deadline >= 99
                ? 'D - 99+'
                : ''}
            </div>
          )}
          <Image src={img} alt="thumbnail" fill className="object-cover" />
          {size === 'big' && isClosed && (
            <div className="absolute flex h-full w-full flex-col items-center justify-center gap-2 bg-black/50">
              <Image
                src="/svg/check_circle.svg"
                width={52}
                height={52}
                alt="check circle"
              />
              <span className="text-[28px] text-white">모집 완료</span>
            </div>
          )}
        </div>
        <div
          className={`flex flex-col ${
            (size === 'big' && 'py-[6px] px-[10px]') ||
            (size === 'medium' && 'px-[9px] py-[8px]') ||
            (size === 'small' && 'p-[8px]')
          }`}
        >
          {size === 'big' ? (
            <div className="pt-1">
              <div className="truncate text-14">{title}</div>
              <div className="my-[8px] truncate text-12">{studyName}</div>
              <ul className="flex gap-x-1">
                {tags?.slice(0, 5).map((tag) => (
                  <li key={tag} className="truncate">
                    <span className="text-[9px]">#{tag}</span>
                  </li>
                ))}
              </ul>
              <div
                className={`${
                  !tags?.length && 'mt-6'
                } flex items-center justify-between text-[12px] text-[#666666]`}
              >
                <span>{writer}</span>
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
            </div>
          ) : (
            <>
              <span
                className={`${
                  size === 'medium' ? 'text-14' : 'text-12'
                } mb-[4px] truncate font-bold`}
              >
                {studyName}
              </span>
              <span
                className={`${
                  size === 'medium' ? 'text-12' : 'text-10'
                } text-text-primary`}
              >
                {startDate} ~ {endDate}
              </span>
            </>
          )}
        </div>
      </li>
    </Link>
  );
};

export default Card;
