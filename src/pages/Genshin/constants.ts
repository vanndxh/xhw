/** 请求抽卡数据接口 */
export const getGachaUrl = "/api/mihoyo/event/gacha_info/api/getGachaLog?";

/** 常驻池角色 */
export const normalPoolRole = ["七七", "莫娜", "迪卢克", "琴", "刻晴"];

/** 展示抽卡结果标签 */
export const tabItems = [
  { key: "role", title: "角色" },
  { key: "weapon", title: "武器" },
  { key: "normal", title: "常驻" },
  { key: "statistics", title: "统计" },
];