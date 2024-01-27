import { iconUrl } from "@/utils/constants";

/** 请求抽卡数据接口 */
export const getGachaUrl = "/api/mihoyo/event/gacha_info/api/getGachaLog?";

/** 常驻池角色 */
export const normalPoolRole = [
  "七七",
  "莫娜",
  "迪卢克",
  "琴",
  "刻晴",
  "迪希雅",
  "提纳里",
];

/** 展示抽卡结果标签 */
export const tabItems = [
  { key: "role", title: "角色" },
  { key: "weapon", title: "武器" },
  { key: "normal", title: "常驻" },
  { key: "statistics", title: "统计" },
];

export const rolePicUrl = {
  已垫: iconUrl.question,
  提纳里:
    "https://patchwiki.biligame.com/images/ys/e/e5/9bq657i9ork1vn2uzv3fpd7p5q8dlqc.png",
  白术: "https://patchwiki.biligame.com/images/ys/thumb/1/14/rkydprgsuw6uaxbm4wotnaj8dw2v30a.png/60px-%E7%99%BD%E6%9C%AF%E5%A4%B4%E5%83%8F.png",
  妮露: "https://patchwiki.biligame.com/images/ys/e/e1/94sj2gmd3pywnqv7ep9fdn5xrkfxaum.png",
  赛诺: "https://patchwiki.biligame.com/images/ys/7/72/4yr49hl7qyuzcku5hnjrls2zrswcen5.png",
  艾尔海森:
    "https://patchwiki.biligame.com/images/ys/e/e2/nugjaod5qmffz3tbtt8is50d8hf1u5r.png",
  流浪者:
    "https://patchwiki.biligame.com/images/ys/6/69/ottjnyh4hg2kid1zqfiqlqext5w5v84.png",
  枫原万叶:
    "https://patchwiki.biligame.com/images/ys/6/6a/e1n6v73p785ne6kew41q9snh45zrup2.png",
  纳西妲:
    "https://patchwiki.biligame.com/images/ys/7/7e/g5x8lguvxfq0hkv211yfecjdvm0xhe7.png",
  迪希雅:
    "https://patchwiki.biligame.com/images/ys/9/98/n64mnzi2yy03qpzld3in619wijfqyj6.png",
  夜兰: "https://patchwiki.biligame.com/images/ys/4/42/e49y27vv8lhk0a9h199pgc0ramj3dk4.png",
  神里绫人:
    "https://patchwiki.biligame.com/images/ys/c/c7/sdgu6bh00rod7lypt9l9c9xlxojtjhl.png",
  八重神子:
    "https://patchwiki.biligame.com/images/ys/a/a4/0plzsmjpgzzpldn00zqijgfybgx2pac.png",
  申鹤: "https://patchwiki.biligame.com/images/ys/6/65/793kuoybdf409lnzwevsmd8ipnel1d2.png",
  荒泷一斗:
    "https://patchwiki.biligame.com/images/ys/5/55/5sdwiryq6bjb3tjxxtg1e8njdmggirp.png",
  珊瑚宫心海:
    "https://patchwiki.biligame.com/images/ys/b/bf/kyfltllg1qaoki7pwpefy7xh8022duy.png",
  雷电将军:
    "https://patchwiki.biligame.com/images/ys/1/11/e9o4gu6ztf7zytnvvkeoerbevkjfwjr.png",
  宵宫: "https://patchwiki.biligame.com/images/ys/b/bc/pz347ut911ktapyemd3ewiyx1dwv3te.png",
  神里绫华:
    "https://patchwiki.biligame.com/images/ys/4/4c/8h931m3f8nkkvjfq3f03c8a9h0f6x69.png",
  优菈: "https://patchwiki.biligame.com/images/ys/1/1b/jf6qfoaq6q48jx6lvqb88dgl4xta141.png",
  胡桃: "https://patchwiki.biligame.com/images/ys/1/19/6x5q4v3ovlgtd5pk7xlqxjdqv1gvf0a.png",
  魈: "https://patchwiki.biligame.com/images/ys/d/da/5gzl19235uvm0mxu3w45hqnb27f0mn6.png",
  甘雨: "https://patchwiki.biligame.com/images/ys/3/3c/qr9mmt4ryhcuovbx82pazu3xv7wr19p.png",
  阿贝多:
    "https://patchwiki.biligame.com/images/ys/2/21/k1zod68cqa6e89r0poxm9ihfmqfmgvw.png",
  钟离: "https://patchwiki.biligame.com/images/ys/7/7c/eewy674lo37jwuq9qozyszhz8vo0d8j.png",
  达达利亚:
    "https://patchwiki.biligame.com/images/ys/a/af/4v48u6t4v9mfnwmabch9ojskqa1x61a.png",
  可莉: "https://patchwiki.biligame.com/images/ys/b/b1/rlnhn26076peuvah42o85o2pha5m7am.png",
  温迪: "https://patchwiki.biligame.com/images/ys/5/58/487eqx6pk6si5abhemvrdkyexskvvbg.png",
  莫娜: "https://patchwiki.biligame.com/images/ys/c/ce/refnobe859mskudq9i634djaniepwvt.png",
  刻晴: "https://patchwiki.biligame.com/images/ys/6/64/goj6bb8yj190midok60n2fbkk872090.png",
  迪卢克:
    "https://patchwiki.biligame.com/images/ys/9/94/mkpw3ljc2eoea75lhkyccu6mbsbiqnr.png",
  七七: "https://patchwiki.biligame.com/images/ys/8/8b/049fpv6jcr66mln0nmbbfgigfrkgrzo.png",
  琴: "https://patchwiki.biligame.com/images/ys/1/1a/g3cl4mrxow8af265n2ajqtnuf99pkfa.png",
} as Record<string, string>;

/** 池子枚举 */
export enum GachaTypeKey {
  ROLE = "ROLE",
  WEAPON = "WEAPON",
  NORMAL = "NORMAL",
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
};
