import { useState } from 'react';
import {
  format,
  addMonths,
  subMonths,
  endOfMonth,
  startOfMonth,
  isWeekend,
  compareAsc,
  startOfToday,
  isSameDay,
} from 'date-fns';
import tw from 'tailwind-styled-components';
import Image from 'next/image';
import { WEEKDAYS } from '@constants/index';

export type CalendarProps = {
  minDate?: TDate;
  date: TDate;
  setDate: React.Dispatch<React.SetStateAction<TDate>>;
  optionalDate?: TDate;
  setOptionalDate?: React.Dispatch<React.SetStateAction<TDate>>;
};

type StyledDayProps = {
  $isWeekend?: boolean;
  $isToday: boolean;
  $compareToMinDate: number;
  $isSelected: boolean;
  $roundedStyle?: string;
};

const Calendar = ({
  minDate,
  date,
  setDate,
  optionalDate,
  setOptionalDate,
}: CalendarProps) => {
  const today = startOfToday();
  const [viewDate, setViewDate] = useState<Date>(date || today);
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDayOfMonth = startOfMonth(viewDate).getDay();
  const daysInMonth = endOfMonth(viewDate).getDate();
  const calendarDays = Array.from(
    { length: daysInMonth },
    (_, index) => index + 1,
  );

  const handleClickDate = (clickedDate: Date) => {
    if (compareAsc(clickedDate, minDate || today) <= 0) return;

    setViewDate(clickedDate);

    if (!setOptionalDate) {
      setDate(isSameDay(clickedDate, date || 0) ? null : clickedDate);
      return;
    }

    if (!date || (date && optionalDate)) {
      setDate(clickedDate);
      setOptionalDate(null);
      return;
    }

    if (isSameDay(clickedDate, date)) {
      setDate(null);
      setOptionalDate(null);
      return;
    }

    if (compareAsc(clickedDate, date) > 0) {
      setOptionalDate(clickedDate);
      return;
    }

    setDate(clickedDate);
    setOptionalDate(null);
  };

  const isDateSelected = (targetDate: Date) => {
    if (date) {
      if (optionalDate) return targetDate >= date && targetDate <= optionalDate;
      return isSameDay(targetDate, date);
    }
    return false;
  };

  const getRoundedStyle = (targetDate: Date) => {
    if (
      !setOptionalDate ||
      !optionalDate ||
      isSameDay(targetDate, today) ||
      (isSameDay(targetDate, date || 0) && targetDate.getDay() === 0) ||
      (isSameDay(targetDate, optionalDate) && targetDate.getDay() === 1)
    )
      return 'full';

    if (
      isSameDay(targetDate, date || 0) ||
      isSameDay(targetDate, startOfMonth(targetDate)) ||
      targetDate.getDay() === 1
    )
      return 'left';

    if (
      isSameDay(targetDate, optionalDate) ||
      isSameDay(targetDate, endOfMonth(targetDate)) ||
      targetDate.getDay() === 0
    )
      return 'right';
  };

  return (
    <div className="select-none">
      <div className="flex justify-between px-3 py-2 text-center">
        <Image
          src={`/svg/chevron-down.svg`}
          width={20}
          height={20}
          alt=""
          className="rotate-90 cursor-pointer"
          onClick={() => setViewDate(subMonths(viewDate, 1))}
        />
        <div>{format(viewDate, 'MMMM yyyy')}</div>
        <Image
          src={`/svg/chevron-down.svg`}
          width={20}
          height={20}
          alt=""
          className="rotate-[-90deg] cursor-pointer"
          onClick={() => setViewDate(addMonths(viewDate, 1))}
        />
      </div>
      <div className="grid grid-cols-[repeat(7,minmax(33px,auto))] text-center">
        {WEEKDAYS.map((day, index) => (
          <Day key={index} $isWeekend={[5, 6].includes(index)}>
            {day}
          </Day>
        ))}
        {Array.from(
          { length: firstDayOfMonth ? firstDayOfMonth - 1 : 6 },
          (_, index) => (
            <Day key={index} />
          ),
        )}
        {calendarDays.map((calendarDay) => {
          const day = new Date(year, month, calendarDay);

          return (
            <CalendarDay
              key={calendarDay}
              $isWeekend={isWeekend(day)}
              $isToday={isSameDay(day, today)}
              $compareToMinDate={compareAsc(day, minDate || today)}
              $isSelected={isDateSelected(day)}
              $roundedStyle={getRoundedStyle(day)}
              onClick={() => handleClickDate(day)}
            >
              {calendarDay}
            </CalendarDay>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;

const Day = tw.div<Pick<StyledDayProps, '$isWeekend'>>`
  ${({ $isWeekend }) => $isWeekend && 'text-warning'}
  flex
  aspect-square
  items-center
  justify-center
  text-center
`;

const CalendarDay = tw(Day)<StyledDayProps>`
  ${({ $isSelected }) => $isSelected && 'bg-brand text-white'}
  ${({ $roundedStyle }) =>
    ($roundedStyle === 'full' && 'rounded-full') ||
    ($roundedStyle === 'left' && 'rounded-l-full') ||
    ($roundedStyle === 'right' && 'rounded-r-full') ||
    'rounded-none'}
  ${({ $isToday }) => $isToday && 'bg-gray-200'}
  ${({ $compareToMinDate }) =>
    ($compareToMinDate === -1 && 'opacity-30') ||
    ($compareToMinDate === 1 && 'cursor-pointer')}
`;
