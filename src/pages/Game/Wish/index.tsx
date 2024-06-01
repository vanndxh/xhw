/**
 * @file 角色祈愿
 */
import { useRef, useState } from "react";
import { Breadcrumb, Button, message, Select, Space, Tooltip } from "antd";
import { BarChartOutlined, DollarOutlined, HomeOutlined, PlusOutlined, StockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useSnapshot } from "valtio";

import { userData } from "../state";
import RoleCard, { RoleCardProps } from "../components/RoleCard";
import HistoryModal from "../components/HistoryModal";
import { getRandomItemFromArray } from "@/utils/utils";
import { PicUrl } from "@/utils/constants";
import { roleList } from "../constants";

import styles from "./index.module.less";

function Wish() {
  const navigate = useNavigate();
  const { pulls, infinite, level, history, pullCount } = useSnapshot(userData);
  const actionRef = useRef<{ show: () => void }>();

  const [showData, setShowData] = useState<ObjectType[]>([]);
  const [targetRole, setTargetRole] = useState();

  /** 抽卡数据模拟 */
  const handleWish = (ps: number) => {
    if (pulls < ps && !infinite) {
      message.error("道具不足");
      return;
    }

    setShowData([]);

    const res: ObjectType[] = [];
    // 1.获取当前水位(之前抽数+1)
    let tempLevel = level + 1;

    for (let i = 0; i < ps; i++) {
      // 2.当前抽概率：基础概率0.6，73抽之后每抽增加6，89抽时为6*(89-73)+0.6=96.6，90抽时102.6>100，即为保底
      const percent = tempLevel > 73 ? 6 * (tempLevel - 73) + 0.6 : 0.6;
      // 3.概率跟随机数比，确认当前抽是否获得五星
      const isGetGold = Math.random() * 100 < percent;

      // 4.根据是否出金给数组塞入合适内容：如果有定轨，则有50%概率为定轨角色，反之直接随机
      const randomRole = getRandomItemFromArray(roleList);
      const target = roleList.find((i) => i.name === targetRole);
      const targetFinal = Math.random() > 0.5 ? target : randomRole;
      const finalRole = targetRole ? targetFinal : randomRole;

      const isNewRole = history?.findIndex((i) => i?.id === finalRole.id) === -1;
      res.push(
        isGetGold
          ? {
              ...finalRole,
              isGold: true,
              time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
              pulls: tempLevel,
              badgeText: isNewRole ? "NEW" : "",
            }
          : { name: "垃圾", picUrl: PicUrl.trashBin }
      );

      // 5.水位更新
      tempLevel = isGetGold ? 1 : tempLevel + 1;
    }

    // 将本次抽卡数据更新本地
    userData.history = [...history, ...res?.filter((i) => i?.isGold)];
    userData.pullCount = pullCount + ps;
    userData.pulls = pulls - (infinite ? 0 : ps);
    userData.level = tempLevel - 1;

    // 渲染本次抽卡结果
    setTimeout(() => {
      setShowData(res);
    }, 100);
  };

  return (
    <div className={styles["wish"]}>
      <div className={styles["wish-header"]}>
        <Breadcrumb
          items={[{ href: "/game/home", title: <HomeOutlined style={{ fontSize: 16 }} /> }, { title: "角色祈愿" }]}
          style={{ fontSize: 16 }}
        />

        <Space className={styles["wish-header-infos"]}>
          <Select
            value={targetRole}
            onChange={(val) => setTargetRole(val)}
            options={roleList.map((i) => ({ label: i.name, value: i.name }))}
            allowClear
            showSearch
            placeholder="请选择定轨角色，不选表示随机"
            style={{ width: 240 }}
          />

          <Tooltip title="当前水位" arrow={false}>
            <Button icon={<StockOutlined />}>
              <span style={{ fontWeight: "bold" }}>{level || 0}</span>
            </Button>
          </Tooltip>

          <Tooltip title="剩余抽数" arrow={false}>
            <Button icon={<DollarOutlined />} onClick={() => navigate("/game/home")}>
              <span style={{ fontWeight: "bold" }}>{pulls || 0}</span>
              <PlusOutlined />
            </Button>
          </Tooltip>

          <Button icon={<BarChartOutlined />} onClick={() => actionRef?.current?.show()}>
            查看记录
          </Button>
        </Space>
      </div>

      <div className={styles["wish-show"]}>
        {showData?.map((i, index) => (
          <div key={index} className={styles["wish-show-item"]}>
            <RoleCard {...(i as RoleCardProps)} />
          </div>
        ))}
      </div>

      <div className={styles["wish-buttons"]}>
        <Button className={styles["wish-buttons-single"]} onClick={() => handleWish(1)}>
          单抽
        </Button>
        <Button className={styles["wish-buttons-ten"]} onClick={() => handleWish(10)}>
          十连抽
        </Button>
      </div>

      <HistoryModal actionRef={actionRef} />
    </div>
  );
}
export default Wish;
