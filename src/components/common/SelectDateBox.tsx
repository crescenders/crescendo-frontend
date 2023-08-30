import { useState } from 'react';
import Calendar, { CalendarProps } from '@components/common/Calendar';
import { format } from 'date-fns';
import tw from 'tailwind-styled-components';
import Image from 'next/image';

const SelectDateBox = ({
  error,
  minDate,
  selectRange,
  selectedDate,
  setSelectedDate,
  selectedEndDate,
  setSelectedEndDate,
}: CalendarProps & { error: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex flex-col gap-[18px]">
      <div className="flex w-full flex-col gap-y-1">
        <div className="text-base font-bold">
          {selectRange ? '스터디 기간' : '모집 마감 날짜'}
        </div>
        <span className="h-2 w-full text-12 text-status-error">{error}</span>
      </div>

      <SelectBoxWrapper
        onClick={() => setIsOpen((prev) => !prev)}
        className={`${isOpen ? 'border-[#8266FF]' : 'border-[#E2E0E0]'} z-20`}
      >
        <Image
          src={`/svg/calendar.svg`}
          width={20}
          height={20}
          alt=""
          className="cursor-pointer"
        />
        <div className="grow pt-[2px] text-left text-[13px]">
          {selectedDate ? format(selectedDate, 'yyyy-MM-dd') : 'YYYY-MM-DD'}
          {selectRange &&
            ` ~ ${
              selectedEndDate
                ? format(selectedEndDate, 'yyyy-MM-dd')
                : 'YYYY-MM-DD'
            }`}
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
            minDate={minDate}
            selectRange={selectRange}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedEndDate={selectedEndDate}
            setSelectedEndDate={setSelectedEndDate}
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
