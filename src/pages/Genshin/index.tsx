import React, { useState } from "react";
import BottomBar from "@/components/BottomBar";
import axios from "axios";
import { Button, Input, NavBar, Toast } from "antd-mobile";
import { InformationCircleOutline } from "antd-mobile-icons";
import styles from "./index.less";

interface GachaDataShowItem {
  name: string;
  count: number;
}

function Genshin() {
  const [gachaData, setGachaData] = useState<any[]>();
  const [inputValue, setInputValue] = useState("");
  const [gachaShowData, setGachaShowData] = useState<GachaDataShowItem[]>();
  const normalPoolRole = ["七七", "莫娜", "迪卢克", "琴", "刻晴"];

  /** 获取抽卡数据相关参数 */
  const getGachaUrl = "/api/mihoyo/event/gacha_info/api/getGachaLog?";
  let endId = "0";
  let currentPage = 1;
  const tempData: any = [];
  let timer: any;

  /** 处理原始数据至展示数据 */
  const hanedleGachaData = () => {
    const tempData = [];
    let count = 0;
    let preName = "已垫";
    // eslint-disable-next-line
    gachaData?.map((i) => {
      if (i.rank_type === "5") {
        tempData.push({
          name: preName,
          count: count + 1,
        });
        count = 0;
        preName = i.name;
      } else {
        count++;
      }
    });
    if (count) {
      tempData.push({
        name: preName,
        count: count + 1,
      });
    }
    setGachaShowData(tempData);
  };
  /** 请求结束后操作 */
  const handleFinish = () => {
    clearInterval(timer);
    setGachaData(tempData);
    hanedleGachaData();
    Toast.show({
      icon: "success",
      content: "获取成功！",
      duration: 1000,
    });
  };
  /** 接口请求操作 */
  const fetchData = async () => {
    Toast.show({
      icon: "loading",
      content: "获取数据中，不要乱点啊喂！",
      duration: 3000,
    });
    const res = await axios.get(
      getGachaUrl +
        inputValue?.split("?")?.[1].split("#")?.[0] +
        `&gacha_type=301&page=${currentPage}&size=6&end_id=${endId}`,
      {
        baseURL: "",
      }
    );
    if (!res.data.data.list) {
      handleFinish();
    } else {
      if (res.data.data.list.length < 6) {
        handleFinish();
      }
      endId = res?.data?.data?.list[5]?.id || "";
      // eslint-disable-next-line
      res?.data?.data?.list?.map((i: any) => {
        tempData.push(i);
      });
      currentPage++;
    }
  };
  /** 获取原始数据（setInterval） */
  const getGachaData = () => {
    if (!inputValue) {
      Toast.show({
        icon: "fail",
        content: "请输入导出链接",
      });
    } else if (
      inputValue.indexOf("?") === -1 ||
      inputValue.indexOf("#") === -1
    ) {
      Toast.show({
        icon: "fail",
        content: "导出链接解析失败",
      });
    } else {
      if (timer === undefined) {
        timer = setInterval(() => {
          fetchData();
        }, 1200);
      } else {
        clearInterval(timer);
      }
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
        <Button color="primary" fill="outline" onClick={getGachaData}>
          开始获取
        </Button>

        <div className={styles["genshin-footer"]}>
          {gachaShowData ? (
            <div className={styles["genshin-footer-show"]}>
              {gachaShowData?.map((i, index) => {
                return (
                  <div
                    key={index}
                    className={styles["genshin-footer-show-item"]}
                    style={{
                      background: normalPoolRole.includes(i.name)
                        ? "rgba(255, 0, 0, 0.5)"
                        : "rgba(0, 255, 0, 0.5)",
                    }}>
                    <span>{i.name}</span>
                    <span>{i.count}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              <div className={styles["genshin-footer-tip"]}>
                <p className={styles["genshin-footer-tip-title"]}>
                  <InformationCircleOutline fontSize={18} />
                  <span style={{ marginLeft: 5 }}>怎么获取导出链接？</span>
                </p>
                <p className={styles["genshin-footer-tip-desc"]}>
                  打开游戏，进入抽卡历史记录页面，断开所有网络连接，点击右上角刷新，当页面报错时，复制全部文本，粘贴至上方输入框
                </p>
              </div>
              <div className={styles["genshin-footer-tip"]}>
                <p className={styles["genshin-footer-tip-title"]}>
                  <InformationCircleOutline fontSize={18} />
                  <span style={{ marginLeft: 5 }}>使用tip</span>
                </p>
                <p className={styles["genshin-footer-tip-desc"]}>
                  1、尽量按正常逻辑使用，没有测试过异常情况，有bug可以微博反馈我，谢谢啦
                </p>
                <p className={styles["genshin-footer-tip-desc"]}>
                  2、目前只有限定角色池子，明天写其他池子
                </p>
                <p className={styles["genshin-footer-tip-desc"]}>
                  3、样式也明天再优化一下，加个“每限定原石数之类的”
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <BottomBar />
    </div>
  );
}
export default Genshin;
