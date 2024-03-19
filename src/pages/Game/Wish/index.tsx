/**
 * @file 游戏 - 抽卡模拟器
 */
import { useState } from "react";
import { Button, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { roleList } from "../constants";
import styles from "./index.module.less";
import RoleCard from "../components/RoleCard";
import { iconUrl } from "@/utils/constants";

function Wish() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({ level: 74 });

  const [mockData, setMockData] = useState<ObjectType[]>([]);

  /** 抽卡数据模拟 */
  const handleWish = (pulls: number) => {
    const res: ObjectType[] = [];

    for (let i = 0; i < pulls; i++) {
      // 1.获取当前水位
      const level = userData?.level;
      // 2.当前抽概率：基础概率0.6，73抽之后每抽增加6，89抽时为6*(89-73)+0.6=96.6，90抽时102.6>100，即为保底
      const percent = level > 73 ? 6 * (level - 73) + 0.6 : 0.6;
      // 3.概率跟随机数比，确认当前抽是否获得五星
      const isGetGold = Math.random() * 100 < percent;

      setUserData({ ...userData, level: isGetGold ? 0 : userData?.level + 1 });
      const randomRole = roleList?.[(Math.random() * roleList?.length).toFixed(0)];
      res.push(isGetGold ? randomRole : { name: "垃圾", picUrl: iconUrl.trashBin });
    }

    setMockData(res);
  };

  return (
    <div className={styles["wish"]}>
      <div className={styles["wish-header"]}>
        <CloseOutlined className={styles["wish-header-close"]} onClick={() => navigate("/game/home")} />

        <div>原石：1500</div>
      </div>

      <div className={styles["wish-show"]}>
        {mockData?.map((i, index) => (
          <div key={index} className={styles["wish-show-item"]}>
            <RoleCard name={i?.name || ""} picUrl={i?.picUrl || ""} />
          </div>
        ))}
      </div>

      <div className={styles["wish-buttons"]}>
        <Button
          className={styles["wish-buttons-single"]}
          onClick={() => {
            handleWish(1);
          }}
        >
          单抽
        </Button>
        <Button
          className={styles["wish-buttons-ten"]}
          onClick={() => {
            handleWish(10);
          }}
        >
          十连抽
        </Button>
      </div>
    </div>
  );
}
export default Wish;
