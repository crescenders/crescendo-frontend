import Image from 'next/image';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { dateState } from '@recoil/date';
import Calendar from '@components/common/Calendar';
import { formatDate } from '@utils/formatUTC';
import useClickAway from '@hooks/useClickAway';

type SelectDateBoxProps = {
  isRange?: boolean;
  error: string;
};

const SelectDateBox = ({ isRange, error }: SelectDateBoxProps) => {
  const [selectedDate, setSelectedDate] = useRecoilState(dateState);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useClickAway<HTMLDivElement>(() => setIsOpen(false));

  return (
    <div className="relative flex flex-col gap-[18px]">
      <div className="flex w-full flex-col gap-y-1">
        <div className="text-base font-bold">
          {isRange ? '스터디 기간' : '모집 마감 날짜'}
        </div>
        <span className="h-2 w-full text-12 text-status-error">{error}</span>
      </div>
      <div ref={ref}>
        <button
          type="button"
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
          className={`${
            isOpen ? 'border-[#8266FF]' : 'border-[#E2E0E0]'
          } relative z-20 flex w-[260px] cursor-pointer items-center justify-between gap-2 rounded-[7px] border-[1px] bg-white py-[14px] pl-[16px] pr-[10px]`}
        >
          <Image
            src={`/svg/calendar.svg`}
            width={20}
            height={20}
            alt=""
            className="cursor-pointer"
          />
          <div className="grow pt-[2px] text-left text-[12px]">
            {isRange
              ? `${formatDate(selectedDate.start_date)}
                ~ ${formatDate(selectedDate.end_date)}`
              : formatDate(selectedDate.deadline)}
          </div>
          <Image
            src={`/svg/arrow_down.svg`}
            width={24}
            height={24}
            alt=""
            className={`duration-300 ease-in-out ${
              isOpen && 'rotate-[-180deg]'
            }`}
          />
        </button>
        {isOpen && (
          <div
            className={`absolute right-0 top-[115px] z-10 rounded-lg bg-white p-4 shadow-base ${
              isOpen && 'animate-slideDown'
            }`}
          >
            {isRange ? (
              <Calendar
                minDate={selectedDate.deadline}
                date={selectedDate.start_date}
                setDate={(startDate) =>
                  setSelectedDate((prev) => {
                    return { ...prev, start_date: startDate };
                  })
                }
                optionalDate={selectedDate.end_date}
                setOptionalDate={(endDate) => {
                  setSelectedDate((prev) => {
                    return { ...prev, end_date: endDate };
                  });
                  endDate && setIsOpen(false);
                }}
              />
            ) : (
              <Calendar
                date={selectedDate.deadline}
                setDate={(deadline) => {
                  setSelectedDate((prev) => {
                    if (!deadline || !prev.start_date)
                      return { ...prev, deadline };
                    return {
                      ...(deadline >= prev.start_date
                        ? {
                            start_date: null,
                            end_date: null,
                          }
                        : prev),
                      deadline,
                    };
                  });
                  setIsOpen(false);
                }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectDateBox;
