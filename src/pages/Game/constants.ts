/** 角色来源 */
export enum RoleSourceKey {
  GENSHIN = "GENSHIN",
  RAILWAY = "RAILWAY",
}
export const RoleSource = {
  [RoleSourceKey.GENSHIN]: "原神",
  [RoleSourceKey.RAILWAY]: "崩坏：星穹铁道",
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

/** 颜色 */
export const blueColor = "#1677ff";
export const purpleColor = "purple";
export const goldColor = "gold";

/** 角色列表 */
export const roleList = [
  {
    name: "莫娜",
    id: "0001",
    picUrl: "https://patchwiki.biligame.com/images/ys/c/ce/refnobe859mskudq9i634djaniepwvt.png",
    source: RoleSourceKey.GENSHIN,
  },
  {
    name: "琴",
    id: "0002",
    picUrl: "https://patchwiki.biligame.com/images/ys/1/1a/g3cl4mrxow8af265n2ajqtnuf99pkfa.png",
    source: RoleSourceKey.GENSHIN,
  },
  {
    name: "七七",
    id: "0003",
    picUrl: "https://patchwiki.biligame.com/images/ys/8/8b/049fpv6jcr66mln0nmbbfgigfrkgrzo.png",
    source: RoleSourceKey.GENSHIN,
  },
  {
    name: "刻晴",
    id: "0004",
    picUrl: "https://patchwiki.biligame.com/images/ys/6/64/goj6bb8yj190midok60n2fbkk872090.png",
    source: RoleSourceKey.GENSHIN,
  },
  {
    name: "迪卢克",
    id: "0005",
    picUrl: "https://patchwiki.biligame.com/images/ys/9/94/mkpw3ljc2eoea75lhkyccu6mbsbiqnr.png",
    source: RoleSourceKey.GENSHIN,
  },
  {
    name: "温迪",
    id: "0006",
    picUrl: "https://patchwiki.biligame.com/images/ys/5/58/487eqx6pk6si5abhemvrdkyexskvvbg.png",
    source: RoleSourceKey.GENSHIN,
  },
  {
    name: "可莉",
    id: "0007",
    picUrl: "https://patchwiki.biligame.com/images/ys/b/b1/rlnhn26076peuvah42o85o2pha5m7am.png",
    source: RoleSourceKey.GENSHIN,
  },
  {
    name: "达达利亚",
    id: "0008",
    picUrl: "https://patchwiki.biligame.com/images/ys/a/af/4v48u6t4v9mfnwmabch9ojskqa1x61a.png",
    source: RoleSourceKey.GENSHIN,
  },
  {
    name: "钟离",
    id: "0009",
    picUrl: "https://patchwiki.biligame.com/images/ys/7/7c/eewy674lo37jwuq9qozyszhz8vo0d8j.png",
    source: RoleSourceKey.GENSHIN,
  },
  {
    name: "阿贝多",
    id: "0010",
    picUrl: "https://patchwiki.biligame.com/images/ys/2/21/k1zod68cqa6e89r0poxm9ihfmqfmgvw.png",
    source: RoleSourceKey.GENSHIN,
  },
  {
    name: "甘雨",
    id: "0011",
    picUrl: "https://patchwiki.biligame.com/images/ys/3/3c/qr9mmt4ryhcuovbx82pazu3xv7wr19p.png",
    source: RoleSourceKey.GENSHIN,
  },
  {
    name: "魈",
    id: "0012",
    picUrl: "https://patchwiki.biligame.com/images/ys/d/da/5gzl19235uvm0mxu3w45hqnb27f0mn6.png",
    source: RoleSourceKey.GENSHIN,
  },
  {
    name: "胡桃",
    id: "0013",
    picUrl: "https://patchwiki.biligame.com/images/ys/1/19/6x5q4v3ovlgtd5pk7xlqxjdqv1gvf0a.png",
    source: RoleSourceKey.GENSHIN,
  },
  {
    name: "优菈",
    id: "0014",
    picUrl: "https://patchwiki.biligame.com/images/ys/1/1b/jf6qfoaq6q48jx6lvqb88dgl4xta141.png",
    source: RoleSourceKey.GENSHIN,
  },
  {
    name: "万叶",
    id: "0015",
    picUrl: "https://patchwiki.biligame.com/images/ys/3/3a/e1n6v73p785ne6kew41q9snh45zrup2.png",
    source: RoleSourceKey.GENSHIN,
  },
  {
    name: "神里绫华",
    id: "0016",
    picUrl: "https://patchwiki.biligame.com/images/ys/4/4c/8h931m3f8nkkvjfq3f03c8a9h0f6x69.png",
    source: RoleSourceKey.GENSHIN,
  },
  {
    name: "宵宫",
    id: "0017",
    picUrl: "https://patchwiki.biligame.com/images/ys/b/bc/pz347ut911ktapyemd3ewiyx1dwv3te.png",
    source: RoleSourceKey.GENSHIN,
  },
  {
    name: "雷电将军",
    id: "0018",
    picUrl: "https://patchwiki.biligame.com/images/ys/1/11/e9o4gu6ztf7zytnvvkeoerbevkjfwjr.png",
    source: RoleSourceKey.GENSHIN,
  },
  {
    name: "珊瑚宫心海",
    id: "0019",
    picUrl: "https://patchwiki.biligame.com/images/ys/b/bf/kyfltllg1qaoki7pwpefy7xh8022duy.png",
    source: RoleSourceKey.GENSHIN,
  },
  {
    name: "荒泷一斗",
    id: "0020",
    picUrl: "https://patchwiki.biligame.com/images/ys/5/55/5sdwiryq6bjb3tjxxtg1e8njdmggirp.png",
    source: RoleSourceKey.GENSHIN,
  },
  {
    name: "申鹤",
    id: "0021",
    picUrl: "https://patchwiki.biligame.com/images/ys/6/65/793kuoybdf409lnzwevsmd8ipnel1d2.png",
    source: RoleSourceKey.GENSHIN,
  },
  {
    name: "八重神子",
    id: "0022",
    picUrl: "https://patchwiki.biligame.com/images/ys/a/a4/0plzsmjpgzzpldn00zqijgfybgx2pac.png",
    source: RoleSourceKey.GENSHIN,
  },
  {
    name: "夜兰",
    id: "0023",
    picUrl: "https://patchwiki.biligame.com/images/ys/4/42/e49y27vv8lhk0a9h199pgc0ramj3dk4.png",
    source: RoleSourceKey.GENSHIN,
  },
  {
    name: "提纳里",
    id: "0024",
    picUrl: "https://patchwiki.biligame.com/images/ys/e/e5/9bq657i9ork1vn2uzv3fpd7p5q8dlqc.png",
    source: RoleSourceKey.GENSHIN,
  },
  {
    name: "妮露",
    id: "0025",
    picUrl: "https://patchwiki.biligame.com/images/ys/e/e1/94sj2gmd3pywnqv7ep9fdn5xrkfxaum.png",
    source: RoleSourceKey.GENSHIN,
  },
  {
    name: "赛诺",
    id: "0026",
    picUrl: "https://patchwiki.biligame.com/images/ys/7/72/4yr49hl7qyuzcku5hnjrls2zrswcen5.png",
    source: RoleSourceKey.GENSHIN,
  },
  {
    name: "纳西妲",
    id: "0027",
    picUrl: "https://patchwiki.biligame.com/images/ys/7/7e/g5x8lguvxfq0hkv211yfecjdvm0xhe7.png",
    source: RoleSourceKey.GENSHIN,
  },
  {
    name: "神里绫人",
    id: "0028",
    picUrl: "https://patchwiki.biligame.com/images/ys/c/c7/sdgu6bh00rod7lypt9l9c9xlxojtjhl.png",
    source: RoleSourceKey.GENSHIN,
  },
  {
    name: "流浪者",
    id: "0029",
    picUrl: "https://patchwiki.biligame.com/images/ys/6/69/ottjnyh4hg2kid1zqfiqlqext5w5v84.png",
    source: RoleSourceKey.GENSHIN,
  },
  {
    name: "艾尔海森",
    id: "0030",
    picUrl: "https://patchwiki.biligame.com/images/ys/e/e2/nugjaod5qmffz3tbtt8is50d8hf1u5r.png",
    source: RoleSourceKey.GENSHIN,
  },
  {
    name: "迪希雅",
    id: "0031",
    picUrl: "https://patchwiki.biligame.com/images/ys/9/98/n64mnzi2yy03qpzld3in619wijfqyj6.png",
    source: RoleSourceKey.GENSHIN,
  },
  {
    name: "白术",
    id: "0032",
    picUrl:
      "https://patchwiki.biligame.com/images/ys/thumb/1/14/rkydprgsuw6uaxbm4wotnaj8dw2v30a.png/60px-%E7%99%BD%E6%9C%AF%E5%A4%B4%E5%83%8F.png",
    source: RoleSourceKey.GENSHIN,
  },
  {
    name: "林尼",
    id: "0033",
    picUrl: "https://patchwiki.biligame.com/images/ys/d/d6/tbalaahap33je75krxzg29fmuidcxit.png",
    source: RoleSourceKey.GENSHIN,
  },
  {
    name: "莱欧斯利",
    id: "0034",
    picUrl: "https://patchwiki.biligame.com/images/ys/d/d7/jvb2oapa38w7k6t4zd9y5x21hex5ku2.png",
    source: RoleSourceKey.GENSHIN,
  },
  {
    name: "那维莱特",
    id: "0035",
    picUrl: "https://patchwiki.biligame.com/images/ys/1/16/aism1oli44ck26p72n0gv2elnqq1av7.png",
    source: RoleSourceKey.GENSHIN,
  },
  {
    name: "芙宁娜",
    id: "0036",
    picUrl: "https://patchwiki.biligame.com/images/ys/1/10/pcfz7nh8676dqxxubrshq17jdu17xn9.png",
    source: RoleSourceKey.GENSHIN,
  },
  {
    name: "娜维娅",
    id: "0037",
    picUrl: "https://patchwiki.biligame.com/images/ys/0/04/3bbaccl7ziumc1f9vk1hoo1vpttkd2m.png",
    source: RoleSourceKey.GENSHIN,
  },
  {
    name: "闲云",
    id: "0038",
    picUrl: "https://patchwiki.biligame.com/images/ys/3/33/gn836y6qx7kl0rl98wozgx13thi62nq.png",
    source: RoleSourceKey.GENSHIN,
  },
  {
    name: "千织",
    id: "0039",
    picUrl: "https://patchwiki.biligame.com/images/ys/a/a6/4k6rkt55pw85t14akl09o42f800iac7.png",
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
