import React from "react";
import { InformationCircleOutline } from "antd-mobile-icons";
import styles from "./index.less";

function NoDataTip() {
  return (
    <div>
      <div className={styles["tip"]}>
        <p className={styles["tip-title"]}>
          <InformationCircleOutline fontSize={18} />
          <span style={{ marginLeft: 5 }}>怎么获取导出链接？</span>
        </p>
        <p className={styles["tip-desc"]}>
          打开游戏，进入抽卡历史记录页面，断开所有网络连接，点击右上角刷新，当页面报错时，复制全部文本，粘贴至上方输入框
        </p>
      </div>
      <div className={styles["tip"]}>
        <p className={styles["tip-title"]}>
          <InformationCircleOutline fontSize={18} />
          <span style={{ marginLeft: 5 }}>使用tip</span>
        </p>
        <p className={styles["tip-desc"]}>
          尽量按正常逻辑使用，没有测试过异常情况，有bug可以
          <a
            href="https://weibo.com/u/6864286293"
            target="_blank"
            rel="noreferrer">
            微博
          </a>
          反馈我，谢谢啦
        </p>
      </div>
    </div>
  );
}
export default NoDataTip;
