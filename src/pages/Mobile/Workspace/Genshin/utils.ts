import { normalPoolRole } from "./constants";

/** 第一次处理数据--原数组至统计数据 */
export const hanedleRawData = (rawData: any[]) => {
  const tempData = [];
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
interface GachaDataShowItem {
  name: string;
  count: number;
}
interface RawDataProps {
  role: GachaDataShowItem[];
  weapon: GachaDataShowItem[];
  normal: GachaDataShowItem[];
}

export const calculateStatistics = (rawData: RawDataProps) => {
  const { role = [], weapon = [], normal = [] } = rawData;

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
  const pullsPerLimitRole = limitGoldNumber
    ? String((rolePullNumber / limitGoldNumber) * 1.0).slice(0, 5)
    : "-";
  const limitRate = limitGoldNumber
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
