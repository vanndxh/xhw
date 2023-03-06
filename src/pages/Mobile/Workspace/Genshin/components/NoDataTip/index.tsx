import React from "react";
import { InformationCircleOutline } from "antd-mobile-icons";
import styles from "./index.less";

function NoDataTip() {
  const tips = [
    {
      title: "怎么获取导出链接？",
      render: () =>
        "游戏打开抽卡界面，然后在powershell输入 iex(irm 'https://lelaer.com/d.ps1')",
    },
    {
      title: "使用tip",
      render: () => (
        <>
          尽量按正常逻辑使用，没有测试过异常情况，有bug可以
          <a
            href="https://weibo.com/u/6864286293"
            target="_blank"
            rel="noreferrer"
          >
            微博
          </a>
          反馈我，谢谢啦
        </>
      ),
    },
  ];
  return (
    <div>
      {tips.map((i) => (
        <div className={styles["tip"]} key={i.title}>
          <p className={styles["tip-title"]}>
            <InformationCircleOutline fontSize={18} />
            <span style={{ marginLeft: 5 }}>{i.title}</span>
          </p>
          <p className={styles["tip-desc"]}>{i.render()}</p>
        </div>
      ))}
    </div>
  );
}
export default NoDataTip;
