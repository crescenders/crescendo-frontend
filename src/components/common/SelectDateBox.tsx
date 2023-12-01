import Image from 'next/image';
import { format } from 'date-fns';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { calendarOpenState, dateState } from '@recoil/calendar';
import Calendar from '@components/common/Calendar';

type SelectDateBoxProps = {
  isRange?: boolean;
  isOpen: boolean;
  error: string;
};

const SelectDateBox = ({ isRange, isOpen, error }: SelectDateBoxProps) => {
  const [selectedDate, setSelectedDate] = useRecoilState(dateState);
  const setIsOpen = useSetRecoilState(calendarOpenState);

  const formatDate = (date: TDate): string => {
    if (!date) return 'YYYY-MM-DD';
    return format(date, 'yyyy-MM-dd');
  };

  const handleOpenCalendar = (isOpen?: boolean) => {
    setIsOpen((prev) => {
      return isRange
        ? { ...prev, range: isOpen ?? !prev.range }
        : { ...prev, date: isOpen ?? !prev.date };
    });
  };

  return (
    <div className="relative flex flex-col gap-[18px]">
      <div className="flex w-full flex-col gap-y-1">
        <div className="text-base font-bold">
          {isRange ? '스터디 기간' : '모집 마감 날짜'}
        </div>
        <span className="h-2 w-full text-12 text-status-error">{error}</span>
      </div>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleOpenCalendar();
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
          className={`duration-300 ease-in-out ${isOpen && 'rotate-[-180deg]'}`}
        />
      </button>
      {isOpen && (
        <div
          className={`absolute right-0 top-[110px] z-10 rounded-lg bg-white p-4 shadow-base ${
            isOpen && 'animate-slideDown'
          }`}
          onClick={(e) => e.stopPropagation()}
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
                endDate && handleOpenCalendar(false);
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
                handleOpenCalendar(false);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SelectDateBox;
