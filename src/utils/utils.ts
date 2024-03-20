/** 安全解析json */
export const safeParse = (s: string | undefined | null) => {
  try {
    return JSON.parse(s || "{}");
  } catch (err) {
    return "";
  }
};

/** 返回数组中随机一个元素 */
export const getRandomItemFromArray = (arr: any[]) => {
  return arr?.[(Math.random() * (arr?.length - 1)).toFixed(0)];
};
