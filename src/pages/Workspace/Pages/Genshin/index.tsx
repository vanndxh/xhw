import React, { useEffect, useRef, useState } from "react";
import { Button, Input, Mask, NavBar, Tabs, Toast } from "antd-mobile";
import Swiper, { SwiperRef } from "antd-mobile/es/components/swiper";
import axios from "axios";
import BottomBar from "@/components/BottomBar";
import {
  GachaDataShowItem,
  GACHA_TYPE,
  GACHA_TYPE_KEY,
  getGachaUrl,
  tabItems,
} from "./constants";
import { calculateStatistics, hanedleRawData } from "./utils";
import GachaShowTabItem from "./components/GachaShowTabItem";
import GachaShowStatistics from "./components/GachaShowStatistics";
import NoDataTip from "./components/NoDataTip";
import styles from "./index.less";
import { postUV } from "@/services/api/api";

function Genshin() {
  const [inputValue, setInputValue] = useState(""); // 输入框
  const [loading, setLoading] = useState(false); // 控制查询状态
  const [gachaRoleData, setGachaRoleData] = useState<GachaDataShowItem[]>();
  const [gachaWeaponData, setGachaWeaponData] = useState<GachaDataShowItem[]>();
  const [gachaNormalData, setGachaNormalData] = useState<GachaDataShowItem[]>();
  const [statisticsData, setStatisticsData] = useState<any>();
  const [activeIndex, setActiveIndex] = useState(0);

  const swiperRef = useRef<SwiperRef>(null);

  /** 获取localStorage存储的上次记录 */
  useEffect(() => {
    postUV("genshin");
    const gachaRoleData = localStorage.getItem("gachaRoleData");
    const gachaWeaponData = localStorage.getItem("gachaWeaponData");
    const gachaNormalData = localStorage.getItem("gachaNormalData");
    if (gachaRoleData) {
      setGachaRoleData(JSON.parse(gachaRoleData));
    }
    if (gachaWeaponData) {
      setGachaWeaponData(JSON.parse(gachaWeaponData));
    }
    if (gachaNormalData) {
      setGachaNormalData(JSON.parse(gachaNormalData));
    }
    if (gachaRoleData || gachaWeaponData || gachaNormalData) {
      Toast.show({
        icon: "success",
        content: "获取上次查询记录成功！",
        duration: 1000,
      });
    }
  }, []);

  /** 当数据改变时，更新统计 */
  useEffect(() => {
    if (gachaRoleData || gachaWeaponData || gachaNormalData) {
      setStatisticsData(
        calculateStatistics({
          gachaRoleData,
          gachaWeaponData,
          gachaNormalData,
        } as any)
      );
    }
  }, [gachaRoleData, gachaWeaponData, gachaNormalData]);

  /** 获取抽卡数据相关参数 */
  let endId = "0";
  let currentPage = 1;
  let gachaData: any[] = [];
  let timer: any;
  let gachaType: string = GACHA_TYPE_KEY.role.code; // 301-role 302-weapon 200-normal 100-new 0-end

  /** 请求结束后操作 */
  const handleFinish = () => {
    if (gachaType === GACHA_TYPE_KEY.role.code) {
      gachaType = GACHA_TYPE_KEY.weapon.code;
      endId = "0";
      currentPage = 1;
      setGachaRoleData(hanedleRawData({ rawData: gachaData }));
      localStorage.setItem(
        "gachaRoleData",
        JSON.stringify(hanedleRawData({ rawData: gachaData }))
      );
      gachaData = [];
    } else if (gachaType === GACHA_TYPE_KEY.weapon.code) {
      gachaType = GACHA_TYPE_KEY.normal.code;
      endId = "0";
      currentPage = 1;
      setGachaWeaponData(hanedleRawData({ rawData: gachaData }));
      localStorage.setItem(
        "gachaWeaponData",
        JSON.stringify(hanedleRawData({ rawData: gachaData }))
      );
      gachaData = [];
    } else {
      setGachaNormalData(hanedleRawData({ rawData: gachaData }));
      localStorage.setItem(
        "gachaNormalData",
        JSON.stringify(hanedleRawData({ rawData: gachaData }))
      );
      clearInterval(timer);
      setLoading(false);
      Toast.show({
        icon: "success",
        content: "获取成功！",
        duration: 1000,
      });
    }
  };

  /** 接口请求操作 */
  const fetchData = async () => {
    Toast.show({
      icon: "loading",
      content: `获取${GACHA_TYPE[gachaType]}池第${currentPage}页中，不要乱点啊喂！`,
      duration: 3000,
    });

    const params = inputValue?.split("?")?.[1].split("#")?.[0];
    const res = await axios.get(
      `${getGachaUrl}${params}&gacha_type=${gachaType}&page=${currentPage}&size=20&end_id=${endId}`,
      {
        baseURL: "",
      }
    );
    if (!res.data.data.list) {
      handleFinish();
    } else {
      if (res.data.data.list.length < 20) {
        handleFinish();
      }
      endId = res?.data?.data?.list[19]?.id || "";
      // eslint-disable-next-line
      res?.data?.data?.list?.map((i: any) => {
        gachaData.push(i);
      });
      currentPage++;
    }
  };

  /** 获取原始数据（setInterval） */
  const getGachaData = () => {
    if (
      !inputValue ||
      inputValue.indexOf("?") === -1 ||
      inputValue.indexOf("#") === -1
    ) {
      Toast.show({
        icon: "fail",
        content: "导出链接解析失败",
      });
      return;
    }
    setLoading(true);
    gachaType = GACHA_TYPE_KEY.role.code;
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
          {gachaRoleData ? (
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
                // defaultIndex={activeIndex}
                // onIndexChange={(index) => {
                //   setActiveIndex(index);
                // }}
              >
                <Swiper.Item>
                  <GachaShowTabItem isRole={true} data={gachaRoleData} />
                </Swiper.Item>
                <Swiper.Item>
                  <GachaShowTabItem isRole={false} data={gachaWeaponData!} />
                </Swiper.Item>
                <Swiper.Item>
                  <GachaShowTabItem isRole={false} data={gachaNormalData!} />
                </Swiper.Item>
                <Swiper.Item>
                  {statisticsData && (
                    <GachaShowStatistics statisticsData={statisticsData} />
                  )}
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
