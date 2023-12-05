type formatUTCType = (date: string, time?: boolean) => string;
type formatDateType = (date: TDate, placeholder?: string) => string;

const getPartialDate = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return { year, month, day, hours, minutes };
};

export const formatUTC: formatUTCType = (date, time) => {
  const { year, month, day, hours, minutes } = getPartialDate(new Date(date));

  return time
    ? `${year}-${month}-${day} ${hours}:${minutes}`
    : `${year}-${month}-${day}`;
};

export const formatDate: formatDateType = (
  date,
  placeholder = 'YYYY-MM-DD',
) => {
  if (!date) return placeholder;
  const { year, month, day } = getPartialDate(date);

  return `${year}-${month}-${day}`;
};