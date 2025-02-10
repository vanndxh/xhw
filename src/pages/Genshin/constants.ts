// cspell:disable

/** 池子枚举 */
export enum GachaTypeKey {
  ROLE = "ROLE",
  WEAPON = "WEAPON",
  NORMAL = "NORMAL",
  MIX = "MIX",
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
  [GachaTypeKey.MIX]: {
    label: "集录",
    code: "500",
  },
};

/** 角色列表 */
export const roleList = [
  { name: "莫娜", englishName: "mona", version: "1.0", isNormal: true },
  { name: "琴", englishName: "jean", version: "1.0", isNormal: true },
  { name: "七七", englishName: "qiqi", version: "1.0", isNormal: true },
  { name: "刻晴", englishName: "keqing", version: "1.0", isNormal: true },
  { name: "迪卢克", englishName: "diluc", version: "1.0", isNormal: true },

  { name: "温迪", englishName: "venti", version: "1.0" },
  { name: "可莉", englishName: "klee", version: "1.0" },
  { name: "达达利亚", englishName: "tartaglia", version: "1.1" },
  { name: "钟离", englishName: "zhongli", version: "1.1" },
  { name: "阿贝多", englishName: "albedo", version: "1.2" },
  { name: "甘雨", englishName: "ganyu", version: "1.2" },
  { name: "魈", englishName: "xiao", version: "1.3" },
  { name: "胡桃", englishName: "hutao", version: "1.3" },
  { name: "优菈", englishName: "eula", version: "1.5" },
  { name: "万叶", englishName: "ayaka", version: "1.6" },

  { name: "神里绫华", englishName: "ayaka", version: "2.0" },
  { name: "宵宫", englishName: "yoimiya", version: "2.0" },
  { name: "雷电将军", englishName: "shogun", version: "2.1" },
  { name: "珊瑚宫心海", englishName: "kokomi", version: "2.1" },
  { name: "荒泷一斗", englishName: "itto", version: "2.3" },
  { name: "申鹤", englishName: "shenhe", version: "2.4" },
  { name: "八重神子", englishName: "yaemiko", version: "2.5" },
  { name: "神里绫人", englishName: "ayato", version: "2.6" },
  { name: "夜兰", englishName: "yelan", version: "2.7" },

  { name: "提纳里", englishName: "tighnari", version: "3.0", isNormal: true },
  { name: "妮露", englishName: "nilou", version: "3.1" },
  { name: "赛诺", englishName: "cyno", version: "3.1" },
  { name: "纳西妲", englishName: "nahida", version: "3.2" },
  { name: "流浪者", englishName: "wanderer", version: "3.3" },
  { name: "艾尔海森", englishName: "alhatham", version: "3.4" },
  { name: "迪希雅", englishName: "dehya", version: "3.5", isNormal: true },
  { name: "白术", englishName: "baizhu", version: "3.6" },

  { name: "林尼", englishName: "liney", version: "4.0" },
  { name: "莱欧斯利", englishName: "wriothesley", version: "4.1" },
  { name: "那维莱特", englishName: "neuvillette", version: "4.1" },
  { name: "芙宁娜", englishName: "furina", version: "4.2" },
  { name: "娜维娅", englishName: "navia", version: "4.3" },
  { name: "闲云", englishName: "xianyun", version: "4.4" },
  { name: "千织", englishName: "chiori", version: "4.5" },
  { name: "阿蕾奇诺", englishName: "arlecchino", version: "4.6" },
  { name: "克洛琳德", englishName: "keluolinde", version: "4.7" },
  { name: "希格雯", englishName: "xigewen", version: "4.7" },
  { name: "艾梅莉埃", englishName: "aimei", version: "4.8" },

  { name: "玛拉妮", englishName: "malani", version: "5.0" },
  { name: "基尼奇", englishName: "jiniqi", version: "5.0" },
  { name: "希诺宁", englishName: "xinuoning", version: "5.1" },
  { name: "恰斯卡", englishName: "qiasika", version: "5.2" },
  { name: "茜特菈莉", englishName: "citlali", version: "5.3" },
  { name: "玛薇卡", englishName: "maweika", version: "5.3" },
];
