const getDiffDate = (startDate: string) => {
  const theDate = new Date(startDate);
  const today = new Date();
  const diffTime = theDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return Math.abs(diffDays) > 0 ? Math.abs(diffDays) : 'day';
};

export default getDiffDate;
