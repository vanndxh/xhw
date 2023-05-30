import React, { useEffect, useRef, useState } from "react";
import { Button, Input, Mask, NavBar, Tabs, Toast } from "antd-mobile";
import Swiper, { SwiperRef } from "antd-mobile/es/components/swiper";
import axios from "axios";
import BottomBar from "@/pages/Mobile/components/BottomBar";
import {
  GachaType,
  GachaTypeKey,
  getGachaUrl,
  tabItems,
} from "../../../PC/Genshin/constants";
import GachaShowTabItem from "./components/GachaShowTabItem";
import GachaShowStatistics from "./components/GachaShowStatistics";
import NoDataTip from "./components/NoDataTip";
import styles from "./index.less";
import { postUV } from "@/services/api/api";

export interface GachaDataType {
  role?: any[];
  weapon?: any[];
  normal?: any[];
}

function Genshin() {
  const swiperRef = useRef<SwiperRef>(null);

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
    gachaType: GachaTypeKey.ROLE,
  };
  let tempData: any[] = [];
  let timer: any;

  /** 获取localStorage存储的上次记录 */
  useEffect(() => {
    postUV("genshin");
    // if (!gachaData) {
    //   const localData = localStorage.getItem("genshinGachaData");
    //   setGachaData(JSON.parse(localData || "{}"));
    //   if (localData) {
    //     Toast.show({
    //       icon: "success",
    //       content: "获取上次查询记录成功！",
    //       duration: 1000,
    //     });
    //   }
    // }
  }, []);

  /** 一个卡池请求结束后操作 */
  const handleFinish = () => {
    /** 角色 */
    if (gachaParams?.gachaType === GachaTypeKey.ROLE) {
      gachaParams = {
        gachaType: GachaTypeKey.WEAPON,
        endId: "0",
        currentPage: 1,
      };
      setGachaData((pre) => ({
        ...pre,
        // role: hanedleRawData(tempData),
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
      setGachaData((pre) => ({
        ...pre,
        // weapon: hanedleRawData(tempData),
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
      setGachaData((pre) => ({
        ...pre,
        // normal: hanedleRawData(tempData),
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
      content: `获取${GachaType[gachaParams.gachaType].label}池第${
        gachaParams.currentPage
      }页中，不要乱点啊喂！`,
      duration: 3000,
    });

    const params = inputValue?.split("?")?.[1].split("#")?.[0];
    const res = await axios.get(
      `${getGachaUrl}${params}&gacha_type=${
        GachaType[gachaParams.gachaType].code
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
    <div className={styles["genshin"]}>
      <div className={styles["genshin-header"]}>
        <NavBar back={null}>原神抽卡导出</NavBar>
      </div>
      <div className={styles["genshin-body"]}>
        <Input
          placeholder="请输入导出链接"
          clearable
          value={inputValue}
          onChange={(e) => setInputValue(e)}
          className={styles["genshin-body-input"]}
        />
        <Button
          color="primary"
          fill="outline"
          onClick={getGachaData}
          disabled={loading}
        >
          开始获取
        </Button>

        <div className={styles["genshin-footer"]}>
          {gachaData?.role || gachaData?.normal || gachaData?.weapon ? (
            <div className={styles["genshin-footer-show"]}>
              <Tabs
                activeKey={tabItems[activeIndex].key}
                onChange={(key) => {
                  const index = tabItems.findIndex((item) => item.key === key);
                  setActiveIndex(index);
                  swiperRef.current?.swipeTo(index);
                }}
              >
                {tabItems.map((item) => (
                  <Tabs.Tab title={item.title} key={item.key} />
                ))}
              </Tabs>
              <Swiper
                direction="horizontal"
                loop
                indicator={() => null}
                ref={swiperRef}
              >
                {
                  ["role", "weapon", "normal"].map((i: string) => (
                    <Swiper.Item key={i}>
                      <GachaShowTabItem
                        isRole={i === "role"}
                        data={(gachaData as any)?.[i] || []}
                      />
                    </Swiper.Item>
                  )) as any
                }
                <Swiper.Item>
                  <GachaShowStatistics data={gachaData} />
                </Swiper.Item>
              </Swiper>
            </div>
          ) : (
            <NoDataTip />
          )}
        </div>
      </div>

      <BottomBar
        onChange={() => {
          clearInterval(timer);
          setLoading(false);
        }}
      />

      <Mask visible={loading} color="white" />
    </div>
  );
}
export default Genshin;
// function hanedleRawData(tempData: any[]): any[] | undefined {
//   throw new Error("Function not implemented.");
// }
