/**
 * @file 经典信息展示组件
 * @description 左icon，右两行信息展示
 */
import { Image } from "antd";
import styles from "./index.module.less";

interface Props {
  /** icon链接 */
  icon: string;
  /** 标题 */
  title: string;
  /** 内容 */
  desc: string;
}

function ItemInfo(props: Props) {
  const { icon, title, desc } = props;

  return (
    <div className={styles["item"]}>
      <Image src={icon} width={40} height={40} />

      <div className={styles["item-text"]}>
        <div className={styles["item-text-title"]}>{title}</div>
        <div className={styles["item-text-desc"]}>{desc}</div>
      </div>
    </div>
  );
}

export default ItemInfo;
