export type GachaDataType = {
  role?: ObjectType[];
  weapon?: ObjectType[];
  normal?: ObjectType[];
};

/** 常驻池角色 */
export const normalPoolRole = ["七七", "莫娜", "迪卢克", "琴", "刻晴", "迪希雅", "提纳里"];

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
  { name: "莫娜", englishName: "mona" },
  { name: "琴", englishName: "jean" },
  { name: "七七", englishName: "qiqi" },
  { name: "刻晴", englishName: "keqing" },
  { name: "迪卢克", englishName: "diluc" },
  { name: "温迪", englishName: "venti" },
  { name: "可莉", englishName: "klee" },
  { name: "达达利亚", englishName: "tartaglia" },
  { name: "钟离", englishName: "zhongli" },
  { name: "阿贝多", englishName: "albedo" },
  { name: "甘雨", englishName: "ganyu" },
  { name: "魈", englishName: "xiao" },
  { name: "胡桃", englishName: "hu_tao" },
  { name: "优菈", englishName: "eula" },
  { name: "万叶", englishName: "ayaka" },
  { name: "神里绫华", englishName: "ayaka" },
  { name: "宵宫", englishName: "yoimiya" },
  { name: "雷电将军", englishName: "raiden_shogun" },
  { name: "珊瑚宫心海", englishName: "kokomi" },
  { name: "荒泷一斗", englishName: "itto" },
  { name: "申鹤", englishName: "shenhe" },
  { name: "八重神子", englishName: "electro" },
  { name: "夜兰", englishName: "yelan" },
  { name: "提纳里", englishName: "tighnari" },
  { name: "妮露", englishName: "nilou" },
  { name: "赛诺", englishName: "sayno" },
  { name: "纳西妲", englishName: "nahida" },
  { name: "神里绫人", englishName: "ayato" },
  { name: "流浪者", englishName: "wanderer" },
  { name: "艾尔海森", englishName: "alhaitham" },
  { name: "迪希雅", englishName: "dixia" },
  { name: "白术", englishName: "baizhu" },
  { name: "林尼", englishName: "linni" },
  { name: "莱欧斯利", englishName: "leosley" },
  { name: "那维莱特", englishName: "navillette" },
  { name: "芙宁娜", englishName: "fningna" },
  { name: "娜维娅", englishName: "navia" },
  { name: "闲云", englishName: "xianyun" },
  { name: "千织", englishName: "chiori" },
  { name: "玛薇卡", englishName: "maweika" },
  { name: "茜特菈莉", englishName: "citlali" },
  { name: "阿蕾奇诺", englishName: "arlecchino" },
  { name: "艾梅莉埃", englishName: "aimei" },
  { name: "玛拉妮", englishName: "malani" },
  { name: "希诺宁", englishName: "xinuoning" },
  { name: "基尼奇", englishName: "jiniqi" },
  { name: "克洛琳德", englishName: "keluolinde" },
  { name: "恰斯卡", englishName: "qiasika" },
];
