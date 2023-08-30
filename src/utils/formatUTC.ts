type formatUTCType = (date: string) => string;

export const formatUTC: formatUTCType = (date) => {
  const utcDate = new Date(date);
  const year = utcDate.getUTCFullYear().toString();
  const month = (utcDate.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = utcDate.getUTCDate().toString().padStart(2, '0');

  return `${year}.${month}.${day}`;
};
