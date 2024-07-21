export const isSameDay = (date1: Date, date2: Date) => {
  return date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();
};

export const toKST = (date: Date) => {
  const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
  const kstOffset = 9 * 60 * 60 * 1000; // KST is UTC+9
  return new Date(utc + kstOffset);
};
