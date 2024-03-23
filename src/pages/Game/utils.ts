/**
 * @file 用户数据相关工具函数
 */
import { safeParse } from "@/utils/utils";
import { RoleSourceKey } from "./constants";

/** 抽卡记录数据类型 */
export type HistoryType = {
  /** 名称 */
  name?: string;
  /** id */
  id?: number;
  /** 抽卡时间 */
  time?: string;
  /** 来源 */
  source?: RoleSourceKey;
  /** 多少抽出的 */
  pulls?: number;
};

/** 用户数据类型 */
export type UserDataType = {
  /** 剩余总抽数 */
  pulls?: number;
  /** 抽卡记录 */
  history?: HistoryType[];
  /** 是否抽卡次数无限 */
  infinite?: boolean;
  /** 总抽数 */
  pullCount?: number;
  /** 总战斗次数 */
  fightCount?: number;
  /** 当前水位线 */
  level?: number;
};

/** 获取用户数据 */
export const getUserData = () => safeParse(localStorage.getItem("userData"));

/** 更新用户数据，可以是部分 */
export const updateUserData = (data: UserDataType) => {
  localStorage.setItem("userData", JSON.stringify({ ...getUserData(), ...data }));
};
