/**
 * @file 原神板块相关工具函数
 */
import { normalPoolRole, GachaDataType } from "./constants";

/**
 * 第一次处理数据
 * 原抽卡详情 -> 只有5星的数据
 */
export const handleRawData = (rawData) => {
  const finalData: Object[] = [];
  let count = 0;
  let preName = "已垫";
  rawData?.map((i) => {
    if (i.rank_type === "5") {
      finalData.push({
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
    finalData.push({
      name: preName,
      count: count + 1,
    });
  }

  return finalData;
};

/**
 * 第二次处理数据
 * 将5星数据 -> 统计学数据
 */
export const calculateStatistics = (rawData: GachaDataType) => {
  const { role, weapon, normal } = rawData;

  /**
   * role
   */
  const roleGoldNumber = role ? role?.length - 1 : 0;
  let rolePullNumber = 0;
  let limitGoldNumber = -1;
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

  weapon?.map((i) => (weaponPullNumber += i.count));
  const pullsPerWeapon = weaponGoldNumber
    ? String((weaponPullNumber / weaponGoldNumber) * 1.0).slice(0, 4)
    : "-";

  /**
   * normal
   */
  const normalGoldNumber = normal ? normal?.length - 1 : 0;
  let normalPullNumber = 0;
  normal?.map((i) => (normalPullNumber += i.count));
  const pullsPerNormal = normalGoldNumber
    ? String((normalPullNumber / normalGoldNumber) * 1.0).slice(0, 4)
    : "-";

  return {
    role: {
      totalPull: rolePullNumber,
      totalGold: roleGoldNumber,
      limitGoldNumber: role ? limitGoldNumber : "-",
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
