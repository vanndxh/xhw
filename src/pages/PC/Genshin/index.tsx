import React, { useState } from "react";
import PageLayout from "../components/PageLayout";
import { GachaDataType } from "@/pages/Mobile/Workspace/Genshin";
import styles from "./index.module.less";
import { Toast } from "antd-mobile";
import {
  GACHA_TYPE,
  GACHA_TYPE_KEY,
  getGachaUrl,
} from "@/pages/Mobile/Workspace/Genshin/constants";
import { hanedleRawData } from "@/utils/genshin";
import axios from "axios";
import { Button, Input, Tabs } from "antd";
import GachaShowTabItem from "@/pages/Mobile/Workspace/Genshin/components/GachaShowTabItem";
import GachaShowStatistics from "@/pages/Mobile/Workspace/Genshin/components/GachaShowStatistics";
import NoDataTip from "@/pages/Mobile/Workspace/Genshin/components/NoDataTip";

function PCGenshin() {
  /** 用户提供参数链接 */
  const [inputValue, setInputValue] = useState("");
  /** 控制查询状态 */
  const [loading, setLoading] = useState(false);
  /** 获取到的数据 */
  const [gachaData, setGachaData] = useState<GachaDataType>({});
  const [activeIndex, setActiveIndex] = useState(0);

  /** 获取抽卡数据相关参数 */
  let gachaParams = {
    endId: "0",
    currentPage: 1,
    gachaType: GACHA_TYPE_KEY.ROLE,
  };
  let tempData: any[] = [];
  let timer: any;

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
    if (gachaParams?.gachaType === GACHA_TYPE_KEY.ROLE) {
      gachaParams = {
        gachaType: GACHA_TYPE_KEY.WEAPON,
        endId: "0",
        currentPage: 1,
      };
      setGachaData((pre) => ({
        ...pre,
        role: hanedleRawData(tempData),
      }));
      tempData = [];
      return;
    }
    /** 武器 */
    if (gachaParams?.gachaType === GACHA_TYPE_KEY.WEAPON) {
      gachaParams = {
        gachaType: GACHA_TYPE_KEY.NORMAL,
        endId: "0",
        currentPage: 1,
      };
      setGachaData((pre) => ({
        ...pre,
        weapon: hanedleRawData(tempData),
      }));
      tempData = [];
      return;
    }
    /** 常驻 */
    if (gachaParams?.gachaType === GACHA_TYPE_KEY.NORMAL) {
      gachaParams = {
        gachaType: GACHA_TYPE_KEY.ROLE,
        endId: "0",
        currentPage: 1,
      };
      setGachaData((pre) => ({
        ...pre,
        normal: hanedleRawData(tempData),
      }));
      clearInterval(timer);
      setLoading(false);
      Toast.show({
        icon: "success",
        content: "获取成功！",
        duration: 1000,
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
      content: `获取${GACHA_TYPE[gachaParams.gachaType].label}池第${
        gachaParams.currentPage
      }页中，不要乱点啊喂！`,
      duration: 3000,
    });

    const params = inputValue?.split("?")?.[1].split("#")?.[0];
    const res = await axios.get(
      `${getGachaUrl}${params}&gacha_type=${
        GACHA_TYPE[gachaParams.gachaType].code
      }&page=${gachaParams.currentPage}&size=20&end_id=${gachaParams.endId}`,
      {
        baseURL: "",
      }
    );

    /** 请求失败 */
    if (!res?.data?.data) {
      Toast.show({
        icon: "fail",
        content: "请求失败",
      });
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
      }, 1000);
    } else {
      clearInterval(timer);
    }
  };

  return (
    <PageLayout>
      <div className={styles["pc-genshin"]}>
        <div className={styles["pc-genshin-left"]}>
          <div className={styles["pc-genshin-left-title"]}>
            原神抽卡记录导出
          </div>
          <div className={styles["pc-genshin-left-inputline"]}>
            <Input
              placeholder="请输入导出链接"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              className={styles["pc-genshin-left-inputline-input"]}
            />
            <Button color="primary" onClick={getGachaData} disabled={loading}>
              开始获取
            </Button>
          </div>

          <div className={styles["pc-genshin-left-tabs"]}>
            <Tabs
              activeKey={tabItems[activeIndex].key}
              onChange={(key) => {
                const index = tabItems.findIndex((item) => item.key === key);
                setActiveIndex(index);
              }}
              items={tabItems}
            />
          </div>
        </div>

        <div className={styles["pc-genshin-right"]}>
          <NoDataTip />
        </div>
      </div>
    </PageLayout>
  );
}
export default PCGenshin;
