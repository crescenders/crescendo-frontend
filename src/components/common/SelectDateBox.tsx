import { useEffect, useState } from 'react';
import Calendar from '@components/common/Calendar';
import { format, startOfDay } from 'date-fns';
import tw from 'tailwind-styled-components';
import Image from 'next/image';

type SelectDateBoxProps = {
  minDate?: string;
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  selectedEndDate?: string;
  setSelectedEndDate?: React.Dispatch<React.SetStateAction<string>>;
  error: string;
};

const SelectDateBox = ({
  error,
  minDate,
  selectedDate,
  setSelectedDate,
  selectedEndDate,
  setSelectedEndDate,
}: SelectDateBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<TDate>(null);
  const [optionalDate, setOptionalDate] = useState<TDate>(null);

  const handleClickSelectBox = () => {
    setIsOpen((prev) => !prev);
    if (isOpen) {
      setSelectedDate(date ? format(date, 'yyyy-MM-dd') : '');
      if (setSelectedEndDate)
        setSelectedEndDate(
          optionalDate ? format(optionalDate, 'yyyy-MM-dd') : '',
        );
    }
  };

  useEffect(() => {
    setDate(selectedDate ? startOfDay(new Date(selectedDate)) : null);
    setOptionalDate(
      selectedEndDate ? startOfDay(new Date(selectedEndDate)) : null,
    );
  }, [selectedDate, selectedEndDate]);

  return (
    <div className="relative flex flex-col gap-[18px]">
      <div className="flex w-full flex-col gap-y-1">
        <div className="text-base font-bold">
          {setSelectedEndDate ? '스터디 기간' : '모집 마감 날짜'}
        </div>
        <span className="h-2 w-full text-12 text-status-error">{error}</span>
      </div>

      <SelectBoxWrapper
        type="button"
        onClick={handleClickSelectBox}
        className={`${isOpen ? 'border-[#8266FF]' : 'border-[#E2E0E0]'} z-20`}
      >
        <Image
          src={`/svg/calendar.svg`}
          width={20}
          height={20}
          alt=""
          className="cursor-pointer"
        />
        <div className="grow pt-[2px] text-left text-[12px]">
          {selectedDate || 'YYYY-MM-DD'}
          {setSelectedEndDate && ` ~ ${selectedEndDate || 'YYYY-MM-DD'}`}
        </div>
        <Image
          src={`/svg/arrow_down.svg`}
          width={24}
          height={24}
          alt=""
          className={`duration-300 ease-in-out ${isOpen && 'rotate-[-180deg]'}`}
        />
      </SelectBoxWrapper>

      {isOpen && (
        <div
          className={`absolute right-0 top-[110px] z-10 rounded-lg bg-white p-4 shadow-base ${
            isOpen && 'animate-slideDown'
          }`}
        >
          <Calendar
            minDate={minDate ? new Date(minDate) : null}
            date={date}
            setDate={setDate}
            {...(setSelectedEndDate && { optionalDate, setOptionalDate })}
          />
        </div>
      )}
    </div>
  );
};

export default SelectDateBox;

const SelectBoxWrapper = tw.button`
  relative
  z-10
  flex
  w-[260px]
  cursor-pointer
  items-center
  justify-between
  gap-[8px]
  rounded-[7px]
  border-[1px]
  bg-white
  py-[14px]
  pl-[16px]
  pr-[10px]
`;
