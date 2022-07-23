/** 抽卡数据展示项 */
export interface GachaDataShowItem {
  name: string;
  count: number;
}

/** 池子名-code对应 */
export const gachaTypeEnum: any = {
  "301": "角色",
  "302": "武器",
  "200": "常驻",
};