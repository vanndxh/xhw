/**
 * @file 原神抽卡记录导出
 */
import { useState } from "react";
import { Button, Card, Input, message, Tabs } from "antd";
import { Toast } from "antd-mobile";
import axios from "axios";

import PageLayout from "@/components/PageLayout";
import GachaShowTabItem from "./components/GachaShowTabItem";
import GachaShowStatistics from "./components/GachaShowStatistics";
import { handleRawData } from "./util";
import { GachaType, GachaTypeKey, getGachaUrl } from "./constants";
import styles from "./index.module.less";

export type GachaDataType = {
  role?: ObjectType[];
  weapon?: ObjectType[];
  normal?: ObjectType[];
};

function PCGenshin() {
  /** 用户提供参数链接 */
  const [inputValue, setInputValue] = useState("");
  /** 控制查询状态 */
  const [loading, setLoading] = useState(false);
  /** 获取到的数据 */
  const [gachaData, setGachaData] = useState<GachaDataType>({});
  const [activeIndex, setActiveIndex] = useState(0);

  /** 获取抽卡数据相关参数 */
  const fetchInterval = 1000;
  let gachaParams = {
    endId: "0",
    currentPage: 1,
    gachaType: GachaTypeKey.ROLE,
  };
  let tempData: ObjectType[] = [];
  let timer;

  const tabItems = [
    {
      key: "role",
      label: "角色",
      children: <GachaShowTabItem isRole={true} data={gachaData.role || []} />,
    },
    {
      key: "weapon",
      label: "武器",
      children: (
        <GachaShowTabItem isRole={false} data={gachaData.weapon || []} />
      ),
    },
    {
      key: "normal",
      label: "常驻",
      children: (
        <GachaShowTabItem isRole={false} data={gachaData.normal || []} />
      ),
    },
    {
      key: "statistics",
      label: "统计",
      children: <GachaShowStatistics data={gachaData} />,
    },
  ];

  /** 一个卡池请求结束后操作 */
  const handleFinish = () => {
    /** 角色 */
    if (gachaParams?.gachaType === GachaTypeKey.ROLE) {
      gachaParams = {
        gachaType: GachaTypeKey.WEAPON,
        endId: "0",
        currentPage: 1,
      };
      const roleData = handleRawData(tempData);
      setGachaData((pre) => ({
        ...pre,
        role: roleData,
      }));
      tempData = [];
      return;
    }
    /** 武器 */
    if (gachaParams?.gachaType === GachaTypeKey.WEAPON) {
      gachaParams = {
        gachaType: GachaTypeKey.NORMAL,
        endId: "0",
        currentPage: 1,
      };
      const weaponData = handleRawData(tempData);
      setGachaData((pre) => ({
        ...pre,
        weapon: weaponData,
      }));
      tempData = [];
      return;
    }
    /** 常驻 */
    if (gachaParams?.gachaType === GachaTypeKey.NORMAL) {
      gachaParams = {
        gachaType: GachaTypeKey.ROLE,
        endId: "0",
        currentPage: 1,
      };
      const normalData = handleRawData(tempData);
      setGachaData((pre) => ({
        ...pre,
        normal: normalData,
      }));
      clearInterval(timer);
      setLoading(false);
      Toast.show({
        icon: "success",
        content: "获取成功！",
        duration: fetchInterval,
      });
      // localStorage.setItem("genshinGachaData", JSON.stringify(gachaData));
      tempData = [];
      return;
    }
  };

  /** 接口请求操作 */
  const fetchData = async () => {
    Toast.show({
      icon: "loading",
      content: `获取${GachaType[gachaParams.gachaType].label}池第${
        gachaParams.currentPage
      }页中，不要乱点啊喂！`,
      duration: fetchInterval,
    });

    const fetchUrl = `${getGachaUrl}${
      inputValue?.split("?")?.[1].split("#")?.[0]
    }&gacha_type=${GachaType[gachaParams.gachaType].code}&page=${
      gachaParams.currentPage
    }&size=20&end_id=${gachaParams.endId}`;
    const res = await axios.get(fetchUrl, { baseURL: "" });

    /** 请求失败 */
    if (!res?.data?.data) {
      message.error(`请求失败, ${res?.data?.message}`);
      clearInterval(timer);
      setLoading(false);
      return;
    }

    /** 有数据，则处理数据 */
    if (res.data.data.list.length) {
      gachaParams = {
        ...gachaParams,
        endId: res?.data?.data?.list[res.data.data.list.length - 1]?.id || "",
        currentPage: gachaParams.currentPage + 1,
      };
      tempData = [...[...tempData, ...res?.data?.data?.list]];
      return;
    }

    /** 没更多数据了，结束 */
    if (!res.data.data.list.length) {
      handleFinish();
      return;
    }
  };

  /** 获取原始数据（setInterval） */
  const getGachaData = () => {
    setLoading(true);
    if (timer === undefined) {
      timer = setInterval(() => {
        fetchData();
      }, fetchInterval);
    } else {
      clearInterval(timer);
    }
  };

  return (
    <PageLayout>
      <Card
        title="原神抽卡记录导出"
        bordered={false}
        style={{ height: "100%" }}
      >
        <div className={styles["pc-genshin"]}>
          <div className={styles["pc-genshin-left"]}>
            <div className={styles["pc-genshin-left-inputline"]}>
              <Input
                placeholder="请输入导出链接"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Button
                color="primary"
                onClick={getGachaData}
                disabled={loading}
                style={{ marginLeft: 10 }}
              >
                开始获取
              </Button>
            </div>

            <Tabs
              type="card"
              activeKey={tabItems[activeIndex].key}
              onChange={(key) => {
                const index = tabItems.findIndex((item) => item.key === key);
                setActiveIndex(index);
              }}
              items={tabItems}
              className={styles["pc-genshin-left-tabs"]}
            />
          </div>

          <div className={styles["pc-genshin-right"]}>
            <Card
              title="怎么获取导出链接？"
              extra={
                <Button
                  type="link"
                  style={{ padding: 0 }}
                  onClick={() => {
                    navigator.clipboard
                      .writeText(`iex(irm 'https://lelaer.com/d.ps1')`)
                      .then(() => {
                        message.success("复制成功");
                      });
                  }}
                >
                  点此复制命令
                </Button>
              }
              style={{ marginBottom: 10, width: "100%" }}
            >
              {`游戏打开抽卡界面，然后在powershell输入iex(irm 'https://lelaer.com/d.ps1')，将自动复制到剪贴板`}
            </Card>
          </div>
        </div>
      </Card>
    </PageLayout>
  );
}
export default PCGenshin;
