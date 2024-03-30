export type GachaDataType = {
  role?: ObjectType[];
  weapon?: ObjectType[];
  normal?: ObjectType[];
};

/** 常驻池角色 */
export const normalPoolRole = ["七七", "莫娜", "迪卢克", "琴", "刻晴", "迪希雅", "提纳里"];

/** 池子枚举 */
export enum GachaTypeKey {
  ROLE = "ROLE",
  WEAPON = "WEAPON",
  NORMAL = "NORMAL",
}
export const GachaType = {
  [GachaTypeKey.ROLE]: {
    label: "角色",
    code: "301",
  },
  [GachaTypeKey.WEAPON]: {
    label: "武器",
    code: "302",
  },
  [GachaTypeKey.NORMAL]: {
    label: "常驻",
    code: "200",
  },
};
