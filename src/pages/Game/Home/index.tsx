/**
 * @file 游戏主页
 */
import { useRef } from "react";
import { Button, message } from "antd";
import { UserOutlined, StarOutlined, SettingOutlined, HomeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";

import { userData } from "../state";
import SettingModal from "../components/SettingModal";
import { blueColor, goldColor, purpleColor } from "../constants";

import styles from "./index.module.less";

export default function Home() {
  const navigate = useNavigate();
  const { pulls } = useSnapshot(userData);
  message.config({ maxCount: 3 });
  const actionRef = useRef<{ show: () => void }>();

  const actions = [
    {
      label: "设置",
      icon: <SettingOutlined style={{ fontSize: 24 }} />,
      onClick: () => actionRef?.current?.show(),
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
  const handleFight = () => {
    const percent = Math.random();
    let res = 1;
    if (percent < 0.1) {
      res = 100;
    } else if (percent < 0.9) {
      res = 10;
    }

    const enemyMap = {
      1: <span style={{ color: blueColor }}>普通小怪</span>,
      10: <span style={{ color: purpleColor }}>精英怪</span>,
      100: <span style={{ color: goldColor }}>BOSS</span>,
    };

    message.success(
      <span>
        恭喜你成功击败了{enemyMap[res]}，获得抽数{res}，剩余总数{pulls + res}
      </span>
    );
    userData.pulls += res;
  };

  // 监听快捷键
  // useEffect(() => {
  // window.addEventListener("keyup", (e) => {
  //   if (e.code === "KeyC") {
  //     navigate("/game/role");
  //   }
  // });
  // }, []);

  return (
    <div className={styles["game-index"]}>
      <div className={styles["game-index-header"]}>
        <div className={styles["game-index-header-title"]}>
          <HomeOutlined className={styles["game-index-header-title-icon"]} onClick={() => navigate("/tools/genshin")} />
          <div style={{ fontWeight: "bold", fontSize: 18 }}>崩坏：原神铁道</div>
        </div>

        <div className={styles["game-index-header-action"]}>
          {actions.map((i) => (
            <div className={styles["game-index-header-action-item"]} key={i.label} onClick={i?.onClick}>
              <div>{i.icon}</div>
              <div>{i.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles["game-index-body"]}>
        <Button onClick={handleFight}>打怪</Button>
      </div>

      <SettingModal actionRef={actionRef} />
    </div>
  );
}
