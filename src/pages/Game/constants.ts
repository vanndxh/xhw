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
    name: "芭芭拉",
    id: 99,
    picUrl: "...",
    grade: 4,
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
