import React from "react";
import { Image } from "antd-mobile";
import styles from "./index.less";

interface Props {
  icon: string;
  title: string;
  desc: string;
}

function ItemInfo(props: Props) {
  const { icon, title, desc } = props;

  return (
    <div className={styles["item"]}>
      <Image src={icon} width={40} height={40} fit="contain" />

      <div className={styles["item-text"]}>
        <div className={styles["item-text-title"]}>{title}</div>
        <div className={styles["item-text-desc"]}>{desc}</div>
      </div>
    </div>
  );
}

export default ItemInfo;
