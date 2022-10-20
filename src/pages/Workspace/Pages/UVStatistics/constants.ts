export enum PAGE_LIST_KEY {
  TOTAL = "total",
  HOME = "home",
  GENSHIN = "genshin",
  WEB = "web",
}
export const PAGE_LIST = {
  [PAGE_LIST_KEY.TOTAL]: {
    name: "全部",
  },
  [PAGE_LIST_KEY.HOME]: {
    name: "主页",
  },
  [PAGE_LIST_KEY.GENSHIN]: {
    name: "原神",
  },
  [PAGE_LIST_KEY.WEB]: {
    name: "网站推荐",
  },
};
