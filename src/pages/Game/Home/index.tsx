/**
 * @file 游戏主页
 */
import { useRef, useState } from "react";
import { Button, Flex, message, Select, Space, Tooltip, Image, Tag } from "antd";
import { SettingOutlined, StockOutlined, DollarOutlined, BarChartOutlined } from "@ant-design/icons";
import { useSnapshot } from "valtio";
import dayjs from "dayjs";
import classNames from "classnames";
import _ from "lodash";

import SettingModal from "../components/SettingModal";
import HistoryModal from "../components/HistoryModal";
import RoleCard, { RoleCardProps } from "../components/RoleCard";

import { getRandomItemFromArray } from "@/utils/utils";
import { userData } from "../state";
import { roleList } from "@/pages/Genshin/constants";
import { blueColor, goldColor, purpleColor } from "../constants";

import styles from "./index.module.less";

export default function Home() {
  const { pulls, level, infinite, history, pullCount } = useSnapshot(userData);
  message.config({ maxCount: 3 });
  const settingRef = useRef<any>();
  const historyRef = useRef<any>();

  const [showData, setShowData] = useState<ObjectType[]>([]);
  const [targetRole, setTargetRole] = useState();

  /** 打怪逻辑 */
  const handleFight = () => {
    const percent = Math.random();
    let res = 1;
    if (percent < 0.1) {
      res = 100;
    } else if (percent < 0.9) {
      res = 10;
    }

    const resMap = {
      1: { color: blueColor, text: "小怪" },
      10: { color: purpleColor, text: "精英怪" },
      100: { color: goldColor, text: "BOSS" },
    };

    message.success(
      <>
        <span>恭喜你成功击败了 </span>
        <span style={{ color: resMap[res].color }}>{resMap[res].text}</span>
        <span>，获得抽数 </span>
        <span style={{ color: resMap[res].color }}>{res}</span>
      </>
    );
    userData.pulls += res;
  };

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

      const isNewRole = history?.findIndex((i) => i?.name === finalRole.name) === -1;
      res.push(
        isGetGold
          ? {
              ...finalRole,
              isGold: true,
              time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
              pulls: tempLevel,
              badgeText: isNewRole ? "NEW" : "",
            }
          : {
              name: "垃圾",
              picUrl:
                "https://tse2-mm.cn.bing.net/th/id/OIP-C.IWRvab7dKUY1t96UGLgGWQAAAA?w=147&h=180&c=7&r=0&o=5&pid=1.7",
            }
      );

      // 5.水位更新
      tempLevel = isGetGold ? 1 : tempLevel + 1;
    }

    // 将本次抽卡数据更新本地
    const newData = res?.filter((i) => i?.isGold)?.map((j) => _.omit(j, ["isGold"]));
    userData.history = [...history, ...newData];
    userData.pullCount = pullCount + ps;
    userData.pulls = pulls - (infinite ? 0 : ps);
    userData.level = tempLevel - 1;

    // 渲染本次抽卡结果
    setTimeout(() => {
      setShowData(res);
    }, 100);
  };

  const getRolePicByEnglishName = (englishName: string) => {
    return `https://t1.xianx.com.cn/xstatic/img/c/s/${englishName}.jpg`;
  };

  const getTagColorByVersion = (version: string) => {
    switch (version?.slice(0, 1)) {
      case "1":
        return "goldenrod";
      case "2":
        return "purple";
      case "3":
        return "green";
      case "4":
        return "blue";
      case "5":
        return "red";
      case "6":
        return "#008B8B";
      default:
        return "#000";
    }
  };

  return (
    <div className={styles["game"]}>
      <div className={styles["game-header"]}>
        <div style={{ fontWeight: "bold", fontSize: 18 }}>崩坏：原神铁道</div>

        <Space>
          <Select
            value={targetRole}
            onChange={(val) => setTargetRole(val)}
            options={roleList.map((i) => ({
              label: `${i.name} | ${i.englishName}`,
              value: i.name,
              englishName: i.englishName,
              version: i.version,
            }))}
            allowClear
            showSearch
            placeholder="请选择定轨角色，不选表示随机"
            filterOption={(input, option) => option?.label?.includes(input) || false}
            optionRender={(option) => (
              <Flex style={{ alignItems: "center", gap: 8 }}>
                <Image
                  src={getRolePicByEnglishName(option.data.englishName)}
                  preview={false}
                  width={20}
                  height={20}
                  style={{ display: "flex" }}
                />
                <Tag style={{ margin: 0, color: getTagColorByVersion(option.data.version) }}>{option.data.version}</Tag>
                <span>{option.data.label}</span>
              </Flex>
            )}
            style={{ width: 240 }}
          />

          <Space.Compact>
            <Tooltip title="当前水位" arrow={false}>
              <Button icon={<StockOutlined />}>
                <span style={{ fontWeight: "bold" }}>{level || 0}</span>
              </Button>
            </Tooltip>

            <Tooltip title="剩余抽数" arrow={false}>
              <Button icon={<DollarOutlined />}>
                <span style={{ fontWeight: "bold" }}>{pulls || 0}</span>
              </Button>
            </Tooltip>
          </Space.Compact>

          <Button icon={<BarChartOutlined />} onClick={() => historyRef?.current?.show()}>
            抽卡记录
          </Button>

          <Button icon={<SettingOutlined />} onClick={() => settingRef?.current?.show()} />
        </Space>
      </div>

      <Space className={styles["game-show"]} size={16}>
        {showData?.map((i, index) => (
          <div key={index} className={styles["wish-show-item"]}>
            <RoleCard
              {...(i as RoleCardProps)}
              picUrl={
                i.picUrl ||
                `https://t1.xianx.com.cn/xstatic/img/c/s/${roleList.find((j) => i?.name === j?.name)?.englishName}.jpg`
              }
            />
          </div>
        ))}
      </Space>

      <Space className={styles["game-footer"]}>
        <Button className={styles["game-footer-item"]} onClick={handleFight} color="default" variant="filled">
          <div>打怪赚钱</div>
          <div>
            <DollarOutlined /> X ？？？
          </div>
        </Button>
        <Button
          className={classNames(styles["game-footer-item"], styles["game-footer-wish"])}
          onClick={() => handleWish(1)}
          color="gold"
          variant="filled"
        >
          <div>祈愿1次</div>
          <div>
            <DollarOutlined />
            <span style={{ color: pulls >= 1 ? "goldenrod" : "red" }}> X 1</span>
          </div>
        </Button>
        <Button
          className={classNames(styles["game-footer-item"], styles["game-footer-wish"])}
          onClick={() => handleWish(10)}
          color="gold"
          variant="filled"
        >
          <div>祈愿10次</div>
          <div>
            <DollarOutlined />
            <span style={{ color: pulls >= 10 ? "goldenrod" : "red" }}> X 10</span>
          </div>
        </Button>
      </Space>

      <SettingModal actionRef={settingRef} />
      <HistoryModal actionRef={historyRef} />
    </div>
  );
}
