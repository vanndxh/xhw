/**
 * @file 统一角色卡片
 * @description 用于抽卡、列表等页面
 */
import { Badge, Image } from "antd";
import { blueColor, goldColor } from "../../constants";
import styles from "./index.module.less";

export interface RoleCardProps {
  name: string;
  picUrl: string;
  isGold?: boolean;
  badgeText?: string;
}

export default function RoleCard(props: RoleCardProps) {
  const { name = "", picUrl = "", isGold, badgeText = "" } = props;
  const finalColor = isGold ? goldColor : blueColor;

  return (
    <Badge count={badgeText}>
      <div className={styles["role-card"]} style={{ border: `5px solid ${finalColor}` }}>
        <Image width={100} height={100} src={picUrl} preview={false} style={{ borderRadius: 24 }} />
        <div className={styles["role-card-name"]} style={{ color: finalColor }}>
          {name}
        </div>
      </div>
    </Badge>
  );
}
