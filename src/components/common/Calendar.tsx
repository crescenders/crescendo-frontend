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
import { WEEKDAYS } from '@constants/weekdays';

export type CalendarProps = {
  minDate?: Date | null;
  selectRange?: boolean;
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
  selectedEndDate?: Date | null;
  setSelectedEndDate?: React.Dispatch<React.SetStateAction<Date | null>>;
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
  selectRange,
  selectedDate,
  setSelectedDate,
  selectedEndDate,
  setSelectedEndDate,
}: CalendarProps) => {
  const today = startOfToday();
  const [viewDate, setViewDate] = useState<Date>(selectedDate || today);
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDayOfMonth = startOfMonth(viewDate).getDay();
  const daysInMonth = endOfMonth(viewDate).getDate();
  const calendarDays = Array.from(
    { length: daysInMonth },
    (_, index) => index + 1,
  );

  const handleClickDate = (date: Date) => {
    if (compareAsc(date, minDate || today) <= 0) return;

    setViewDate(date);

    if (!setSelectedEndDate) {
      setSelectedDate(selectedDate ? null : date);
      return;
    }

    if (!selectedDate || (selectedDate && selectedEndDate)) {
      setSelectedDate(date);
      setSelectedEndDate(null);
      return;
    }

    if (isSameDay(date, selectedDate)) {
      setSelectedDate(null);
      setSelectedEndDate(null);
      return;
    }

    if (compareAsc(date, selectedDate) > 0) {
      setSelectedEndDate(date);
      return;
    }

    setSelectedDate(date);
    setSelectedEndDate(null);
  };

  const isDateSelected = (date: Date) => {
    if (selectedDate) {
      if (selectedEndDate)
        return date >= selectedDate && date <= selectedEndDate;

      return isSameDay(date, selectedDate);
    }

    return false;
  };

  const getRoundedStyle = (date: Date) => {
    if (
      !selectRange ||
      !selectedEndDate ||
      isSameDay(date, today) ||
      (isSameDay(date, selectedDate || 0) && date.getDay() === 0) ||
      (isSameDay(date, selectedEndDate) && date.getDay() === 1)
    )
      return 'full';

    if (
      isSameDay(date, selectedDate || 0) ||
      isSameDay(date, startOfMonth(date)) ||
      date.getDay() === 1
    )
      return 'left';

    if (
      isSameDay(date, selectedEndDate) ||
      isSameDay(date, endOfMonth(date)) ||
      date.getDay() === 0
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
      <div className="grid grid-cols-[repeat(7,minmax(35px,auto))] text-center">
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
