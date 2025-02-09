/**
 * @file 游戏数据全局state
 */

import { safeParse } from "@/utils/utils";
import { proxy, subscribe } from "valtio";

/** 抽卡记录数据类型 */
export type HistoryType = {
  /** 名称 */
  name?: string;
  /** id */
  id?: string;
  /** 抽卡时间 */
  time?: string;
  /** 多少抽出的 */
  pulls?: number;
};

/** 用户数据类型 */
export type UserDataType = {
  /** 剩余总抽数 */
  pulls: number;
  /** 抽卡记录 */
  history: HistoryType[];
  /** 是否抽卡次数无限 */
  infinite: boolean;
  /** 总抽数 */
  pullCount: number;
  /** 总战斗次数 */
  fightCount: number;
  /** 当前水位线 */
  level: number;
};

/** 用户数据初始化 */
export const initUserData = {
  pulls: 1000,
  history: [],
  infinite: false,
  pullCount: 0,
  fightCount: 0,
  level: 0,
};

export const userData = proxy<UserDataType>(initUserData);

/** 根据localStorage更新用户数据 */
const storedState = safeParse(localStorage.getItem("userData"));
if (storedState) {
  Object.assign(userData, storedState);
}

/** 将userData保存到localStorage */
subscribe(userData, () => {
  localStorage.setItem("userData", JSON.stringify(userData));
});
