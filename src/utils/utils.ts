/** 是否当天 */
export const IsToday = (date: Date) => {
  const today = new Date();
  return (
    date.getFullYear === today.getFullYear &&
    date.getMonth === today.getMonth &&
    date.getDate === today.getDate
  );
};

/** 对象转数组 */
export function getObjectToArray(
  data: Record<string, any>,
  key?: string,
  alias?: string
) {
  return Object.entries(data).map((item) => {
    return {
      [key || "label"]: item[1][alias || "name"],
      value: item[0],
    };
  });
}
