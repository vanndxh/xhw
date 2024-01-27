/**
 * @file 原神板块相关工具函数
 */
import { GachaDataType } from ".";
import { normalPoolRole } from "./constants";

/** 第一次处理数据--原数组至统计数据 */
export const handleRawData = (rawData) => {
  const tempData: Object[] = [];
  let count = 0;
  let preName = "已垫";
  // eslint-disable-next-line
  rawData?.map((i) => {
    if (i.rank_type === "5") {
      tempData.push({
        name: preName,
        count: count + 1,
      });
      count = 0;
      preName = i.name;
    } else {
      count++;
    }
  });
  if (count) {
    tempData.push({
      name: preName,
      count: count + 1,
    });
  }

  return tempData;
};

/** 第二次处理数据--将数据计算成展示数据 */
export const calculateStatistics = (rawData: GachaDataType) => {
  const { role, weapon, normal } = rawData;

  /**
   * role
   */
  const roleGoldNumber = role ? role?.length - 1 : 0;
  let rolePullNumber = 0;
  let limitGoldNumber = -1;
  // eslint-disable-next-line
  role?.map((i) => {
    rolePullNumber += i.count;
    if (!normalPoolRole.includes(i.name)) {
      limitGoldNumber++;
    }
  });
  const pullsPerLimitRole = role
    ? String((rolePullNumber / limitGoldNumber) * 1.0).slice(0, 5)
    : "-";
  const limitRate = role
    ? String((limitGoldNumber / roleGoldNumber) * 100.0).slice(0, 5)
    : "-";

  /**
   * weapon
   */
  const weaponGoldNumber = weapon ? weapon?.length - 1 : 0;
  let weaponPullNumber = 0;
  // eslint-disable-next-line
  weapon?.map((i) => {
    weaponPullNumber += i.count;
  });
  const pullsPerWeapon = weaponGoldNumber
    ? String((weaponPullNumber / weaponGoldNumber) * 1.0).slice(0, 4)
    : "-";

  /**
   * normal
   */
  const normalGoldNumber = normal ? normal?.length - 1 : 0;
  let normalPullNumber = 0;
  // eslint-disable-next-line
  normal?.map((i) => {
    normalPullNumber += i.count;
  });
  const pullsPerNormal = normalGoldNumber
    ? String((normalPullNumber / normalGoldNumber) * 1.0).slice(0, 4)
    : "-";

  return {
    role: {
      totalPull: rolePullNumber,
      totalGold: roleGoldNumber,
      limitGoldNumber,
      limitRate,
      pullPerLimit: pullsPerLimitRole,
    },
    weapon: {
      totalPull: weaponPullNumber,
      totalGold: weaponGoldNumber,
      pullPerLimit: pullsPerWeapon,
    },
    normal: {
      totalPull: normalPullNumber,
      totalGold: normalGoldNumber,
      pullPerLimit: pullsPerNormal,
    },
  };
};
