import { GachaDataShowItem, normalPoolRole } from "./constants";

/**
 * @file 计算抽卡统计数据
 * @param gachaRoleData
 * @param gachaWeaponData
 * @param gachaNormalData
 */

interface CalculateStatisticsProps {
  gachaRoleData: GachaDataShowItem[];
  gachaWeaponData: GachaDataShowItem[];
  gachaNormalData: GachaDataShowItem[];
}

export const calculateStatistics = (props: CalculateStatisticsProps) => {
  const { gachaRoleData, gachaWeaponData, gachaNormalData } = props;
  const roleGoldNumber = gachaRoleData ? gachaRoleData?.length - 1 : 0;
  let rolePullNumber = 0;
  let limitGoldNumber = 0;
  // eslint-disable-next-line
  gachaRoleData?.map((i) => {
    rolePullNumber += i.count;
    if (!normalPoolRole.includes(i.name)) {
      limitGoldNumber++;
    }
  });
  limitGoldNumber--;
  const pullsPerLimitRole = limitGoldNumber
    ? String((rolePullNumber / limitGoldNumber) * 1.0).slice(0, 4)
    : "-";
  const limitRate = limitGoldNumber
    ? String((limitGoldNumber / roleGoldNumber) * 100.0).slice(0, 4)
    : "-";
  // weapon
  const weaponGoldNumber = gachaWeaponData ? gachaWeaponData?.length - 1 : 0;
  let weaponPullNumber = 0;
  // eslint-disable-next-line
  gachaWeaponData?.map((i) => {
    weaponPullNumber += i.count;
  });
  const pullsPerWeapon = weaponGoldNumber
    ? String((weaponPullNumber / weaponGoldNumber) * 1.0).slice(0, 4)
    : "-";
  // normal
  const normalGoldNumber = gachaNormalData ? gachaNormalData?.length - 1 : 0;
  let normalPullNumber = 0;
  // eslint-disable-next-line
  gachaNormalData?.map((i) => {
    normalPullNumber += i.count;
  });
  const pullsPerNormal = normalGoldNumber
    ? String((normalPullNumber / normalGoldNumber) * 1.0).slice(0, 4)
    : "-";

  const data = {
    rolePullNumber: rolePullNumber,
    roleNumber: roleGoldNumber,
    limitRate: limitRate,
    pullsPerLimitRole: pullsPerLimitRole,
    weaponGoldNumber: weaponGoldNumber,
    weaponPullNumber: weaponPullNumber,
    pullsPerWeapon: pullsPerWeapon,
    normalGoldNumber: normalGoldNumber,
    normalPullNumber: normalPullNumber,
    pullsPerNormal: pullsPerNormal,
  };
  return data;
};

/**
 * @file 处理原始数据至可展示数据
 * @param rawData 原始数据
 */

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
