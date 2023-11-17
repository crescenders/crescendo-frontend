import Image from 'next/image';
import { useState } from 'react';

type MemberCardProps = {
  username: string;
  email?: string;
  requestMessage?: string;
  isLeader?: boolean;
  isCurrentUserLeader: boolean;
  handleClickCheckButton?: () => void;
  handleClickRefuseButton?: () => void;
};

const MemberCard = ({
  username,
  email,
  requestMessage,
  isLeader,
  isCurrentUserLeader,
  handleClickCheckButton,
  handleClickRefuseButton,
}: MemberCardProps) => {
  const [isReadMore, setIsReadMore] = useState(false);

  return (
    <div
      className={`relative flex w-[342px] flex-col justify-between gap-3 rounded-lg border border-[#F2F2F2] px-[14px] py-[12px] ${
        isLeader && 'border-brand'
      }`}
    >
      <div className="flex w-full cursor-default flex-col gap-0">
        <div className="flex w-full justify-between gap-2">
          <div className="shrink truncate text-sm/6 font-bold">{username}</div>
          <div className="flex gap-[6px]">
            {requestMessage && (
              <button
                onClick={handleClickCheckButton}
                className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2B2D31]"
              >
                <Image
                  className="cursor-pointer brightness-200 grayscale hover:brightness-100 hover:grayscale-0"
                  src="/svg/check.svg"
                  width={14}
                  height={14}
                  alt=""
                />
              </button>
            )}
            {!isLeader && isCurrentUserLeader && (
              <button
                onClick={handleClickRefuseButton}
                className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2B2D31]"
              >
                <Image
                  className="cursor-pointer brightness-200 grayscale hover:brightness-100 hover:grayscale-0"
                  src="/svg/cross.svg"
                  width={14}
                  height={14}
                  alt=""
                />
              </button>
            )}
          </div>
        </div>
        {email && (
          <span className="text-[10px] text-text-primary">({email})</span>
        )}
      </div>
      {requestMessage && (
        <div className="text-12 text-text-secondary">
          {!isReadMore && requestMessage.length > 50
            ? requestMessage.slice(0, 50)
            : requestMessage}
          {requestMessage.length > 50 && (
            <span
              className="cursor-pointer text-text-primary hover:underline"
              onClick={() => setIsReadMore((prev) => !prev)}
            >
              {isReadMore ? '접기' : ' ...더보기'}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default MemberCard;
