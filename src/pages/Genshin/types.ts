/** 抽卡数据展示项 */
export interface GachaDataShowItem {
  name: string;
  count: number;
}

/** 池子名-code对应 */
export const GACHA_TYPE: any = {
  "301": "角色",
  "302": "武器",
  "200": "常驻",
};

export const GACHA_TYPE_KEY = {
  role: {
    code: "301",
    name: "角色",
  },
  weapon: {
    code: "302",
    name: "武器",
  },
  normal: {
    code: "200",
    name: "常驻",
  },
};
