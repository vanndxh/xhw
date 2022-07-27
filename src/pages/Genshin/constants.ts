/** 请求抽卡数据接口 */
export const getGachaUrl = "/api/mihoyo/event/gacha_info/api/getGachaLog?";

/** 常驻池角色 */
export const normalPoolRole = ["七七", "莫娜", "迪卢克", "琴", "刻晴"];

/** 展示抽卡结果标签 */
export const tabItems = [
  { key: "role", title: "角色" },
  { key: "weapon", title: "武器" },
  { key: "normal", title: "常驻" },
  { key: "statistics", title: "统计" },
];

export const rolePicUrl = {
  已垫: "data:image/png;base64,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",
  枫原万叶:
    "https://patchwiki.biligame.com/images/ys/6/6a/e1n6v73p785ne6kew41q9snh45zrup2.png",
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
