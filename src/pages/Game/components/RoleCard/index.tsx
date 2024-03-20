/**
 * @file 统一角色卡片
 * @description 用于抽卡、列表等页面
 */
import { Image } from "antd";
import { PicUrl } from "@/utils/constants";
import styles from "./index.module.less";

export interface RoleCardProps {
  name: string;
  picUrl: string;
  isGold?: boolean;
}

export default function RoleCard(props: RoleCardProps) {
  const { name = "", picUrl = "", isGold } = props;
  return (
    <div className={styles["role-card"]} style={{ border: `5px solid ${isGold ? "gold" : "blue"}` }}>
      <Image width={100} height={100} src={picUrl || PicUrl.question} preview={false} style={{ borderRadius: 24 }} />
      <div className={styles["role-card-name"]} style={{ color: isGold ? "gold" : "blue" }}>
        {name}
      </div>
    </div>
  );
}
