/** 角色来源 */
export enum RoleSourceKey {
  GENSHIN = "GENSHIN",
  RAILWAY = "RAILWAY",
}
export const RoleSource = {
  [RoleSourceKey.GENSHIN]: "原神",
  [RoleSourceKey.RAILWAY]: "崩坏：星穹铁道",
};

/** 角色列表 */
export const roleList = [
  {
    name: "魈",
    id: 1,
    picUrl: "https://patchwiki.biligame.com/images/ys/d/da/5gzl19235uvm0mxu3w45hqnb27f0mn6.png",
    source: RoleSourceKey.GENSHIN,
  },
  {
    name: "万叶",
    id: 2,
    picUrl: "https://patchwiki.biligame.com/images/ys/3/3a/e1n6v73p785ne6kew41q9snh45zrup2.png",
    source: RoleSourceKey.GENSHIN,
  },
];

/** 怪物列表 */
export const enemyList = [
  {
    name: "丘丘人",
    id: 1,
    picUrl: "", // 暂时用不到
    grade: 3,
    source: RoleSourceKey.GENSHIN,
  },
];
