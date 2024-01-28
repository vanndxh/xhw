/**
 * @file 一条出金记录的展示
 */
import React from "react";
import { Progress, Image } from "antd";
import { ProgressGradient } from "antd/es/progress/progress";
import styles from "./index.module.less";

interface Props {
  /** 出金内容的图片 */
  picUrl: string;
  /** 出金内容名称 */
  name: React.ReactNode;
  /** 出金花费抽数 */
  count: number;
}

function GachaItem(props: Props) {
  const { picUrl, name, count } = props;

  /** 根据抽卡数决定进度条颜色 */
  const getProgressColor = (c): ProgressGradient => {
    if (c <= 60) {
      return { "0%": "#d4fc79", "100%": "#96e6a1" };
    }
    if (c <= 80) {
      return { "0%": "#f6d365", "100%": "#fda085" };
    }
    return {
      "0%": "#ff8177",
      "25%": "#ff8c7f",
      "50%": "#f99185",
      "75%": "#cf556c",
      "100%": "#cf556c",
    };
  };

  return (
    <div className={styles["gacha-item"]}>
      <Image
        src={picUrl}
        width={20}
        height={20}
        rootClassName={styles["gacha-item-pic"]}
        preview={false}
      />
      <div className={styles["gacha-item-name"]}>{name}</div>
      <Progress
        percent={(count / 90) * 100}
        strokeColor={getProgressColor(count)}
        rootClassName={styles["gacha-item-progress"]}
        showInfo={false}
      />
      <div className={styles["gacha-item-count"]}>{count}</div>
    </div>
  );
}
export default GachaItem;
