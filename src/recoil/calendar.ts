import { formatDate } from '@utils/formatUTC';
import { atom, selector } from 'recoil';

type CalendarOpenType = {
  date: boolean;
  range: boolean;
};

type DateStateType = {
  deadline: TDate;
  start_date: TDate;
  end_date: TDate;
};

export const calendarOpenState = atom<CalendarOpenType>({
  key: 'calendarOpenState',
  default: {
    date: false,
    range: false,
  },
});

export const dateState = atom<DateStateType>({
  key: 'dateState',
  default: {
    deadline: null,
    start_date: null,
    end_date: null,
  },
});

export const dateSelector = selector({
  key: 'dateSelector',
  get: ({ get }) => {
    const date = get(dateState);
    let formattedDate = {};
    Object.keys(date).map(
      (key) => (formattedDate[key] = formatDate(date[key], '')),
    );
    return formattedDate;
  },
});
