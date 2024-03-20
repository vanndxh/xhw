/**
 * @file 游戏 - 抽卡模拟器
 */
import { useEffect, useState } from "react";
import { Button, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import { roleList } from "../constants";
import styles from "./index.module.less";
import RoleCard from "../components/RoleCard";
import { PicUrl } from "@/utils/constants";
import { getUserData, updateUserData } from "../utils";
import { getRandomItemFromArray } from "@/utils/utils";

function Wish() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState<ObjectType | undefined>();
  const [showData, setShowData] = useState<ObjectType[]>([]);

  /** 抽卡数据模拟 */
  const handleWish = (pulls: number) => {
    if (userData?.pulls < pulls) {
      message.error("道具不足");
      return;
    }

    setShowData([]);

    const res: ObjectType[] = [];
    // 1.获取当前水位(之前抽数+1)
    let tempLevel = userData?.level + 1;

    for (let i = 0; i < pulls; i++) {
      // 2.当前抽概率：基础概率0.6，73抽之后每抽增加6，89抽时为6*(89-73)+0.6=96.6，90抽时102.6>100，即为保底
      const percent = tempLevel > 73 ? 6 * (tempLevel - 73) + 0.6 : 0.6;
      // 3.概率跟随机数比，确认当前抽是否获得五星
      const isGetGold = Math.random() * 100 < percent;

      // 4.根据是否出金给数组塞入合适内容
      const randomRole = getRandomItemFromArray(roleList);
      res.push(
        isGetGold
          ? { ...randomRole, isGold: true, time: dayjs().format("YYYY-MM-DD HH:mm:ss") }
          : { name: "垃圾", picUrl: PicUrl.trashBin }
      );

      // 5.水位更新
      tempLevel = isGetGold ? 1 : tempLevel + 1;
    }

    // 将本次抽卡数据更新本地
    updateUserData({
      history: [...userData?.history, ...res?.filter((i) => i?.isGold)],
      pullCount: userData?.pullCount + pulls,
      pulls: userData?.pulls - pulls,
      level: tempLevel - 1,
    });

    // 渲染本次抽卡结果
    setShowData(res);
  };

  useEffect(() => {
    setUserData(getUserData());
  }, [getUserData()]);

  return (
    <div className={styles["wish"]}>
      <div className={styles["wish-header"]}>
        <CloseOutlined className={styles["wish-header-close"]} onClick={() => navigate("/game/home")} />

        <div>
          当前水位： {userData?.level || 0} 剩余抽数：{userData?.pulls || 0}
        </div>
      </div>

      <div className={styles["wish-show"]}>
        {showData?.map((i, index) => (
          <div key={index} className={styles["wish-show-item"]}>
            <RoleCard
              {...(i as {
                name: string;
                picUrl: string;
                isGold?: boolean;
              })}
            />
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
