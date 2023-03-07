/** 是否当天 */
export const IsToday = (date: Date) => {
  const today = new Date();
  return (
    date.getFullYear === today.getFullYear &&
    date.getMonth === today.getMonth &&
    date.getDate === today.getDate
  );
};
