/**
 * @file 游戏主页
 */
import { useEffect, useState } from "react";
import { Button, message } from "antd";
import { UserOutlined, StarOutlined, SettingOutlined, HomeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import SettingModal from "../components/SettingModal";
import { getUserData, updateUserData } from "../utils";
import styles from "./index.module.less";

export default function Home() {
  const navigate = useNavigate();
  message.config({ maxCount: 3 });

  const [settingOpen, setSettingOpen] = useState(false);

  const actions = [
    {
      label: "设置",
      icon: <SettingOutlined style={{ fontSize: 24 }} />,
      onClick: () => setSettingOpen(true),
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
    message.success(`恭喜你成功击败了怪物，获得抽数10，剩余总数${getUserData().pulls + 10}`);
    updateUserData({
      pulls: getUserData().pulls + 10,
    });
  };

  useEffect(() => {
    // 玩家数据初始化
    if (!getUserData()) {
      const initData = {
        pulls: 1000,
        history: [],
        infinite: false,
        pullCount: 0,
        fightCount: 0,
        level: 0,
      };
      localStorage.setItem("userData", JSON.stringify(initData));
    }

    // 监听快捷键
    // window.addEventListener("keyup", (e) => {
    //   if (e.code === "KeyC") {
    //     navigate("/game/role");
    //   }
    // });
  }, []);

  return (
    <div className={styles["game-index"]}>
      <div className={styles["game-index-header"]}>
        <div className={styles["game-index-header-title"]}>
          <HomeOutlined className={styles["game-index-header-title-icon"]} onClick={() => navigate("/genshin")} />
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
        <Button onClick={handleFight}>打怪（攒抽数）</Button>
      </div>

      <SettingModal open={settingOpen} onCancel={() => setSettingOpen(false)} />
    </div>
  );
}
