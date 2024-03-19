/**
 * @file 游戏主页
 */
import { Button } from "antd";
import {
  UserOutlined,
  StarOutlined,
  SettingOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.less";

interface Props {}

export default function Home(props: Props) {
  const navigate = useNavigate();
  const actions = [
    {
      label: "设置",
      icon: <SettingOutlined style={{ fontSize: 24 }} />,
    },
    {
      label: "祈愿",
      icon: <StarOutlined style={{ fontSize: 24 }} />,
      onClick: () => navigate("/game/wish"),
    },
    {
      label: "角色",
      icon: <UserOutlined style={{ fontSize: 24 }} />,
      onClick: () => navigate("/game/role"),
    },
  ];

  /** 打怪逻辑 */
  const handleFight = () => {};

  return (
    <div className={styles["game-index"]}>
      <div className={styles["game-index-header"]}>
        <div className={styles["game-index-header-title"]}>
          <HomeOutlined
            className={styles["game-index-header-title-icon"]}
            onClick={() => navigate("/pc")}
          />
          <div style={{ fontWeight: "bold", fontSize: 18 }}>崩坏：原神铁道</div>
        </div>

        <div className={styles["game-index-header-action"]}>
          {actions.map((i) => (
            <div
              className={styles["game-index-header-action-item"]}
              key={i.label}
              onClick={i?.onClick}
            >
              <div>{i.icon}</div>
              <div>{i.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles["game-index-body"]}>
        <Button onClick={handleFight}>打怪（攒抽数）</Button>
      </div>
    </div>
  );
}
